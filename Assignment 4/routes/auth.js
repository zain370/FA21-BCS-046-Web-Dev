const express = require("express");
let User = require("../models/User");
let bcryptjs = require("bcryptjs");

let checkSessAuth = require("../middlewares/checkSessAuth");
let checkNotSessAuth = require("../middlewares/checkNotSessAuth");

let router = express.Router();

router.get("/login", checkNotSessAuth, async (req, res, next) => {
  res.render("auth/login", { title: "Login" });
});

router.post("/login", async (req, res, next) => {

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.redirect("/register");

  if (await bcryptjs.compare(req.body.password, user.password)) {
    req.session.user = user;
    if (req.body.email === "admin@snik.com" && req.body.password === "88888888") {
      return res.redirect("/add-product");
    } else {
      req.session.user = user;
      return res.redirect("/");
    }
  } else {
  }
});


router.get("/register", checkNotSessAuth, async (req, res, next) => {
  res.render("auth/register", { title: "Register" });

});

router.post("/register", async (req, res, next) => {
  let user = new User();
  user.name = req.body.name;
  user.email = req.body.email;

  let salt = await bcryptjs.genSalt(10);
  let hashedPass = await bcryptjs.hash(req.body.password, salt);

  user.password = hashedPass;

  await user.save();
  res.redirect("/login");
});

router.get("/logout", checkSessAuth, async (req, res, next) => {
  if (req.session.user) {
    req.session.user = null;
    console.log(req.session.user);

  }
  res.redirect("/");
});

module.exports = router;