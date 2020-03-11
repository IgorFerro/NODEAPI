const User =require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');


const filterObj = (obj, ...allowedFields) => {
   const newObj = {};
   Object.keys(obj).forEach(el =>{
     if(allowedFields.includes(el)) newObj[el] = obj[el];
   })
   return newObj;
}
//Routs Handlers


exports.createUser = (req,res) => {
    res.status(500).json({
      status:'error',
      message: 'This route is not defined! Please use/signup instead'  
    });
};

exports.updateMe  = catchAsync(async(req, res, next) =>{
  //1- Create error if user Posts password data
  if(req.body.password || req.body.passwordConfirm) {
    return next (new AppError
      ('This route is not for password updates. Please use /updateMyPassword.',400 ));
  };
   //2- Filtered out unwanted fields names that are not allowed to be update
  const filteredBody = filterObj(req.body, 'name', 'email');
   //2- Upadate user document
  const updateUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
   new: true,
   runValidators: true
 });
 
   res.status(200).json({
     status: 'success',
     data:{
       user: updateUser
     }
   });
});

exports.deleteMe =catchAsync(async(req, res,next)=> {
  await User.findByIdAndUpdate(req.user.id, {active:false});

  res.status(204).json({
    status: 'sucess',
    data:null
  });
});

// Get All Users
exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
//Do no update passwords with this
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
