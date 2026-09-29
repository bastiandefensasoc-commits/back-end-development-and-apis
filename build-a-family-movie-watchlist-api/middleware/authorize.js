// Parents may modify any watchlist; children may only modify their own.
export function authorizeModification(req, res, next) {
  const { role, id } = req.user || {};
  const isParent = role === "parent";
  const isOwnList = role === "child" && String(id) === String(req.params.userId);

  if (!isParent && !isOwnList) {
    return res.status(403).json({ error: "Access denied" });
  }
  next();
}
