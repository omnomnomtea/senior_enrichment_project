const router = require('express').Router()
const { Campus } = require('../db/models')

router.get('/', (req, res, next) => {
  Campus.findAll()
    .then((campuss) => {
      res.json(campuss);
    })
    .catch(next);
})

router.get('/:campusId', (req, res, next) => {
  Campus.findById(req.params.campusId)
    .then((campus) => {
      res.json(campus);
    })
    .catch(next);
})

router.post('/', (req, res, next) => {
  Campus.create(req.body)
    .then((campus) => {
      res.json(campus);
    })
    .catch(next);
})

router.put('/campusId', (req, res, next) => {
  Campus.findById(req.params.campusId)
    .then((campus) => {
      return campus.update(req.body);
    })
    .then(campus => {
      res.json(campus);
    })
    .catch(next);
})

router.delete('/:campusId', (req, res, next) => {
  Campus.findById(req.params.campusId)
    .then((campus) => {
      return campus.delete();
    })
    .then( () => {
      res.sendStatus(200);
    })
    .catch(next);
})


module.exports = router;
