'use strict'
const debug = require('debug')('sql');
const chalk = require('chalk');
const Sequelize = require('sequelize');

const name = 'tess_enrichment_project';
const connectionString = `postgres://localhost:5432/${name}`;

console.log(chalk.yellow(`Opening database connection to ${connectionString}`));

// create the database instance that can be used in other database files
var db = new Sequelize(connectionString, { logging: true });

// run our models file (makes all associations for our Sequelize objects)
require('./models')

// sync the db, creating it if necessary
function sync(force=true, retries=0, maxRetries=5) {
  return db.sync({force: true})
  .then(ok => console.log(`Synced models to db ${connectionString}`))
  .catch(fail => {
    // Don't do this auto-create nonsense in prod, or
    // if we've retried too many times.
    if (process.env.NODE_ENV === 'production' || retries > maxRetries) {
      console.error(chalk.red(`********** database error ***********`))
      console.error(chalk.red(`    Couldn't connect to ${connectionString}`))
      console.error()
      console.error(chalk.red(fail))
      console.error(chalk.red(`*************************************`))
      return
    }
    // Otherwise, do this autocreate nonsense
    console.log(`${retries ? `[retry ${retries}]` : ''} Creating database ${name}...`)
    return new Promise((resolve, reject) =>
      require('child_process').exec(`createdb "${name}"`, resolve)
    ).then(() => sync(true, retries + 1))
  })
}

db.didSync = sync();

module.exports = db;
