const { Router } = require('express');
const { DeathEater } = require('../models/Deatheater');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const data = await DeathEater.getAll();
    res.json(data);
  } catch (e) {
    next(e);
  }
});
