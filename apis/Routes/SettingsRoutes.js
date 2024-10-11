const express = require('express');
const SettingsUsers = express.Router();
const {GetUserSettings,UpdateUserSettings,ChangeAvatar,ToggleTwoFactorAuth} =require('../Controlers/SettingsControllers')

SettingsUsers.get('/settings/:userId',GetUserSettings);
SettingsUsers.put('/settings/:userId',UpdateUserSettings);
SettingsUsers.put('/settings/:userId/avatar',ChangeAvatar);
SettingsUsers.put('/settings/:userId/2fa',ToggleTwoFactorAuth);

module.exports = {SettingsUsers};

