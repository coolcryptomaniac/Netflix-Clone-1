import express from "express";

import throwRPCErrors from "../../utils/throwRPCErrors";
import handleRPCRes from "../../utils/handleRPCRes";
import { movieService } from "../../config/serviceClient.config";

const router = express.Router();

router.get("/filters", (req, res) => {
  const { search_term } = req.query;
  const reqData = { searchTerm: search_term };
  movieService.request("getMovieSearchResult", reqData, (err, response) => {
    if (err) {
      throwRPCErrors(err, res);
    } else {
      handleRPCRes(response, res);
    }
  });
});

router.get("/collections/:collectionName", (req, res) => {
  const { collectionName } = req.params;
  const reqData = { collectionName };
  movieService.request("getMovieCollections", reqData, (err, response) => {
    if (err) {
      throwRPCErrors(err, res);
    } else {
      handleRPCRes(response, res);
    }
  });
});

router.get("/:movieId", (req, res) => {
  const { movieId } = req.params;
  const reqData = { movieId };
  movieService.request("getMovie", reqData, (err, response) => {
    if (err) {
      throwRPCErrors(err, res);
    }
    handleRPCRes(response, res);
  });
});

export default router;
