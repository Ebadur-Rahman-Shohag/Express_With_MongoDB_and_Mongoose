import express from 'express';
import morgan from 'morgan';
import tourRouter from './routes/tourRoutes.mjs';
import userRouter from './routes/userRoutes.mjs';

const app = express();

//TODO: Middleware

//built in middleware
app.use(express.json());

//serving static files
app.use(express.static('./public/'));

//third party middleware

if ((process.env.NODE_ENV = 'development')) {
  app.use(morgan('dev'));
}

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

//TODO:Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

export default app;

/*
JSON.parse() is a crucial function in JavaScript used to convert JSON strings into JavaScript objects. This function is widely used in web development, especially when dealing with data received from a server or APIs, which is often in JSON format. JSON.parse() enables developers to work with the data as native JavaScript objects.*/
/*JSON.stringify() in JavaScript. This is a very useful function for converting JavaScript objects into JSON strings. This function is commonly used in web development for sending data from a client to a server or for storing information in a format that is easily sharable and storable.*/
