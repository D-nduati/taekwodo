const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();


// const authMiddleware = require('./middleware/authMiddleware')
// const {usersroute} = require('./Routes/Logins')
const {mpesaRoute} = require('./Routes/token')

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:8000",
    credentials: true,
  })
);


// app.get("/protected", authMiddleware, (req, res) => {
//   res.json({ message: "You are authorized", user: req.user });
// });

// app.post("/usersroute",usersroute);
app.use("/mpesa",mpesaRoute);



app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
