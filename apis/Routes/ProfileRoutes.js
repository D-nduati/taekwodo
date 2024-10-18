const express = require('express');
const { UpdateProfile,GetProfileData } = require('../Controlers/ProfileSettings');

const ProfileRoute = express.Router();

ProfileRoute.get('/getProfileData',GetProfileData);
ProfileRoute.put('/updateProfile',UpdateProfile);

module.exports = {ProfileRoute};