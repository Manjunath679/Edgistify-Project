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
    const posts = await Home1.find()
    res.render('home',{posts:posts})
})
app.post("/home",async(req,res)=>{
    try{
        const homedata = new Home1({
            title : req.body.title,
            description : req.body.description
        })
        const homedata1 = await homedata.save();
        res.status(201).render('create');
    }catch(e)
    {
        res.status(400).send(e); 
    }

})
app.post("/login",async(req,res)=>{
    try{
        const email = req.body.emailid;
        const password = req.body.password;

        const useremail =  await User.findOne({emailid:email})
        if(useremail.password===password)
        {
            res.status(201).render("create");
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