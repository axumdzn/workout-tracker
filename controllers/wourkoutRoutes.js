const { db } = require('../models/Workout');

const router = require('express').Router();
db = require('../models/Workout')


router.get('/',(req,res) => {
    db.Workout.aggregate([
      {
        $addFields: {
          totalDuration:{$sum:'$exercises.duration'}
        }
      }
    ])
    .then(data => res.json(data))
    .catch(err=>res.json(err))
  });

router.put('/:id',(req,res) => {

        db.Workout.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id),{$push: {exercises:req.body}},{new: true})
        .then(dbWorkout => {
          console.log(dbWorkout);
          res.json(dbWorkout);
        })
        .catch(err=> res.json(err));
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

    db.Workout.aggregate([
      {
        $addFields: {
          totalDuration:{$sum:'$exercises.duration'}
        }
      }
    ])
    .sort({day:-1})
    .limit(7)
      .then(data => res.json(data))
      .catch(err=> res.json(err))
  });