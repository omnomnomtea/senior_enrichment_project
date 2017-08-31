// Database seed file
// The data can then be loaded with 'npm run seed'

const { db, Campus, Student, User } = require('./db/models/index');
const Promise = require('bluebird');

var data = {
  campus: [
    { name: 'Mars', image: 'https://mars.nasa.gov/images/mars-globe-valles-marineris-enhanced.jpg' },
    { name: 'Jupiter', image: 'https://solarsystem.nasa.gov/images/planets/galpic_jupiter.png' },
    { name: 'Death Star', image: 'https://upload.wikimedia.org/wikipedia/en/f/f9/Death_star1.png' },

  ],

  student: [
    { firstName: 'Han', lastName: 'Solo', email: 'falcon@millenium.edu' },
    { firstName: 'Leia', lastName: 'Organa', email: 'princess@aldaraan.gov' },
    { firstName: 'Luke', lastName: 'Skywalker', email: 'lukesr2@isthebestdroid.edu' },
    { firstName: 'Poe', lastName: 'Dameron', email: 'bleh@rebel.com' },
    { firstName: 'Chewbacca', lastName: 'idk', email: 'bleh@bleh.edu' },
    { firstName: 'Darth', lastName: 'Vader', email: 'anakin@skywalker.com' },

  ],
  user: [
    { username: 'bb8', password: 'pizza', email: 'bb8@bleh.com' },
    { username: 'r2d2', password: 'lukeIsCool', email: 'r2d2@yahoo.com' },
    { username: 'c3p0', password: 'ohDear!', email: 'c3p0@bleh.edu' },
  ]
};

db.sync({ force: true })
  .then(function () {
    console.log('Dropped old data, now inserting data');
    const users = data.user.map((user) => {
      return User.create(user);
    })
    return Promise.all(users);
  })
  .then(() => {
    console.log('USERS ADDED!')
    const campuses = data.campus.map((campus) => {
      return Campus.create(campus);
    })
    return Promise.all(campuses);
  })
  .then((campuses) => {
    console.log('CAMPUSES ADDED!')
    const students = data.student.map((student) => {
      const studentPromise = Student.build(student).save();
      //console.log('studentinstance:', studentInstance);
      return studentPromise;
    })
    return Promise.all([Promise.all(students), campuses]);
  })
  .then(([students, campuses]) => {

    const studentSetCampus = students.map((student) => {
      return student.setCampus(campuses[Math.floor(Math.random() * campuses.length)]);
    })

    return Promise.all(studentSetCampus);

  })
  .then(() => {
    console.log('STUDENTS ADDED!')
  })
  .catch(function (err) {
    console.error('There was totally a problem', err, err.stack);
  })
  .finally(() => {
    db.close();
  });
