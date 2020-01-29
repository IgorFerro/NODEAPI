const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res)=>{
    //Solution 1
    /*fs.readFile("test-file.txt", (err , data)=>{
        if (err) console.log(err);
        res.end(data);
    });*/


   // Solution 2: Streams
   /*const readble =  fs.createReadStream('test-file.txt')
   readble.on('data', chunk => {
       res.write(chunk)
   })
  readble.on('end', () =>{
      res.end();
  })
  readble.on("error", err =>{
      console.log(err);
      res.statusCode = 500;
      res.end("File not found!")
  })*/

  //Solution 3
  const readble =  fs.createReadStream('test-file.txt');
  readble.pipe(res);
  //readableSource.pipe(writeableDest)
});

server.listen(8000, "127.0.0.1", () =>{
    console.log("Listening...")
});