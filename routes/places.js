const
  express = require('express'),
  placesRouter = express.Router();
  placesController = require('../controllers/place')

// GET ALL PLACES
placesRouter.get('/', placesController.index);
// CREATE A PLACE
placesRouter.post('/', placesController.create);

// SHOW A PLACE
placesRouter.get('/:id', placesController.show)
// UPDATE A PLACE
placesRouter.put('/:id', placesController.update)
// DELETE PLACE
placesRouter.delete('/:id', placesController.delete)

// Create a post
placesRouter.post('/:place_id/posts')
// Show a post
placesRouter.get('/:place_id/posts/:id')
// Delete a post
placesRouter.delete('/:place_id/posts/:id')
// Update a post
placesRouter.put('/:place_id/posts/:id')

module.exports = placesRouter;
