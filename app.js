//jshint esversion:6
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({
    extended:true
}));

mongoose.connect("mongodb://127.0.0.1:27017/userDB",{useNewUrlParser: true});

const userSchema = {
    email: String,
    password: String
};

const User = new mongoose.model("User",userSchema);

app.get('/',function(req,res){
    res.render("home");
});


app.get('/login',function(req,res){
    res.render("login");
});


app.get('/register',function(req,res){
    res.render("register");
});

app.post("/register", async function(req,res){
    const newUser = new User ({
        email : req.body.username,
        password: req.body.password
    });
    // newUser.save(function(err){
    //     if (err){
    //         console.log(err);
    //     }else{
    //         res.render("secrets");
    //     }
    // });
    newUser.save().then(()=>{
        res.render("secrets");
    }).catch((err)=>{
        console.log(err);
    });
});

app.post("/login", function(req,res){
    const username = req.body.username;
    const password = req.body.password;
    // User.findOne({email:username}, function(err,foundUser){
    //     if(err){
    //         console.log(err);
    //     } else {
    //         if(foundUser){
    //             if(foundUser.password === password){
    //                 res.render("secrets");
    //             }
    //         }
    //     }
    // });

    User.findOne({email:username}).then(foundUser=>{
            if(foundUser){
                if(foundUser.password===password){
                    res.render("secrets");
                }
            }
        }).catch((err)=>{
            console.log(err);
        });


    // User.findOne({email:username}).then(if(foundUser &&(foundUser.password===password)){
    //     res.render("secrets");
    // }).catch((err)=>{
    //     console.log(err);
    // });
});
   


app.listen(3003,function(){
    console.log("Server is running on port 3003");
});