const fs = require('fs');
const express = require('express');

const app = express();

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


const port = 3001;
app.listen(port, () => {
    console.log(`App running on port ${port}...`)
});

