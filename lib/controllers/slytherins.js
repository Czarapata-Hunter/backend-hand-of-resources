const { Router } = require('express');
const { Slytherin } = require('../models/Slytherin');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const data = await Slytherin.getAll();
    res.json(data);
  } catch (e) {
    next(e);
  }
});
