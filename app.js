const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController')
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean');

const app = express();

//1- GLOBALS MIDDLEWARES
//Set security HTTP headers
app.use(helmet())

// Development logging
if (process.env.NODE_EVN === 'development'){
  app.use(morgan('dev'));
}
// Limit request from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in an hour!'
});
app.use('/api',limiter)

// Body parser, reading data from body into req.body
app.use(express.json({limit: '10kb'}));

// Data sanatization againts NoSQL query injection
app.use(mongoSanitize());

// Data sanatization againts XSS
app.use(xss());

//Midleware for read the static file
//Serving Static Files
app.use(express.static('C://Node-Api-2//NODEAPI//public'))

//Middleware function
//Test middleware
app.use((req, res, next)=>{
    req.requestTime = new Date().toISOString();
    console.log(req.headers);
    next();
});

//2- ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// Handling Unhandled Routes
app.all('*',(req, res, next)=>{
next(new AppError(`Can't find ${req.originalUrl} on this server!`, 400));

});

//Global Error Handling Middleware
app.use(globalErrorHandler);

module.exports = app;
