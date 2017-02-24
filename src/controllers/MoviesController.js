import MovieModel from '../models/MovieModel';
const moviesController = {};


// Declare a (GET = list) (a list of movies) route
moviesController.list = ( (request, response, next) => {
  MovieModel.find().exec()
    .then(movies => {
      return response.json(movies);
    })
    .catch(err => {
      return next(err);
    });
});


// Declare a (GET/:id = show) (a single movie) route.  Gets contact by id
moviesController.show = ( (request, response, next) => {
  MovieModel.findById(request.params._id).exec()
    .then(movie => {
      return response.json(movie);
    })
    .catch(err => {
      return next(err);
    });
});


// Declare a (POST = create) (crates a new movie) route
moviesController.create = ( (request, response, next) => {
  // Creates a new instance of the 'MovieModel'
  // We are grabbing attributes from the request.body object.
  // This is set because we are using body-parser.
  // Constructor function creates a new MovieModel
  const movie = new MovieModel({
    title: request.body.title,
    posterPath: request.body.posterPath,
    overview: request.body.overview,
    releaseDate: request.body.releaseDate,
  });

  // Saves the new movie
  movie.save()
    // When the new movie completes, return the newly created movie
    .then(newMovie => {
      return response.json(newMovie);
    })
    .catch(err => {
      return next(err);
    });
});


// Declare a (PUT = update) (update/change a movie) route
moviesController.update = ( (request, response, next) => {
  MovieModel.findById(request.params._id)
    .then(movie => {
      // Set the attributes on the model from the request.body OR
      // if we receive nothing, use what the movie is already set to.
      // This way if we send an update for just one field,
      // the other fields will not change.
      movie.title = request.body.title || movie.title;
      movie.posterPath = request.body.posterPath || movie.posterPath;
      movie.overview = request.body.overview || movie.overview;
      movie.releaseDate = request.body.releaseDate || movie.releaseDate;

      return movie.save;
    })
    .then(movie => {
      return response.json(movie);
    })
    .catch(err => {
      return next(err);
    });
});


// Declare a (Delete = remove) (a movie) route
moviesController.remove = ( (request, response, next) => {
  MovieModel.findByIdAndRemove(request.params._id).exec()
    .then(movie => {
      return response.json(movie);
    })
    .catch(err => {
      return next(err);
    });
});


module.exports = moviesController;
