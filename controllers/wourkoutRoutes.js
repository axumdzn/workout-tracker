
const express = require('express')
const router = express.Router();
const db = require('../models/Workout')


router.get('/',(req,res) => {
    db.aggregate([
      {
        $addFields: {
          totalDuration:{$sum:'$exercises.duration'}
        }
      }
    ])
    .limit(1)
    .then(data => {
      console.log(data);
      res.json(data)})
    .catch(err=>res.json(err))
  });

router.put('/:id',(req,res) => {

        db.findByIdAndUpdate(req.params.id,{$push: {exercises:req.body}},{new: true})
        .then(dbWorkout => {
          console.log(dbWorkout);
          res.json(dbWorkout);
        })
        .catch(err=> res.json(err));
      });

router.post("/", (req,res) => {
    db.create(req.body, (err,data) =>{
      if(err) {
        res.json(err)
      } else {
        res.json(data)
      }
    })
  });

router.get('/range',(req,res) => {
    db.aggregate([
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

  module.exports = router;