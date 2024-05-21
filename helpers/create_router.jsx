const express = require('express');
const { ObjectId } = require('mongodb');

const createRouter = function (collection) {
  const router = express.Router();

  router.get('/', (req, res) => {
    collection
      .find()
      .toArray()
      .then((docs) => {
        res.json(docs);
      })
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  router.post('/', (req, res) => {
    const newData = req.body;
    collection
      .insertOne(newData)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  router.delete('/:id', (req, res) => {
    const id = req.params.id;
    try {
      const objectId = new ObjectId(id);
      collection
        .deleteOne({ _id: objectId })
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          console.error(err);
          res.status(500);
          res.json({ status: 500, error: err });
        });
    } catch (err) {
      console.error(err);
      res.status(400);
      res.json({ status: 400, error: 'Invalid ID format' });
    }
  });

  return router;
};

module.exports = createRouter;
