const fs =  require('fs')

//Blocking, synchronous eaw
//Reading Files
const textIn = fs.readFileSync('.//1-node-farm//starter//txt//input.txt', 'utf-8');
console.log(textIn);

//Writing Files
const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync('.//1-node-farm//starter//txt//output.txt', textOut);
console.log('File written!')

//Non-Blocking, asynchronous way
fs.readFile('.//1-node-farm//starter//txt//start.txt', 'utf-8', (err, data1) => {
    if(err) return console.log('ERROR');

    fs.readFile(`.//1-node-farm//starter//txt//${data1}.txt`, 'utf-8', (err, data2) => {   
    console.log(data2);
    fs.readFile('.//1-node-farm//starter//txt//append.txt', 'utf-8', (err, data3) => {   
    console.log(data3);
    
    fs.writeFile('.//1-node-farm//starter//txt//final.txt', `${data2}\n${data3}`, 'utf-8', err=> {
        console.log('Your file has been written');
    });
 });
});
});
console.log('Will read file');