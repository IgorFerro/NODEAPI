const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());

//Routing
/*app.get('/',(req,res)=>{
    res.status(200)
    .json({message: 'Hello from server side!', app: 'Natours'});
});

app.post('/', (req,res)=>{
    res.send('You can post to this endpoint...')
})*/
//Read the file
const tours =JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours.json`));

app.get('/api/v1/tours', (req,res) =>{
  res.status(200).json({
      results: tours.length,
      status: 'sucess',
      data: {
          tours
      }
  })
});

app.post('/api/v1/tours', (req,res)=>{
    //console.log(req.body);
    const newId = tours[tours.length -1].id +1;
    const newTour = Object.assign({id:newId}, req.body);

    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours.json`,JSON.stringify(tours), err =>{
    res.status(201),json({
        status: 'sucess',
        data:{
            tour: newTour
        }
    })
  })
})



const port = 3001;
app.listen(port, () => {
    console.log(`App running on port ${port}...`)
});

