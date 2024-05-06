import Tour from '../models/tourModels.mjs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//TODO:.Route Handler Function
//***tour
const getAllTours = async (req, res) => {
  try {
    // reading all the documents from the database
    const tours = await Tour.find();
    // console.log(tours);
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

export { getAllTours, getATour, createATour, updateATour, deleteATour };
