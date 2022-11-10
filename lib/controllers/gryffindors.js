const { Router } = require('express');
const { Gryffindor } = require('../models/Gryffindor');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const data = await Gryffindor.getAll();
    res.json(data);
  } catch (e) {
    next(e);
  }
});
