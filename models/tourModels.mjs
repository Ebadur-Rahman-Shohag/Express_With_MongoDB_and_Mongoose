import mongoose from 'mongoose';

//Schema
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
  rating: {
    type: Number,
    default: 4.5,
  },
});

// model
const Tour = mongoose.model('Tour', tourSchema);

export default Tour;

/*
//Test Document
const testTour = new Tour({
    name: 'The Park Camper',
    price: 500,
  });
  
  testTour
    .save()
    .then((doc) => {
      console.log(doc);
    })
    .catch((err) => {
      console.log('Error:🤢 ', err);
    });
*/
