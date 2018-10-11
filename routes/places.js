const
  express = require('express'),
  placesRouter = express.Router(),
//   postsRouter = express.Router(),
  placesController = require('../controllers/place'),
  Post = require('../controllers/posts');

// GET ALL PLACES
placesRouter.get('/', placesController.index);
// CREATE A PLACE
placesRouter.post('/', placesController.create);

// SHOW A PLACE
placesRouter.get('/:place_id', placesController.show)
// UPDATE A PLACE
placesRouter.put('/:place_id', placesController.update)
// DELETE PLACE
placesRouter.delete('/:place_id', placesController.delete)

// Create a post
placesRouter.post('/:place_id/posts', Post.create)
// Show form 
placesRouter.get('/:place_id/posts/new', Post.new)
// Show a post
placesRouter.get('/:place_id/posts/:id', Post.show)
// // Delete a post
placesRouter.delete('/:place_id/posts/:id', Post.delete)
// // Update a post
// placesRouter.put('/:place_id/posts/:id', Post.update)
// EDIT POST
placesRouter.get('/:place_id/posts/:post_id/edit', Post.edit) // Displays edit form

placesRouter.patch('/:place_id/posts/:post_id', Post.update) // handles actual updating of post

module.exports = placesRouter;
