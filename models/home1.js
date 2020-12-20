const mongoose = require('mongoose');

const home1Schema = new mongoose.Schema({
    title: {
        type : String,
        required:true
    },
    description: {
        type: String,
        required: true
    },
    emailid: {
        type:String,
        required:true
    },
    createdAt:{
        type: Date,
        default : Date.now
    },
     comments: [String]
})

const Home1 =  new mongoose.model("Home1",home1Schema);

module.exports = Home1;
