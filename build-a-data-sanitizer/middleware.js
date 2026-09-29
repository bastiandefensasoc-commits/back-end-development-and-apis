function inputCleaner(req, _res, next) {
  if (typeof req.body?.username === "string") {
    req.body.username = req.body.username.toLowerCase();
  }
  if (typeof req.body?.comment === "string") {
    req.body.comment = req.body.comment.replace(/<[^>]*>/g, "");
  }
  next();
}

function inputValidator(req, res, next) {
  const username = req.body?.username ?? "";
  if (username.length >= 3) {
    return next();
  }
  const error = encodeURIComponent("Username must be at least 3 characters.");
  res.redirect(`/form?error=${error}`);
}

module.exports = { inputCleaner, inputValidator };
