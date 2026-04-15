const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");


// 🔐 LOGIN (UPDATED WITH TOKEN)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const result = await req.pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );

  if (result.rows.length === 0) {
    return res.status(401).send("User not found");
  }

  const user = result.rows[0];

  if (password !== user.password) {
    return res.status(401).send("Wrong password");
  }

  // ✅ CREATE TOKEN
  const token = jwt.sign(
    { id: user.id, email: user.email },
    "secret123",
    { expiresIn: "1h" }
  );

  res.json({
    message: "Login Successful",
    token: token,
  });
});


// 📝 SIGNUP (same as before)
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const checkUser = await req.pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );

  if (checkUser.rows.length > 0) {
    return res.status(400).send("User already exists");
  }

  await req.pool.query(
    "INSERT INTO users (email, password) VALUES ($1, $2)",
    [email, password]
  );

  res.send("Signup Successful");
});


// 🔒 VERIFY TOKEN (NEW)
function verifyToken(req, res, next) {
  const header = req.headers.authorization;

  if (!header) return res.status(401).send("No token");

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "secret123");
    req.user = decoded;
    next();
  } catch {
    res.status(401).send("Invalid token");
  }
}


// 🔐 PROTECTED ROUTE
router.get("/profile", verifyToken, (req, res) => {
  res.send("Welcome " + req.user.email);
});

module.exports = router;