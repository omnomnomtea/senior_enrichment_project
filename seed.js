// Database seed file
// The data can then be loaded with "npm run seed"

const { db, Campus, Student, User } = require('./db/models');
const Promise = require('bluebird');

var data = {
  campus: [
    { name: 'Mars', image: 'http://media.salon.com/2015/09/mars-614x412.jpg' },
    { name: 'Jupiter', image: 'https://www.nasa.gov/sites/default/files/thumbnails/image/jupapr3color-jd-170304.png' }
  ],

  student: [
    { firstName: 'Andy', lastName: 'Wallaby' },
    { firstName: 'Antoinette', lastName: 'Smith' },
  ],
  user: [
    { username: 'bb8', password: 'pizza' },
    { username: 'r2d2', password: 'lukeIsCool' },
    { username: 'c3p0', password: 'ohDear!' },
  ]
};

db.sync({})
  .then(function () {
    console.log("Dropped old data, now inserting data");
    const users = data.user.map((user) => {
      return User.create(user);
    })
    return Promise.all(users);
  })
  .then(() => {
    console.log("USERS ADDED!")
    const campuses = data.campus.map((campus) => {
      return Campus.create(campus);
    })
    return Promise.all(campuses);
  })
  .then((campuses) => {
    console.log("CAMPUSES ADDED!")
    const students = data.student.map((student) => {
      const studentInstance = Student.build(student);
      return studentInstance.setCampus(campuses[0]); //this returns a promise
    })
    return Promise.all(students);
  })
  .then(() => {
    console.log("STUDENTS ADDED!")
  })
  .catch(function (err) {
    console.error('There was totally a problem', err, err.stack);
  })
  .finally(() => {
    //db.close();
  });
