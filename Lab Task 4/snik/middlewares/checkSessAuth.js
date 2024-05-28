// module.exports = async (req, res, next) => {
//   if (req.session.user) {
//     return next();
//   }
//   res.redirect("/login");
// };


// middlewares/checkAuthenticated.js
module.exports = (req, res, next) => {
  if (req.session.user && req.session.user.id) {
    next();
  } else {
    res.redirect("/login");
  }
};
