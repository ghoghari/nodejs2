const mongoose = require('mongoose');

const msgSchema = new mongoose.Schema({
    chatName : {type: 'string', require: true},
    message:[
        {
            sender:{type: 'string', require: true},
            receiver: {type: 'string', require: true},
            message: {type: 'string', require: true},
            date: {type: Date, default: Date.now}
        }
    ]
})

const groupChat = new mongoose.Schema({
    groupName :{type: 'string', require: true},
    members: {type: 'array', require: true},
    messages:[
        {
            sender:{type: 'string', require: true},
            receiver: {type: 'array', require: true},
            message: {type: 'string', require: true},
            date: {type: Date, default: Date.now}
        }
    ]
})

const msgModel = mongoose.model('Message',msgSchema);
const GroupchatModel = mongoose.model('groupchat',groupChat);
module.exports = {msgModel,GroupchatModel};
