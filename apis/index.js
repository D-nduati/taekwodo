const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const jwt = require('jsonwebtoken')
const sql = require("mssql");
const app = express();

const authMiddleware = require('./middleware/authMiddleware')

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:8000",
    credentials: true,
  })
);

var config = {
  connectionString:
    "Driver=SQL Server;Server=DESKTOP-5TSB55R\\SQLEXPRESS;Database=Taekwondo;Trusted_Connection=true;",
};

var config={

  server:'DESKTOP-5TSB55R\\SQLEXPRESS',
  database:'Taekwondo',
  
}

app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const pool = await sql.connect(config);
    if (pool.connected) {
      const user = await pool.request().query`SELECT * FROM Users WHERE Username = ${username}`;
      if (user.recordset.length > 0) {
        return res.status(400).json({ message: "User already exists" });
      } else {
        const salt = bcrypt.genSaltSync(10);
        const PasswordHash = bcrypt.hashSync(password, salt);

        await pool.request().query`INSERT INTO Users (Username, Email, PasswordHash) VALUES (${username}, ${email}, ${PasswordHash})`;
        return res.status(201).json({ message: "User created successfully" });
      }
    } else {
      return res.status(500).json({ message: "Database connection failed" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const pool = await sql.connect(config);
    if (pool.connected) {
      const result = await pool.request().query`SELECT * FROM Users WHERE email = ${email}`;
      const user = result.recordset[0];

      if (!user) {
        return res.status(400).json({ message: "Invalid username or password" });
      }

      const isMatch = bcrypt.compareSync(password, user.PasswordHash);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid username or password" });
      }

      
      const token = jwt.sign({ userId: user.UserId, email: user.Email }, 'your_secret_key', {
        expiresIn: '1h', 
      });

     
      return res.status(200).json({
        message: "Login successful",
        token: token,  
        userId: user.UserId
      });
    } else {
      return res.status(500).json({ message: "Database connection failed" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

app.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "You are authorized", user: req.user });
});


app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const result = await sql.query`SELECT * FROM Users WHERE Email = ${email}`;
    const user = result.recordset[0];

    if (!user) {
      return res.status(400).json({ message: "Email not found" });
    }

    const resetToken = "123456"; 

    res.status(200).json({ message: "Reset link sent to your email address" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(4001, () => {
  console.log("Server running on port 4000");
});
