const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');

require("./db/redb");
require("./db/homedb");

const User = require("./models/register1");
const Home1 = require("./models/home1");

const port = process.env.PORT || 3000;
  
const template_path= path.join(__dirname,"/templates/views");
const partials_path= path.join(__dirname,"/templates/partials");
const static_path = path.join(__dirname,"/public");
// console.log(static_path);


app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use(express.static(static_path));

app.set("view engine","ejs");
app.set("views",template_path);
// ejs.registerPartials(partials_path);
app.set("partials",partials_path);

app.get('/',(req,res)=>{
    res.render('login')
});

app.get("/register",(req,res)=>{
    res.render('register')
});
app.get("/create",(req,res)=> {
     res.render('create')
})

app.get("/home",async(req,res)=>{
    const posts = await Home1.find().sort({"createdAt":-1})
    res.render('home',{posts:posts})
})
app.get('/:emailid',async(req,res)=>{
    const posts = await Home1.find({'emailid':{$in:[req.params.emailid]}})
    res.render('profile',{posts:posts})
})
// app.get('/:id',async(req,res)=>{
//     const posts
// })
app.post("/profile",async(req,res)=>{
    const email = req.body.emailid;
    const useremail = await User.findOne({emailid:email});
    const Username = useremail.username;
    console.log(Username);
    const posts = await Home1.find({'emailid':{$in:[email]}}).sort({"createdAt":-1})
    res.render('myposts',{posts:posts,username:Username})
})
app.post("/create",async(req,res)=>{
    try{
        const email = req.body.emailid;
        const useremail = await User.findOne({emailid:email})
        if(useremail===null)res.status(400).send("Invalid Email");
        else{
        const homedata = new Home1({
            title : req.body.title,
            description : req.body.description,
            emailid: email
        })
        console.log(`${useremail.emailid}`)
        const homedata1 = await homedata.save();
        console.log(`${useremail.emailid}`)
        res.status(201).redirect(`${useremail.emailid}`);
    }
    }catch(e)
    {
        res.status(400).send(e); 
    }

})
app.post("/home",async(req,res)=>{
    try{
        const email = req.body.emailid;
        const password = req.body.password;

        const useremail =  await User.findOne({emailid:email})
        const Username  = useremail.username;
        if(useremail.password===password)
        {
            res.status(201).redirect('home');
        }
        else{
            res.status(400).send("Invalid Login Details");
        }
    }catch(error)
    {
        res.status(400).send("Invalid Login Details")
    }
})

app.post("/register",async(req,res)=>{
    try{
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;
         if(password === cpassword)
         {
             const userdata = new User({
                username : req.body.username,
                emailid : req.body.emailid,
                gender : req.body.gender,
                password : password,
                confirmpassword : cpassword
             })
             const usered = await userdata.save();
             res.status(201).render('login');
         }else{
             
                 res.send("passwords are not matching");
        
         }
    }catch(e)
    {
        res.status(400).send(e);
    }
})
app.listen(port,()=>{
    console.log(`port is running at ${port}`)
});