const fs = require('fs');
const express = require('express');

const app = express();
app.use(express.json());

//Middleware function
app.use((req, res,next)=>{
 console.log('Hello from the middleware');
 next();   
})

//Middleware function
app.use((req, res, next)=>{
    req.requestTime = new Date().toISOString();
    next();
})

//Read the file
const tours =JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours.json`));

const getAllTours =  (req,res) =>{
    console.log(req.requestTime)
    res.status(200).json({
        status: 'sucess',
        requestAt: req.requestTime,
        results: tours.length,
        data: {
            tours
        }
    });
  };

const getTour = (req,res) =>{
    console.log(req.params);
    const id = req.params.id * 1;
    const tour =tours.find(el=> el.id === id);


    //if(id > tours.length){
        if(!tour){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        });
    }

    res.status(200).json({
        status: 'sucess',
        data: {
            tour
        }
    });
  };

  const createTour = (req,res)=>{
    //console.log(req.body);
    const newId = tours[tours.length -1].id +1;
    const newTour = Object.assign({id:newId}, req.body);

    tours.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours), err =>{
    res.status(201).json({
        status: 'sucess',
        data:{
            tour: newTour
        }
    })
  });
};

const updateTour = (req , res) => {
    if(req.params.id * 2 > tours.length){
           return res.status(404).json({
               status: 'fail',
               message: 'Invalid ID'
           });
       }
   res.status(200).json({
       status: 'success',
       data:{
           tour: '<Updated tour here...>'
       }
   })
};

const deleteTour= (req , res) => {
    if(req.params.id * 2 > tours.length){
           return res.status(404).json({
               status: 'fail',
               message: 'Invalid ID'
           });
       }
   res.status(204).json({
       status: 'success',
       data:{
           tour: null
       }
   })
};

//Serach All tours
/*
app.get('/api/v1/tours' ,getAllTours);
//Search by id for 01 tour
app.get('/api/v1/tours/:id', getTour);
//Make a post
app.post('/api/v1/tours', createTour);
//Make a Patch
app.patch('/api/v1/tours/:id',updateTour);
//Make Delete
app.delete('/api/v1/tours/:id', deleteTour)
*/
app
.route('/api/v1/tours')
.get(getAllTours)
.post(createTour);

app
.route('/api/v1/tours/:id')
.get(getTour)
.patch(updateTour)
.delete(deleteTour);


const port = 3001;
app.listen(port, () => {
    console.log(`App running on port ${port}...`)
});

