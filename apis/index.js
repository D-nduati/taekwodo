const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors')
const sql = require('mssql/msnodesqlv8');
const app = express();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:8001',
    credentials: true
  }));


var config = {
    connectionString: 'Driver=SQL Server;Server=DESKTOP-5TSB55R\\SQLEXPRESS;Database=child;Trusted_Connection=true;'
  };


(async () => {
    try {
     await sql.connect(config);
     console.log('Connected to MSSQL')
    } catch (err) {
        console.log(err)
    }
   })()


app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const result = await sql.query`SELECT * FROM Users WHERE Email = ${email} OR Username = ${username}`;
        if (result.recordset.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = bcrypt.genSaltSync(10);
        const PasswordHash = bcrypt.hashSync(password, salt);

        console.log(PasswordHash)

       
        // await  new sql.Request()
        // .input('username', sql.NVarChar, username)
        // .input('email', sql.NVarChar, email)
        // .input('PasswordHash', sql.NVarChar, PasswordHash)
        // .execute(`INSERT INTO Users (Username, Email, PasswordHash) VALUES (@username, @Email, @passwordHash)`);

    res.status(201).json({ message: 'User created successfully' });

} catch (err) {
    console.error('Error inserting user:', err);
    res.status(500).json({ message: 'Server error: ' + err });
}
});


app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // const result = await sql.query`SELECT * FROM Users WHERE Username = ${username}`;
        // const user = result.recordset[0];

        // if (!user) {
        //     return res.status(400).json({ message: 'Invalid username or password' });
        // }

    
        // const isMatch = bcrypt.compareSync(password, user.PasswordHash);
        // if (!isMatch) {
        //     return res.status(400).json({ message: 'Invalid username or password' });
        // }

        // res.status(200).json({ message: 'Login successful', userId: user.UserId });
        res.status(200).json({ message: 'Login successful' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});


app.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        
        const result = await sql.query`SELECT * FROM Users WHERE Email = ${email}`;
        const user = result.recordset[0];

        if (!user) {
            return res.status(400).json({ message: 'Email not found' });
        }

       
        const resetToken = '123456'; // This should be a real token in a production app
        

        res.status(200).json({ message: 'Reset link sent to your email address' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});


app.listen(4000, () => {
    console.log('Server running on port 4000');
});
