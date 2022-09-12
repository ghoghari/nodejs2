const mongoose = require('mongoose');


let UserSchema = new mongoose.Schema({
    name:{type : 'string', required: true},
    username:{type : 'string', required: true ,unique: true},
    password:{type : 'string', required: true},
    message:[
         {
            sender:{type: 'string',required: true},
            receiver:{type: 'string',required: true},
            msg: {type: 'string',required: true},
            date: {type: 'date',default :Date.now},
        }
    ]
})


let UserModel = mongoose.model('user',UserSchema);
module.exports = UserModel;