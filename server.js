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


console.log(app.get('env'));
console.log(process.env);

//START SERVER
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
