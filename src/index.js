import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import movieRoutes from './routes/MovieRoutes';


// Creates a new instance of express
const app = express();

// Connect to the Mongo database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/movie-list');


// Body-parser is middleware that parses incoming request bodies, and
// makes the payload available to use through request.body
app.use(bodyParser.json());


// Add MovieRoutes to the application
app.use(movieRoutes);
app.use( (err, request, response) => {
  return response.status(500).send('Something went wrong... ' + err);
});


// Set the port to server the application
const PORT = 3001;


// Tell the instance of express to listen to request made on Port 3001
app.listen(PORT, (err) => {
  if (err) {
    return console.log('Error!', err);
  }
    return console.log('Listening on: http://localhost: ' + PORT);
});
