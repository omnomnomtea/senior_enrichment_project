const router = require('express').Router()
const { Student } = require('../db/models')

router.get('/', (req, res, next) => {
  Student.findAll()
    .then((students) => {
      res.json(students);
    })
    .catch(next);
})

router.get('/:studentId', (req, res, next) => {
  Student.findById(req.params.studentId)
    .then((student) => {
      res.json(student);
    })
    .catch(next);
})

router.post('/', (req, res, next) => {
  Student.create(req.body)
    .then((student) => {
      res.json(student);
    })
    .catch(next);
})

router.put('/studentId', (req, res, next) => {
  Student.findById(req.params.studentId)
    .then((student) => {
      return student.update(req.body);
    })
    .then(student => {
      res.json(student);
    })
    .catch(next);
})

router.delete('/:studentId', (req, res, next) => {
  Student.findById(req.params.studentId)
    .then((student) => {
      return student.delete();
    })
    .then( () => {
      res.sendStatus(200);
    })
    .catch(next);
})


module.exports = router;
