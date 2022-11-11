const { Router } = require('express');
const { DeathEater } = require('../models/Deatheater');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const data = await DeathEater.getById(req.params.id);
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
      const data = await DeathEater.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
