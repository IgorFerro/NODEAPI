const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController')
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
next(new AppError(`Can't find ${req.originalUrl} on this server!`, 400));

});

//Global Error Handling Middleware
app.use(globalErrorHandler);

module.exports = app;
