const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors')
const sql = require('mssql/msnodesqlv8');
const app = express();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));


// Database configuration
var config = {
    connectionString: 'Driver=SQL Server;Server=DESKTOP-5TSB55R\\SQLEXPRESS;Database=child;Trusted_Connection=true;'
  };

// Connect to the database

(async () => {
    try {
     await sql.connect(config);
     console.log('Connected to MSSQL')
    } catch (err) {
        console.log(err)
    }
   })()


// Signup
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        const result = await sql.query`SELECT * FROM Users WHERE Email = ${email} OR Username = ${username}`;
        if (result.recordset.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(password, salt);

        // Insert new user
        await sql.query`INSERT INTO Users (Username, Email, PasswordHash) VALUES (${username}, ${email}, ${passwordHash})`;
        
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user by username
        const result = await sql.query`SELECT * FROM Users WHERE Username = ${username}`;
        const user = result.recordset[0];

        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Compare the password
        const isMatch = bcrypt.compareSync(password, user.PasswordHash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        res.status(200).json({ message: 'Login successful', userId: user.UserId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Forgot Password
app.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        // Check if user exists
        const result = await sql.query`SELECT * FROM Users WHERE Email = ${email}`;
        const user = result.recordset[0];

        if (!user) {
            return res.status(400).json({ message: 'Email not found' });
        }

        // Generate reset token (in a real app, send an email with a reset link)
        const resetToken = '123456'; // This should be a real token in a production app
        
        // Optionally, store the reset token in the database with an expiration date
        // await sql.query`UPDATE Users SET ResetToken = ${resetToken} WHERE UserId = ${user.UserId}`;

        res.status(200).json({ message: 'Reset link sent to your email address' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Start the server
app.listen(4000, () => {
    console.log('Server running on port 4000');
});