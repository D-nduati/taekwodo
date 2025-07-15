const express = require('express');
const { UpdateProfile,GetProfileData } = require('../Controlers/ProfileSettings');

const ProfileRoute = express.Router();

ProfileRoute.get('/getProfileData/:userId',GetProfileData);
ProfileRoute.post('/updateProfile',UpdateProfile);

module.exports = {ProfileRoute};