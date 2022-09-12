const express = require('express');
const app = express();
require('./mongodb/connection.js');
var bodyParser = require('body-parser')
app.use(express.urlencoded({ extended:false}));
app.use(express.json());
const cors = require('cors');
const router = require('./routers');
// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))

// // parse application/json
// app.use(bodyParser.json())
app.set('view engine','ejs');

app.use(cors({
    origin:"http://localhost:4200",
}))

app.use('/',router);
app.get('/',(req,res)=>{
    res.render('index');
})
app.post('/',(req,res)=>{
    console.log(req.body);
})

app.listen(5500,()=>{
    console.log('Server running at http://localhost:5500');
})