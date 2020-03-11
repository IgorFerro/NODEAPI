const Review = require('./../models/reviewModel');
//const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');



exports.setToursUserIds = (req,res,next) =>{
 //Allow nested routes
 if(!req.body.tour) req.body.tour = req.params.tourId;
 if(!req.body.user) req.body.user = req.user.id;
 next();
}
//Get all Reviews 
exports.getAllReviews = factory.getAll(Review);
//Get Review
exports.getReview =  factory.getOne(Review);
//Create Review
exports.createReview = factory.createOne(Review);
//Update Review
exports.updateReview = factory.updateOne(Review);
//Delete Review
exports.deleteReview = factory.deleteOne(Review);
