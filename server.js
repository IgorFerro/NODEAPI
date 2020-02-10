const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');
const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);

//Conect on DB
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(() =>console.log('DB connection sucessfull'))

//Create Schema
const tourSchema = new mongoose.Schema({
  name:{
    type: String,
    required:[true,'A tour must have a name'],
    unique: true
  },
  rating:{
    type:Number,
    default: 4.5,
  },
  price:{
    type:Number,
    required:[true, 'A tour must have a price!']
  }
});

const Tour = mongoose.model('Tour',tourSchema);

//New instance of tour document
const testTour = new Tour({
  name: 'The Forest Hiker2',
  rating: 4.7,
  price: 497
})

//Save new item
testTour.save().then(doc => {
  console.log(doc);
}).catch(err => {
  console.log('ERROR', err)
})


console.log(app.get('env'));
console.log(process.env);

//START SERVER
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
