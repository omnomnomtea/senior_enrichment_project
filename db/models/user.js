'use strict';
var Sequelize = require('sequelize');
var db = require('../db.js');

module.exports = db.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    },
    allowNull: false,
  },
})
