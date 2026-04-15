const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Supabase connection
const pool = new Pool({
connectionString: "postgresql://postgres.bhmlknazgfmednrtbyow:Saloni%409548@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres",
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.connect((err, client, release) => {
  if (err) {
    console.error("❌ Database connection failed", err.stack);
  } else {
    console.log("✅ Database connected successfully");
    release();
  }
});



// pass pool to routes
app.use((req, res, next) => {
  req.pool = pool;
  next();
});

const authRoutes = require("./routes/authRoutes");
app.use("/", authRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});