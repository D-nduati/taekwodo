const express = require('express');
const SettingsUsers = express.Router();
const {GetUserSettings,UpdateUserSettings,ChangeAvatar,ToggleTwoFactorAuth} =require('../Controlers/SettingsControllers')

SettingsUsers.get('/settings/:userId',GetUserSettings);
SettingsUsers.post('/settings/:userId',UpdateUserSettings);
SettingsUsers.post('/settings/avatar/:userId',ChangeAvatar);
SettingsUsers.post('/settings/2fa/:userId',ToggleTwoFactorAuth);

module.exports = {SettingsUsers};

