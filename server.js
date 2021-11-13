const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/populate", { useNewUrlParser: true });

app.get('/api/workouts',(req,res) => {
  db.Workout.findOne({}, {}, { sort: { day : -1 } }, (err,data) => {
    if(err) {
      res.json(err)
    } else {
      res.json(data)
    }
  })
});
app.put('/api/workouts/:id',(req,res) => {
  db.Exercise.create(req.body)
    .then((data) => {
      db.Workout.findOneAndUpdate({_id:req.params.id},{$push: {exercise: data._id}}, {new:true})
    })
    .then(dbWorkout => res.json(dbWorkout))
    .catch(err=> res.json(err));
});
app.post("/api/workouts", (req,res) => {
  db.Workout.create(req.body, (err,data) =>{
    if(err) {
      res.json(err)
    } else {
      res.json(data)
    }
  })
});
app.get('/api/workouts/range',(req,res) => {
  db.Workout.find({})
    .populate("exercise")
    .then(data => res.json(data))
    .catch(err=> res.json(err))
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });