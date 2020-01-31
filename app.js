const express = require('express');

const app = express();

//Routing
app.get('/',(req,res)=>{
    res.status(200)
    .json({message: 'Hello from server side!', app: 'Natours'});
});

app.post('/', (req,res)=>{
    res.send('You can post to this endpoint...')
})
const port = 3001;
app.listen(port, () => {
    console.log(`App running on port ${port}...`)
});

