const {promisify} = require('util');
const jwt = require('jsonwebtoken')
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError')

const signToken = id => {
 return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
});
}

//SIGNUP
exports.signup = catchAsync(async(req,res,next) =>{
  const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm
  });
  const token =signToken(newUser._id)

  res.status(201).json({
      status: 'sucess',
      token,
      data: {
          user: newUser
      }
  });
});

//LOGIN
exports.login =catchAsync(async (req,res,next) =>{ 
const {email, password} = req.body

// 1- Check if enail and password is correct
if(!email || !password) {
  return next(new AppError('Please provide email and password!', 400));
}
// 2- Check if user exists && password is correct
const user = await User.findOne({email}).select('+password');

if (!user || !(await user.correctPassword(password, user.password))){
    return next(new AppError('Incorrect email or password', 401));
}

console.log(user);

// 3- If everything ok, send token to client
const token = signToken(user._id);
res.status(200).json({
    status: 'sucess',
    token
 });
});

exports.protect =catchAsync(async(req,res,next) => {
    // 1- Getting token and check of it's there
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
     token = req.headers.authorization.slipt(' ')[1]; 
    }
    //console.log(token);
    if(!token) {
        return next( 
            new AppError('You are not logged in! Please log in to get acess.', 401));
    }
    //2- Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    //console.log(decoded);

    //3- Check if user still exists
    const currenthUser = await User.findById(decoded.id);
    if(!currenthUser){
    return next( new AppError('The user belonging to this token does no longer exist.', 401));

    }
    //4- Check if user changed password after the token was issued
    if(currenthUser.changesPasswordAfter(decoded.iat)){
        return next(new AppError('User recently changed password! Please log in again.', 401));
    };
    
    // Grant Acess to protectd route
    req.user = currenthUser;
    next();
});

exports.restrictTo = (...roles) => {
    return(req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(
            new AppError('You do not have permission to perform this action',403) 
            );
    };
    next();
};
 };
exports.forgotPassword = catchAsync(async(req, res, next) => {
    //1- Get user based on Posted email
    const user = await User.findOne({email: req.body.email});
    if(!user) {
        return next(new AppError('There is no user with address.',404));
        
    }
    //2- Genarate the random
    const resetToken =user.createPasswordResetToken();
    await user.save({validateBeforeSave: false});
    //3- Send it to user's email

});
exports.resetPassword = (req, res,next) =>{};






