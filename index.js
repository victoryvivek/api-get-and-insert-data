const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieSession = require("cookie-session");
const passport = require("passport");
const authRoutes = require("./routes/auth-routes");
const profileRoutes = require("./routes/profile-routes");
const passportSetup = require("./config/passport-setup");
const keys = require("./config/keys");
const dataRoutes=require('./routes/data');


const app=express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());


app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

app.use('/',dataRoutes);

mongoose
    .connect(
        "mongodb+srv://victory_vivek:vivek123@book-cluster-od9xo.mongodb.net/InsertAndGetData?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    .then(result => {
        // console.log(result.db('InsertAndGetData').collection.find('user'));
        app.listen(8000, () => {
            console.log("db connected");
        });

    })
    .catch(err => {
        console.log('Error in code');
        console.log(err);
    });