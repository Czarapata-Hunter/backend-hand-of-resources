const { Router } = require('express');
const { Hufflepuff } = require('../models/Hufflepuff');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const hufflepuff = await Hufflepuff.getHufflepuffsById(req.params.id);
      if (!hufflepuff) {
        next();
      }
      res.json(hufflepuff);
    } catch (e) {
      next(e);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const hufflepuff = await Hufflepuff.getAllHufflepuffs();
      res.json(hufflepuff);
    } catch (e) {
      next(e);
    }
  })

  .post('/', async (req, res, next) => {
    try {
      const hufflepuff = await Hufflepuff.insert(req.body);
      res.json(hufflepuff);
    } catch (e) {
      next(e);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const data = await Hufflepuff.delete(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
