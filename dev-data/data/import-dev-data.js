const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');


dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);

//Conect on DB
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(() =>console.log('DB connection sucessfull'))

//START SERVER
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

//READ THE JSON FILE
const tours = JSON.parse(fs.readFileSync(`${__dirname}tours-simple-.json`,'uft-8'));

//IMPORT DA INTO DB
const importData  = async () =>{
    try {
        await Tour.create(tours);
        console.log('Data successfully loaded')
       
    } catch (error) {
        console.log(error)
        }
        process.exit();

};

//DELETE ALL DATA FROM DB
const deleteData = async () =>{
    try {
        await Tour.deleteMany();
        console.log('Data successfully deleted')
       
    } catch (error) {
        console.log(error);
    }
    process.exit();
};

if (process.argv[2]==='--import') {
    importData();
}else if (process.argv[2] ==='--delete') {
 deleteData();
};
