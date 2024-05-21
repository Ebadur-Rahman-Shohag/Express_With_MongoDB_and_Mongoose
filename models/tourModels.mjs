import mongoose from 'mongoose';
import slugify from 'slugify';
// import validator from 'validator'; 

//***********************************Schema************************************
const tourSchema = new mongoose.Schema(
  //schema definition
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'], //this is a data validator
      unique: true,
      trim: true,
      maxlength: [40, 'A tour must have less or equal than 40 characters'], //this is a data validator
      minlength: [10, 'A tour must have more or equal than 10 characters'], //this is a data validator
      // validate: [validator.isAlpha, 'A tour name must only contain letters'], 
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'], //this is a data validator
        message: 'Difficulty either: easy, medium, difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must me above or equal 1.0'], //this is a data validator
      max: [5, 'Rating must me above or equal 5.0'], //this is a data validator
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        //custom validator
        validator: function (value) {
          //this only points to current document on NEW document creation. So, this custom validator is not goining to work on UPDATE.
          return value < this.price;
        },
        message: 'Discount price ({VALUE}) should be below regular price',
      },
    },
    summary: {
      type: String,
      trim: [true, 'A tour must have a summary'],
    },
    rating: {
      type: Number,
      default: 4.5,
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretTour: { type: Boolean, default: false },
  },
  //**************************schema options***********************************
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//***************************Virtual properties**********************************
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

//*********************************Mongoose Middleware****************************
//***DOCUMENT MIDDLEWARE: runs before .save() and .create()
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourSchema.pre('save', function (next) {
//   console.log('Will save document....');
//   next();
// });
// tourSchema.post('save', function (doc, next) {
//   console.log(doc);
//   next();
// });

//***QUERY MIDDLEWARE
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  next();
});

// tourSchema.pre(/^find/, function (doc, next) {
//   console.log(doc);
//   next();
// });

//***AGGREGATION MIDDLEWARE
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});

// **************************************model************************************
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
