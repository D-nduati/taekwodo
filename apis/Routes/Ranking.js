const express = require('express');
const { GetRankings } = require('../Controlers/Rankings');
const Ranking =express.Router();

Ranking.get('/rankings',GetRankings);

module.exports = {Ranking}