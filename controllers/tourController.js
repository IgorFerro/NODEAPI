const Tour =require('./../models/tourModel')

//Get All Tours
exports.getAllTours = async (req,res) =>{
    try{
     //BUILD QUERY   
     // 1A- Filtering
    const queryObj= {...req.query};
    const excludedFields = ['page', 'sort','limits','fields'];
    excludedFields.forEach(el => delete queryObj[el]);
    
    //1B- Advanced Filtereing 
    let queryStr =JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

     //EXECUTE QUERY
    let query = Tour.find(JSON.parse(queryStr));

    //2 SORTING
    if (req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ');
        query =query.sort(sortBy);
    }else{
        query = query.sort('-createdAt');
    }
    
    //3 FIELD LIMITING
    if (req.query.fields){
        const fields = req.query.fields.split(',').join(' ');
        query = query.select(fields);
    }else{
        query = query.select('-__v');
    }

     /*const tours = await Tour.find()
    .where('duration')
    .equals('5')
    .where('difficulty')
    .equals('easy')*/

    const tours = await query;

    //SEND RESPONSE
    res.status(200).json({
        status: 'sucess',
        results: tours.length,
        data: {
            tours
        }
    });
}catch(err) {
    res.status(404).json({
        status:'fail',
        message: err
    })
}
  };

  //Get Tour
  exports.getTour = async (req,res) =>{
   try{
       const tour = await Tour.findById(req.params.id);

       res.status(200).json({
        status: 'sucess',
        data: {
            tour
        }
    });
   }catch (err){
    res.status(404).json({
        status:'fail',
        message: err
    })
}
  };
   //Create Tour
  exports.createTour = async (req,res) => {
  try{
  const newTour = await Tour.create(req.body);
  res.status(201).json({
      status: 'success',
      data:{
          tour: newTour
      }
  });
 }catch(err){
     res.status(400).json({
         status: 'fail',
         message: 'Invalid data sent!'
        })
    }
      };

//Update Tours
exports.updateTour = async (req , res) => {
    try{
   const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
       new: true,
       runValidators: true
   });

   res.status(200).json({
       status: 'success',
       data:{
           tour
       }
   });
}catch (err){
    res.status(404).json({
        status:'fail',
        message: err 
    })
}
};
//Delete Tour

exports.deleteTour= async (req , res) => {
    try{
   await Tour.findByIdAndDelete(req.params.id)
   res.status(204).json({
       status: 'success',
       data: null
    });
     }catch(err){
        res.status(404).json({
            status:'fail',
            message: err 
        })
       }
};