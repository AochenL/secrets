const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();
mongoose.connect('mongodb://localhost:27017/usersDB');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    }
});



const User = mongoose.model('User', userSchema);

app.get("/",function(req,res){
    res.render("home");
});

app.get("/login",function(req,res){
    res.render("login");
});

app.get("/register",function(req,res){
    res.render("register");
});

app.get("/logout",function(req,res){
    res.render("home");
});

app.post("/register",function(req,res){
    const email = req.body.username;
    const password = req.body.password;
    const newUser = new User({
          email: email,
          password: password
    });
    newUser.save(function(err){
        if (err){
            console.log(err);
        }else{
            res.render("secrets");
        }
    })

});

app.post("/login",function(req,res){
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({user:username},function(err,foundUser){
        if (err){
            console.log(err);
        }else{
            if (foundUser){
                if (foundUser.password === password){
                    res.render("secrets");
                }
            }
        }
    })
})



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
