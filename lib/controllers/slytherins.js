const { Router } = require('express');
const { Slytherin } = require('../models/Slytherin');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const data = await Slytherin.getById(req.params.id);
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
      const data = await Slytherin.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
