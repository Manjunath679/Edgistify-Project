const mongoose = require('mongoose');

mongoose.createConnection('mongodb://localhost:27017/People',{useNewUrlParser:true,useUnifiedTopology:true
}).then(()=>{
    console.log(`connection successful`);
}).catch((e)=>{
    console.log(e);
})