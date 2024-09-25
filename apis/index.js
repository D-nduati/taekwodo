const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();


const authMiddleware = require('./middleware/authMiddleware')
// const {usersroute} = require('./Routes/Logins')
// const {mpesaRoute} = require('./Routes/token')

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:8000",
    credentials: true,
  })
);


app.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "You are authorized", user: req.user });
});

// app.post("/usersroute",usersroute);
// app.use("/mpesa",mpesaRoute);
// app.get("/error",(req,res)=>{
//   res.status(203).json({message:"Route not found"})
// })

console.log(`${process.env.B2CSECRETKEY}`)

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
