const User =require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

//Routs Handlers
exports.getAllUsers = catchAsync(async(req,res,next) => {
  
  const users = await User.find();

  res.status(200).json({
      status:'sucess',
      results: this.getAllUsers.length,
      data:{
        users
      }
    });
});

exports.createUser = (req,res) => {
    res.status(500).json({
      status:'error',
      message: 'This route is no yet defined!'  
    });
};

exports.getUser = (req,res) => {
    res.status(500).json({
      status:'error',
      message: 'This route is no yet defined!'  
    });
};

exports.updateUser = (req,res) => {
    res.status(500).json({
      status:'error',
      message: 'This route is no yet defined!'  
    });
};

exports.deleteUser = (req,res) => {
    res.status(500).json({
      status:'error',
      message: 'This route is no yet defined!'  
    });
};