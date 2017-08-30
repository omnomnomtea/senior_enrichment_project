'use strict';
var Sequelize = require('sequelize')
var db = require('../index.js')


module.exports = db.define('campus', {
  name: Sequelize.STRING,
  image: {
    type: Sequelize.STRING,
    // validate: {
    //   isUrl: true,
    // },
  }
})
