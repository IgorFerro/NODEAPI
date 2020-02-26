const mongoose = require('mongoose');
const slugify = require('slugify')

//Create Schema
const tourSchema = new mongoose.Schema({
    name:{
      type: String,
      required:[true,'A tour must have a name'],
      unique: true,
      trim: true
    },
    slug: String,
    duration:{
     type: Number,
     required: [true,'A tour must have a duration']
    },
    maxGroupSize:{
      type:Number,
      requires: [true, 'A tour must have a group size']
    },
    difficulty:{
      type: String,
      required:[true, 'A tour must have a difficulty']
    },
    ratingsAverage:{
      type:Number,
      default: 4.5,
    },
    ratingsQuantity:{
      type:Number,
      default: 0
    },
    price:{
      type:Number,
      required:[true, 'A tour must have a price!']
    },
    priceDiscount:Number,
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description']
    },
    description:{
      type: String,
      trim:true
    },
    imageCover:{
      type: String,
      required: [true, 'A tour must have a cover image']
    },
images: [String],
createAt: {
  type: Date,
  default: Date.now(),
  select: false
},
 startDates:[Date],
 secretTour: {
   type: Boolean,
   default: false
 }
}, {
  toJSON: {virtuals:true},
  toObject: {virtuals:true}
  });

  tourSchema.virtual('durationWeeks').get(function(){
    return this.duration / 7;
  });

  //MONGOOSE DOCUMENT MIDDLEWARE: runs before .save() and .create()
  tourSchema.pre('save',function(next){
  this.slug=slugify(this.name,{lower: true})
  next();
  });

  //MONGOOSE QUERY MIDDLEWARE
  tourSchema.pre(/^find/, function(next){
    this.find({secretTour: {$ne: true}})
    this.start =Date.now();
    next();
  });

  tourSchema.post(/^find/, function(docs,next){
    console.log(`Query took ${Date.now() - this.start} millesenconds `)
    console.log(docs);
    next();
  })

  //MONGOOSE AGGREGATION MIDDLEWARE
  tourSchema.pre('aggregate',function(next){
    this.pipeline().unshift({$match:{secretTour:{$ne: true }}})
    console.log(this.pipeline)
    next();
  })



  const Tour = mongoose.model('Tour',tourSchema);

  module.exports = Tour;