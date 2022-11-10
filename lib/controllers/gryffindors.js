const { Router } = require('express');
const { Gryffindor } = require('../models/Gryffindor');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const data = await Gryffindor.getById(req.params.id);
      if (!data) {
        next();
      }
      res.json(data);
    } catch (e) {
      next(e);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const data = await Gryffindor.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const gryffindorUpdate = await Gryffindor.updateById(
        req.params.id,
        req.body
      );
      res.json(gryffindorUpdate);
    } catch (e) {
      next(e);
    }
  });
