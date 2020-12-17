const mongoose = require('mongoose');

mongoose.createConnection('mongodb+srv://manjunath:msmv1234@cluster0.b6x1z.mongodb.net/People?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true
}).then(()=>{
    console.log(`connection successful`);
}).catch((e)=>{
    console.log(e);
})