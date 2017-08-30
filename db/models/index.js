'use strict';
const db = require('../db')
const Campus = require('./campus');
const User = require('./user');
const Student = require('./student')

Student.belongsTo(Campus);
Campus.hasMany(Student);

module.exports = { db, User, Campus, Student }
