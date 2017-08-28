'use strict';
var Sequelize = require('sequelize')
var db = require('../index.js')

module.exports = db.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
})
