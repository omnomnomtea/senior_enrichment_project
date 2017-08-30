const Sequelize = require('sequelize');

const name = 'tess_enrichment_project';
const connectionString = `postgres://localhost:5432/${name}`;

var db = new Sequelize(connectionString, { logging: console.log });

module.exports = db;
