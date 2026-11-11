import jwt from "jsonwebtoken"
const {verify } = jwt

const JWT_SECRET = process.env.JWT_SECRET || "2013";

function getBearerToken(req) {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7).trim();
  }
  
  return null;
}

export async function authenticate(req, res, next) {
    const token = getBearerToken(req);
    if (!token) {
        return res.status(401).json({ "error": "No token provided." })
    }
    verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      // 403 cuando el token expiró o la firma no coincide
      return res.status(401).json({ "error": "Invalid or expired token." });
    }

    req.user = decoded;
    next();
})
}