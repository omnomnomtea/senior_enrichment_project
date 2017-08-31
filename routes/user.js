const router = require('express').Router()
const User = require('../db/models/user')

router.get('/', (req, res, next) => {
  User.findAll()
    .then((users) => {
      res.json(users);
    })
    .catch(next);
})

router.get('/:userId', (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      res.json(user);
    })
    .catch(next);
})

router.post('/', (req, res, next) => {
  User.create(req.body)
    .then((user) => {
      res.json(user);
    })
    .catch(next);
})

router.put('/userId', (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      return user.update(req.body);
    })
    .then(user => {
      res.json(user);
    })
    .catch(next);
})

router.delete('/:userId', (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      return user.destroy();
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch(next);
})


module.exports = router;
