const fs = require('fs');
const superagent = require('superagent');

const readFilePro = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find file');
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) reject('Could not write a file');
      resolve('sucess');
    });
  });
};

const getDogPic = async () =>{
  try {
    
  
  const data = await readFilePro(`{$__dirname}asynchronous-JS/starter/dog.txt`);
  console.log(`Breed: ${data}`);

  const res = await superagent.get(`https://dog.ceo/api/breeds/image/random`);
  console.log(res.body.message);

  await writeFilePro('dog-img.txt', res.body.message);
  console.log('Random dog image saved to file!');
} catch (error) {
  console.log(err);
  
  throw err;
}
return '2: ready';
};
(async()=>{
  try{
  console.log('1: Will get dogs picks');
  const x = await getDogPic();
  console.log(x);
  console.log('3: Done getting the dogs pics');
}catch(err){
  console.log("Error");
}

})();





/*console.log('1: Will get dogs picks');
getDogPic()
.then(x =>{
  console.log(x);
  console.log('3: Done getting the dogs pics');
}).catch(err=>{
  console.log('Error')
})

   /*
   readFilePro(`{$__dirname}asynchronous-JS/starter/dog.txt`)
  .then(data => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breeds/image/random`);
  })
  .then(res => {
    console.log(res.body.message);

    return writeFilePro('dog-img.txt', res.body.message);
  })
  .then(() => {
    console.log('Random dog image saved to file!');
  })
  .catch(err => {
    console.log(err);
  });
*/