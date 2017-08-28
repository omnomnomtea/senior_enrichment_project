const campusRouter = require('./campus');
const studentRouter = require('./student');

const api = require('express').Router();

api.use('/campuses', campusRouter);
api.use('/students', studentRouter);

module.exports = api;
