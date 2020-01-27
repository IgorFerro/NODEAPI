const fs =  require('fs')

//Reading Files
const textIn = fs.readFileSync('.//1-node-farm//starter//txt//input.txt', 'utf-8');
console.log(textIn);

//Writing Files
const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync('.//1-node-farm//starter//txt//output.txt', textOut);
console.log('File written!')