'use strict'
const chalk = require('chalk');
const Sequelize = require('sequelize');

const name = 'tess_enrichment_project';
const connectionString = `postgres://localhost:5432/${name}`;

console.log(chalk.yellow(`Opening database connection to ${connectionString}`));

// create the database instance that can be used in other database files
var db = new Sequelize(connectionString, { logging: console.log });

// run our models file (makes all associations for our Sequelize objects)
require('./models')

db.sync();

module.exports = db;
