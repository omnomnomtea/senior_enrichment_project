// Database seed file
// The data can then be loaded with 'npm run seed'

const { db, Campus, Student, User } = require('./db/models/index');
const Promise = require('bluebird');

var data = {
  campus: [
    { name: 'Tatooine', image: 'https://vignette2.wikia.nocookie.net/starwars/images/8/82/Tatooine-TOR.jpg' },
    { name: 'Alderaan', image: 'https://vignette1.wikia.nocookie.net/starwars/images/4/4a/Alderaan.jpg' },
    { name: 'Death Star', image: 'https://upload.wikimedia.org/wikipedia/en/f/f9/Death_star1.png' },

  ],

  student: [
    { firstName: 'Han', lastName: 'Solo', email: 'falcon@millenium.edu' },
    { firstName: 'Leia', lastName: 'Organa', email: 'princess@aldaraan.gov' },
    { firstName: 'Luke', lastName: 'Skywalker', email: 'lukesr2@isthebestdroid.edu' },
    { firstName: 'Poe', lastName: 'Dameron', email: 'bleh@rebel.com' },
    { firstName: 'Chewbacca', lastName: 'Solo', email: 'bleh@bleh.edu' },
    //I don't know what Chewbacca's last name is or if
    // he has one, and I like this being a mystery so I didn't google it.
    // Originally I put his last name as "idk" but that bothered me
    // So I decided that Han adopted him. Or they're married or something.
    // You can decide for yourself
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
