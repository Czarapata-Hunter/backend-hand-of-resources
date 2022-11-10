const { Router } = require('express');
const { Hufflepuff } = require('../models/Hufflepuff');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const hufflepuff = await Hufflepuff.getAllHufflepuffs();
    res.json(hufflepuff);
  } catch (e) {
    next(e);
  }
});
