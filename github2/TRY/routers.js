const express = require('express');
const router = express.Router();
const {UserController,MessageController} = require('./controllers/usercontroller.js');

router.post('/user/register',UserController.register);
router.post('/user/login',UserController.login);
router.post('/user/currentUser',UserController.currentUser);
router.post('/user/currentGroup',MessageController.currentGroup);
router.post('/user/AllUsers',UserController.AllUsers);
router.post('/user/newMessage',MessageController.newMessage);
router.post('/user/message',MessageController.message);
router.post('/user/groupMessage',MessageController.groupMessage);
router.post('/user/newGroupMessage',MessageController.newGroupMessage);

module.exports = router;
