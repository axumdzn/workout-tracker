const express = require('express')
const router = express.Router()
const workoutRoutes = require('./wourkoutRoutes.js');

router.use('/api/workouts',workoutRoutes);

module.exports = router;