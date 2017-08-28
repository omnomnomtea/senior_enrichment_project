const campusRouter = require('./campus');
const studentRouter = require('./student')

const api = require('express').Router()

api.use('./campus', campusRouter);
api.use('./student', studentRouter);

export default api;
