const express = require("express");
const mpesaRoute = express.Router()

const { stkPush} = require("../Controlers/mpesastkpush")

mpesaRoute.post("/stkpush",stkPush)  

module.exports={mpesaRoute};