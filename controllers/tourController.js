const Tour =require('./../models/tourModel')

//Get All Tours
exports.getAllTours = async (req,res) =>{
    try{
     //BUILD QUERY   
    const queryObj= {...req.query};
    const excludedFields = ['page', 'sort','limits','fields'];
    excludedFields.forEach(el => delete queryObj[el]);


    //console.log(req.query, queryObj);

    //EXECUTE QUERY
    const query = Tour.find(queryObj);

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