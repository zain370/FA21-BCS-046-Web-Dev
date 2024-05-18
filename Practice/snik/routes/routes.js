const express = require("express");
const router = express.Router();
let checkSessAuth = require("../middlewares/checkSessAuth");
// const {restrictToLoggedinUserOnly}= require("../middlewares/auth")
// let checkNotSessAuth = require("../middlewares/checkNotSessAuth");
router.get("/", (req, res) => {
    res.render("homepage", {title:"Homepage"})
})

router.get("/signup", (req, res) => {
    res.render("signup", {title:"Sign Up"})
})

router.get("/login", (req, res) => {
    res.render("login", {title:"Login"})
})

router.post("user/login", (req, res) => {
    res.render("login", {title:"Login"})
})

router.get("/contact", (req, res) => {
    res.render("contact", {title:"Contact Us"})
})

router.get("/add-product", (req, res) => {
    res.render("add-product", {title:"Contact Us"})
})

router.get("/logout", checkSessAuth, async (req, res, next) => {
    console.log(user);
    if (req.session.user) {
      req.session.user = null;
      console.log(user);
    }
    console.log(user);
    res.redirect("/");
  });

module.exports = router;