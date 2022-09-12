const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/chatAPP',
()=>{
    console.log('Connected to MongoDB');
})