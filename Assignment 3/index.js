// require("dotenv").config();

const express = require("express");
const ejsLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const expressSession = require("express-session");
const Product = require("./models/Product");

let app = express();

app.use(express.static("public"));
app.use(ejsLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  expressSession({
    secret: 'my secret key',
    resave: false,
    saveUninitialized: true,
  })
);

app.use((req, res, next)=>{
  res.locals.message = req.session.message;
  delete res.locals.message;
  next();
});

app.set("view engine", "ejs");

app.use(require("./middlewares/main-site"));
const authRouter = require("./routes/auth");

app.use(authRouter);
app.use("", require("./routes/routes"));


app.use("/api/products", require("./routes/api/products"));







app.listen(8000);

mongoose
  .connect('mongodb://localhost:27017/snik', {})
  .then(() => console.log("Connected to DB"))
  .catch((e) => console.log("DB Error - " + e));
