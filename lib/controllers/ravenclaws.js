const { Router } = require('express');
const { Ravenclaw } = require('../models/Ravenclaw');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const ravenclaw = await Ravenclaw.getById(req.params.id);
      if (!ravenclaw) {
        next();
      }
      res.json(ravenclaw);
    } catch (e) {
      next(e);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const ravenclaw = await Ravenclaw.getAll();
      res.json(ravenclaw);
    } catch (e) {
      next(e);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const ravenclawDelete = await Ravenclaw.delete(req.params.id);
      res.json(ravenclawDelete);
    } catch (e) {
      next(e);
    }
  })

  .post('/', async (req, res, next) => {
    try {
      const ravenclaw = await Ravenclaw.insert(req.body);
      res.json(ravenclaw);
    } catch (e) {
      next(e);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const ravenclawInfo = await Ravenclaw.updateById(req.params.id, req.body);
      res.json(ravenclawInfo);
    } catch (e) {
      next(e);
    }
  });
