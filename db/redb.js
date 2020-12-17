const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://manjunath:msmv1234@cluster0.b6x1z.mongodb.net/Register?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true
}).then(()=>{
    console.log(`connection successful`);
}).catch((e)=>{
    console.log(`no connection`);
})