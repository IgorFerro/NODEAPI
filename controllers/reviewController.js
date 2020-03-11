const Review = require('./../models/reviewModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getAllReviews = catchAsync(async(req, res, next) => {
    let filter = {};
    if(req.params.tourId) filter = { tour: req.params.tourId}

    const reviews = await Review.find(filter);

    res.status(200).json({
        status: 'success',
        results: reviews.length,
        data:{
            reviews
        }
    });
});

exports.setToursUserIds = (req,res,next) =>{
 //Allow nested routes
 if(!req.body.tour) req.body.tour = req.params.tourId;
 if(!req.body.user) req.body.user = req.user.id;
 next();
}

//Create Review
exports.createReview = factory.createOne(Review);
//Update Review
exports.updateReview = factory.updateOne(Review);
//Delete Review
exports.deleteReview = factory.deleteOne(Review);
