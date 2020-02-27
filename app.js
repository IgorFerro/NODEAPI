const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//1-MIDDLEWARES
if (process.env.NODE_EVN === 'development'){
  app.use(morgan('dev'));
}
app.use(express.json());
//Midleware for read the static file
app.use(express.static('C://Node-Api-2//NODEAPI//public'))



//Middleware function
app.use((req, res, next)=>{
    req.requestTime = new Date().toISOString();
    next();
});

//2- ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// Handling Unhandled Routes
app.all('*',(req, res, next)=>{
  //res.status(404).json({
   // status: 'fail',
  //  message: `Can't find ${req.originalUrl} on this server!`
  //});
const err = new Error( `Can't find ${req.originalUrl} on this server!`);
err.status = 'fail';
err.statusCode = 404;

next(err);

});

//Global Error Handling Middleware
app.use((err, req, res, next)=>{
  err.statusCode = err.statusCode || 500;
  err.status= err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
});

module.exports = app;
