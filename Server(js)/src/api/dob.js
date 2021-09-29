const express = require('express');
const monk = require('monk');
const Joi = require('@hapi/joi');

// Connect to a database
const db = monk(process.env.MONGO_URI);
// get access to a specific collection
const dob = db.get('dob');

const schema = Joi.object({
  month: Joi.string().trim().required(),
  day: Joi.string().trim().required(),
  year: Joi.string().trim().required(),
});

const router = express.Router();

// READ All Records
router.get('/', async (req, res, next) => {
  try {
    // awaits = function that returns a promise
    const items = await dob.find({});
    res.json(items);
  } catch (error) {
    next(error);
  }
});

// READ One Record
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await dob.findOne({
      _id: id,
    });
    if (!item) 
      return next();
    return res.json(item);
  } catch (error) {
    next(error);
  }
});

// Create One Record
router.post('/', async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    const inserted = await dob.insert(value);
    res.json(inserted);
  } catch (error) {
    next(error);
  }
});

// Update One Record
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const value = await schema.validateAsync(req.body);
    const item = await dob.findOne({
      _id: id,
    });
    if (!item) 
      return next();
    await dob.update({
      _id: id,
    }, {
      $set: value,
    });
    res.json(value);
  } catch (error) {
    next(error);
  }
});

// Delete One Record
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await dob.remove({
      _id: id,
    });
    res.json({
      message: 'Success',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
