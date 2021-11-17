const router = require('express').Router();
db = require('../models/Workout')


router.get('/',(req,res) => {
    db.Workout.findOne({$sort: {day: -1}})
    .then(data => res.json(data))
    .catch(err=>res.json(err))
  });

router.put('/:id',(req,res) => {
    db.Exercise.create(req.body)
      .then((data) => {
        console.log(data);
        db.Workout.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id),{$push: {exercises:data._id}},{new: true})
        .then(dbWorkout => {
          console.log(dbWorkout);
          res.json(dbWorkout);
        })
        .catch(err=> res.json(err));
      })
  });

router.post("/", (req,res) => {
    db.Workout.create(req.body, (err,data) =>{
      if(err) {
        res.json(err)
      } else {
        res.json(data)
      }
    })
  });

router.get('/range',(req,res) => {
    db.Workout.find({})
      .then(data => res.json(data))
      .catch(err=> res.json(err))
  });