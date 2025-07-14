const express = require('express');
const SettingsUsers = express.Router();
const {GetUserSettings,UpdateUserSettings,ChangeAvatar,ToggleTwoFactorAuth} =require('../Controlers/SettingsControllers')

SettingsUsers.get('/settings/:userId',GetUserSettings);
SettingsUsers.put('/settings/:userId',UpdateUserSettings);
SettingsUsers.put('/settings/avatar/:userId',ChangeAvatar);
SettingsUsers.put('/settings/2fa/:userId',ToggleTwoFactorAuth);

module.exports = {SettingsUsers};

