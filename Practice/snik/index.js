const express = require("express");
const mongoose = require("mongoose");
const session = require('express-session');
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/user");
const {restrictToLoggedinUserOnly} = require("./middlewares/auth")
const app = express();
const ejsLayouts = require("express-ejs-layouts");
app.use(ejsLayouts);


// DATABASE CONNECTION
mongoose.connect('mongodb://localhost:27017/snik', {})
const db = mongoose.connection;
db.on('error', (error) => {
    console.log(error);
});
db.once('open', () => {
    console.log("Database connected succesfuly");
});




// MIDDLEWARES
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use(session({
    secret: 'my secret key',
    saveUninitialized: true,
    resave: false,
}))
// app.use((req, res, next) => {
//     res.locals.message = req.locals.message;
//     delete req.session.message;
//     next();
// })
app.use(express.static("public"));

app.use('/user', userRoute);


// SETTING EJS TEMPLATE ENGINE
app.set("view engine", "ejs");

app.use("", require("./routes/routes"))

app.listen(8000, () => {
    console.log("server started")
})