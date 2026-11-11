import express from "express";
import helmet from "helmet";
import { findByUsername } from "./utils/db.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const {sign} = jwt

import watchlistRoutes from "./routes/watchlist.js";

const PORT = process.env.PORT;
const app = express();

app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Family Movie Watchlist API");
});

app.use("/api/watchlist", watchlistRoutes);

app.post('/api/auth/login', (req, res) => {
  const {username, password} = req.body;

  if (!username || !password) {
    return res.status(400).send("error")
  }

  const user = findByUsername(username)

  if (!user) return res.status(401).send("error");

  if (!bcrypt.compareSync(password, user.passwordHash)) return res.status(401).send("error")

const JWT_SECRET = process.env.JWT_SECRET || "2013";

  return res.json({token: sign(user, JWT_SECRET)})
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
