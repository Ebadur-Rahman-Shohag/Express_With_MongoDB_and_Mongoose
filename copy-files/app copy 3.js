import express from 'express';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import morgan from 'morgan';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

//TODO:1.Middleware

//built in middleware
app.use(express.json());

//third party middleware
app.use(morgan('dev'));

//middleware created our own
app.use((req, res, next) => {
  console.log('welcome to our own middleware✌');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toDateString();
  next();
});

/*
app.get('/', (req, res) => {
  //   res.send('Welcome to express.js');
  res.status(404).json({ message: 'Welcome to express.js', status: 'ok' });
});

app.post('/', (req, res) => {
  //   res.send('Welcome to express.js');
  res.send('You can post to this endpoint...');
});
*/

/*
JSON.parse() is a crucial function in JavaScript used to convert JSON strings into JavaScript objects. This function is widely used in web development, especially when dealing with data received from a server or APIs, which is often in JSON format. JSON.parse() enables developers to work with the data as native JavaScript objects.*/
/*JSON.stringify() in JavaScript. This is a very useful function for converting JavaScript objects into JSON strings. This function is commonly used in web development for sending data from a client to a server or for storing information in a format that is easily sharable and storable.*/

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//TODO:2.Route Handler Function

//tour
const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    result: tours.length,
    requestAt: req.requestTime,
    data: {
      tours: tours,
    },
  });
};

const getATour = (req, res) => {
  console.log(req.params);
  const id = Number(req.params.id);

  const tour = tours.find((el) => el.id === id);

  // if (id > tours.length) {
  if (!tour) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    tour,
  });
};

const createATour = (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateATour = (req, res) => {
  const id = req.params.id;
  if (id > tours.length) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

const deleteATour = (req, res) => {
  const id = req.params.id;
  if (id > tours.length) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};

//***user
const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'The server is not defined',
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'The server is not defined',
  });
};

const getOneUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'The server is not defined',
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'The server is not defined',
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'The server is not defined',
  });
};

/*
app.get('/api/v1/tours', getAllTours);
app.post('/api/v1/tours', createATour);
app.get('/api/v1/tours/:id', getATour);
app.patch('/api/v1/tours/:id', updateATour);
app.delete('/api/v1/tours/:id', deleteATour);
*/
//TODO:3.Routes

const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter.route('/').get(getAllTours).post(createATour);
tourRouter.route('/:id').get(getATour).patch(updateATour).delete(deleteATour);

userRouter.route('/').get(getAllUsers).post(createUser);
userRouter
  .route('/:id')
  .get(getOneUser)
  .patch(updateUser)
  .delete(deleteUser);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//TODO:4.Starting the server
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
