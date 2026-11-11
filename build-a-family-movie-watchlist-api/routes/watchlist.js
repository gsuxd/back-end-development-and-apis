import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";
import { addMovie, deleteMovie, getWatchlist, updateMovie } from "../utils/db.js";
import { authorizeModification } from "../middleware/authorize.js";

const routes = Router();

routes.use(authenticate);

routes.get("/:userId", (req, res) => {
  const userId = Number(req.params.userId);
  const watchlist = getWatchlist(userId) ?? getWatchlist(req.params.userId);

  return res.status(200).json(watchlist);
});

routes.post("/:userId/movies", authorizeModification, (req, res) => {
  const userId = Number(req.params.userId);
  // El payload del test envía el objeto directamente en req.body
  const movie = req.body.movie || req.body;

  const added = addMovie(userId, movie);
  return res.status(201).json(added);
});

routes.put("/:userId/movies/:movieId", authorizeModification, (req, res) => {
  const userId = Number(req.params.userId);
  const movieId = Number(req.params.movieId);
  const movieData = req.body.movie || req.body;

  const updated = updateMovie(userId, movieId, movieData);
  return res.status(200).json(updated);
});

routes.delete("/:userId/movies/:movieId", authorizeModification, (req, res) => {
  const userId = Number(req.params.userId);
  const movieId = Number(req.params.movieId);

  const deleted = deleteMovie(userId, movieId);
  return res.status(200).json(deleted);
});

export default routes;