const router = require('express').Router()
const workoutRoutes = require('./wourkoutRoutes');

router.use('/workouts',workoutRoutes);

module.exports router;