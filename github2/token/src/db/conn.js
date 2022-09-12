var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/token")
    .then(() => {
        console.log("conn okay");
    })
    .catch((e) => {
        console.log(e);
    })