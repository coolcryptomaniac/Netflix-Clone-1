import jayson from "jayson";
import {
  SERVICE_MOVIE_PORT,
  NODE_ENV,
  SERVICE_MOVIE_URL,
  SERVICE_MOVIE_NAME
} from "./config/secrets";
import ESClient from "./config/ESClient.config";
import movieController from "./controllers/movie.controller";

// create a server
const server = jayson.server({
  heartbeat(args, callback) {
    callback(null, {
      success: true,
      config: {
        name: SERVICE_MOVIE_NAME,
        url: SERVICE_MOVIE_URL,
        port: SERVICE_MOVIE_PORT
      }
    });
  },
  getMovie(reqData, callback) {
    movieController.getMovie(reqData, callback);
  },
  getMovieSearchResult(reqData, callback) {
    movieController.getMovieSearchResult(reqData, callback);
  },
  getMovieCollections(reqData, callback) {
    movieController.getMovieCollections(reqData, callback);
  }
});

ESClient.ping({ requestTimeout: 30000 }, error => {
  if (error) {
    console.error(`Elasticsearch connection failed: ${error}`);
  } else {
    console.log("Elasticsearch connection success");
  }
});

server
  .http()
  .listen(SERVICE_MOVIE_PORT, () =>
    console.log(
      `Movie Service listenning on port ${SERVICE_MOVIE_PORT} in "${NODE_ENV}" mode`
    )
  );
