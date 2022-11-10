const { Router } = require('express');
const { Ravenclaw } = require('../models/Ravenclaw');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const ravenclaw = await Ravenclaw.getAll();
    res.json(ravenclaw);
  } catch (e) {
    next(e);
  }
});
