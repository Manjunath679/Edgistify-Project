const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required:true
    },
    emailid : {
        type:String,
        trim:true,
        unique:true,
        lowercase:true,
        validate:{
            validator:validator.isEmail,
            message:'{VALUE} is not a valid email',
            isAsync : false
        }

    },
    gender:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
       type:String,
       required:true
    }
})
const User = new mongoose.model("user",userSchema);
module.exports = User;