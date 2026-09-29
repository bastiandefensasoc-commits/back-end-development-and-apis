import { Router } from "express";

import { authenticate } from "../middleware/authenticate.js";
import { authorizeModification } from "../middleware/authorize.js";
import {
  addMovie,
  deleteMovie,
  getWatchlist,
  updateMovie,
} from "../utils/db.js";

const router = Router();

router.use(authenticate);

router.get("/:userId", (req, res) => {
  const watchlist = getWatchlist(Number(req.params.userId));

  if (!watchlist) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(watchlist);
});

router.post("/:userId/movies", authorizeModification, (req, res) => {
  const { title, genre } = req.body ?? {};

  if (!title || !genre) {
    return res.status(400).json({ error: "Title and genre are required." });
  }

  const movie = addMovie(Number(req.params.userId), { title, genre });

  if (!movie) {
    return res.status(404).json({ error: "User not found" });
  }

  res.status(201).json(movie);
});

router.put("/:userId/movies/:movieId", authorizeModification, (req, res) => {
  const { title, genre, watched } = req.body ?? {};
  const updates = {};

  if (title !== undefined) updates.title = title;
  if (genre !== undefined) updates.genre = genre;
  if (watched !== undefined) updates.watched = Boolean(watched);

  const movie = updateMovie(
    Number(req.params.userId),
    Number(req.params.movieId),
    updates,
  );

  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }

  res.json(movie);
});

router.delete("/:userId/movies/:movieId", authorizeModification, (req, res) => {
  const deleted = deleteMovie(
    Number(req.params.userId),
    Number(req.params.movieId),
  );

  if (!deleted) {
    return res.status(404).json({ error: "Movie not found" });
  }

  res.json({ message: "Movie removed" });
});

export default router;
