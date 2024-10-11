const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const TokenRoute = require("./Routes/token")

const app = express();
require("dotenv").config();
app.use(express.json());
app.use(cors());


const {usersroute} = require('./Routes/Logins');
const {adminRoutes} = require('./Routes/adminroutes');

// const {authMiddleware} = require('./middleware/authMiddleware')


// Connect to MongoDB database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});


// app.use("/protected", authMiddleware, (req, res) => {
//   res.json({ message: "You are authorized", user: req.user });
// });

app.use("/token", TokenRoute);
app.use("/user",usersroute);
app.use('/admin',adminRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});



app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
