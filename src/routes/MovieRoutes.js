import express from 'express';
const router = express.Router();
import MoviesController from '../controllers/MoviesController';


// Declare a GET (a list of movies) route
router.get('/movies', MoviesController.list);


// Declare a GET (a single movie) route
router.get('/movies/:_id', MoviesController.show);


// Declare a POST (creates a new movie) route
router.post('/movies', MoviesController.create);


// Declare a PUT (update/change a movie) route
router.put('/movies/:_id', MoviesController.update);


// Declare a Delete (a movie) route
router.delete('/movies/:_id', MoviesController.remove);


module.exports = router;
