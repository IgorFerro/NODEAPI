const Tour =require('./../models/tourModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

exports.aliasTopTours = (req, res , next) =>{
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();

};
//Get All Tours
exports.getAllTours = catchAsync(async (req,res,next) =>{

    //EXECUTE QUERY
    const features = new APIFeatures(Tour.find(),req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
    const tours = await features.query;

    //SEND RESPONSE
    res.status(200).json({
        status: 'sucess',
        results: tours.length,
        data: {
            tours
        }
    });
  });

  //Get Tour
  exports.getTour = catchAsync(async (req,res,next) =>{
    const tour = await Tour.findById(req.params.id).populated('reviews');
      
    if(!tour){
      return next(new AppError('No Tour found with that ID', 404))
    }

       res.status(200).json({
        status: 'sucess',
        data: {
            tour
        }
    });
  });

  //Create Tour
 exports.createTour = factory.createOne(Tour);
//Update Tours
exports.updateTour = factory.updateOne(Tour);
//Delete Tour
exports.deleteTour = factory.deleteOne(Tour);


/*
exports.deleteTour= catchAsync(async (req , res, next) => {
  const tour = await Tour.findByIdAndDelete(req.params.id)

   if(!tour){
    return next(new AppError('No Tour found with that ID', 404))
  }

   res.status(204).json({
       status: 'success',
       data: null
    });
});
*/
exports.getTourStats = catchAsync(async (req, res, next) => {
      const stats = await Tour.aggregate([
        {
          $match: { ratingsAverage: { $gte: 4.5 } }
        },
        {
          $group: {
            _id: { $toUpper: '$difficulty' },
            numTours: { $sum: 1 },
            numRatings: { $sum: '$ratingsQuantity' },
            avgRating: { $avg: '$ratingsAverage' },
            avgPrice: { $avg: '$price' },
            minPrice: { $min: '$price' },
            maxPrice: { $max: '$price' }
          }
        },
        {
          $sort: { avgPrice: 1 }
        }
        // {
        //   $match: { _id: { $ne: 'EASY' } }
        // }
      ]);
  
      res.status(200).json({
        status: 'success',
        data: {
          stats
        }
      });
  });

  exports.getMonthlyPlan  = catchAsync(async(req,res,next) =>{
      const year =req.params.year * 1;
      const plan = await Tour.aggregate([
        {
          $unwind: '$startDates'
        },
        {
          $match :{
            startDates:{
              $gte: new Date(`${year}-01-01`),
              $lte: new Date(`${year}-12-31`)
            }
          }
        },
        {
        $group: {
          _id: {$month: '$startDates'},
          numTourStarts: {$sum: 1},
          tours: {$push: '$name'}
        }
        },
        {
          $addFields: {month: '$_id'}
        },
        {
          $project: {
            _id: 0
          }
        },
        {
          $sort: {numTourStarts: -1}
        },
        {
          $limit: 12
        }
      ]);

      res.status(200).json({
        status: 'sucess',
        data:{
          plan
        }
     });
  });