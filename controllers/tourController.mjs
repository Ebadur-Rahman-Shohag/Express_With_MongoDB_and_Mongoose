import Tour from '../models/tourModels.mjs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//TODO:.Route Handler Function
//***tour
const getAllTours = (req, res) => {
  // res.status(200).json({
  //   status: 'success',
  //   result: tours.length,
  //   requestAt: req.requestTime,
  //   data: {
  //     tours: tours,
  //   },
  // });
};

const getATour = (req, res) => {
  const id = Number(req.params.id);

  // const tour = tours.find((el) => el.id === id);

  /*if (id > tours.length) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
    
  }
  */

  // res.status(200).json({
  //   status: 'success',
  //   tour,
  // });
};

const createATour = async (req, res) => {
  //old way
  /*
  const newTour = new Tour({})
  newTour.save();
*/ try {
    const newTour = await Tour.create(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

const updateATour = (req, res) => {
  /*const id = req.params.id;
  if (id > tours.length) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  */

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

const deleteATour = (req, res) => {
  /*
  const id = req.params.id;
  if (id > tours.length) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  */
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

export { getAllTours, getATour, createATour, updateATour, deleteATour };
