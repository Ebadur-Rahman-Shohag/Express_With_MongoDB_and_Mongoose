import Tour from '../models/tourModels.mjs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { match } from 'assert';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//TODO:.Route Handler Function

// aliasTopTours
const aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};
//***tour
const getAllTours = async (req, res) => {
  try {
    // filtering data by query string
    // console.log(req.query); //req.query returs a object with the data of the query string

    // BUILD QUERY
    //1A)***FILTERING
    const queryObj = { ...req.query };
    const excludedFiles = ['page', 'sort', 'limit', 'fields'];
    excludedFiles.forEach((el) => delete queryObj[el]);

    //1B)***ADVANCE FILTERING
    // Normal way to write a query
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(JSON.parse(queryStr));

    // { duration:{$gte:5},difficulty:"easy"};
    // { duration: { gte: '5' }, difficulty: 'easy' }

    // const query = Tour.find(queryObj);
    let query = Tour.find(JSON.parse(queryStr));

    // 2)SORTING
    //our query produce this type of string
    // sort(price,ratingsAverage)

    //Mongoose wants this type of string
    // sort('price ratingsAverage' )

    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
      console.log(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // 3)FIELD LIMITING
    //name,duration,difficulty,price
    //our query produce this type of string
    // sort('name,duration,difficulty,price')

    //Mongoose wants this type of string
    // sort('name duration difficulty price' )

    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    // 4)PAGINATION
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 100;
    const skip = (page - 1) * limit;

    //page=3&limit=10, 1-10(page-1), 11-20(page-2), 21-30(page-3)
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skip >= numTours) throw new Error('This page does not exist');
    }

    // EXECUTE QUERY
    const tours = await query;

    /*
    // special Mongoose method to write a query
    const tours = await Tour.find()
      .where('duration')
      .equals(5)
      .where('difficulty')
      .equals('hard');
    */

    /*
     //reading all the documents from the database
     const tours = await Tour.find();
     console.log(tours);
    */

    //  SEND RESPONSE
    res.status(200).json({
      status: 'success',
      result: tours.length,
      data: {
        tours: tours,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

const getATour = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    // reading one document from database
    /*
    //old way
    Tour.findOne({_id:req.params.id})
    */
    const tour = await Tour.findById(id);
    res.status(200).json({
      status: 'success',
      tour: tour,
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

const createATour = async (req, res) => {
  //old way to create document
  /*
  const newTour = new Tour({})
  newTour.save();*/

  try {
    // creating documents in database
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

const updateATour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour: tour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

const deleteATour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

export {
  getAllTours,
  getATour,
  createATour,
  updateATour,
  deleteATour,
  aliasTopTours,
};
