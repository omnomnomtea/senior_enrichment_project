const campusRouter = require('./campus');
const studentRouter = require('./student');
const userRouter = require('./user');

const api = require('express').Router();

api.use('/campuses', campusRouter);
api.use('/students', studentRouter);
api.use('/users', userRouter);

module.exports = api;
