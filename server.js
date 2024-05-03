import mongoose from "mongoose"
import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });
import app from './app.mjs';
// console.log(app.get('env'));
// console.log(process.env);

// connecting mongoose/database with the app/node
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection successful!'));
/*
  .then((con) => {
    console.log(con.connections);
    console.log('DB connection successful!');
  });
*/

//TODO:Starting the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
