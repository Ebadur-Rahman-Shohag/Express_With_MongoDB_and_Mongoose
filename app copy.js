import express from 'express';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const app = express();

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
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
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
      tours: tours,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
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
});

app.get('/api/v1/tours/:id', (req, res) => {
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
});

app.patch('/api/v1/tours/:id', (req, res) => {
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
});

app.delete('/api/v1/tours/:id', (req, res) => {
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
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

/*JSON.stringify() in JavaScript. This is a very useful function for converting JavaScript objects into JSON strings. This function is commonly used in web development for sending data from a client to a server or for storing information in a format that is easily sharable and storable.*/
