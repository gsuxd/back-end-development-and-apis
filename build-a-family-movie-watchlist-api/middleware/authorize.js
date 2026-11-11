export async function authorizeModification(req, res, next) {
    if (!req.user) {
    return res.status(403).json({ error: "Access denied" });
  }

  const { role, id } = req.user;
  const targetUserId = req.params.userId;

  // Un padre siempre puede modificar
  if (role === "parent") {
    return next();
  }

  // Un hijo solo puede modificar su propia watchlist (convertir ambos a String para evitar fallos de tipo)
  if (role === "child" && String(id) === String(targetUserId)) {
    return next();
  }

  // Cualquier otro caso (rol no válido, o child modificando a otro usuario)
  return res.status(403).json({ error: "Access denied" });
}