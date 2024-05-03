import Tour from '../models/tourModels.mjs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//validation for id
// export const checkID = (req, res, next, val) => {
//   // console.log(typeof(val)) ---string;
//   const id = Number(val);
//   if (id > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID',
//     });
//   }
//   next();
// };

/*
//validation for body
const checkBody = (req, res, next) => {
  if (!req.body.price || !req.body.name) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }
  next();
};
*/

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

const createATour = (req, res) => {
  // console.log(req.body);
  // const newId = tours[tours.length - 1].id + 1;
  // const newTour = Object.assign({ id: newId }, req.body);
  // tours.push(newTour);
  // fs.writeFile(
  //   `${__dirname}/../dev-data/data/tours-simple.json`,
  //   JSON.stringify(tours),
  //   (err) => {
  //     res.status(201).json({
  //       status: 'success',
  //       data: {
  //         tour: newTour,
  //       },
  //     });
  //   }
  // );
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

export {
  getAllTours,
  getATour,
  createATour,
  updateATour,
  deleteATour,
  checkBody,
};
