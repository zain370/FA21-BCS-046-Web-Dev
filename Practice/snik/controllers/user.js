const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");


// SIGNUP
async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;

    await User.create({
        name,
        email,
        password
    });
    return res.render("homepage", { title: "Homepage" });
}

// LOGIN
async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });

    if (!user) {
        return res.render("login", { title: "Login" }); // Using style.css globally
    }

    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("uid", sessionId);
    console.log(user)
    return res.redirect("/");
    
}

// LOGOUT
async function handleUserLogout(req, res) {
    const sessionId = req.cookies.uid; // Assuming you're using cookies for session management

    // Clear session data on the server-side
    setUser(sessionId, null); // Assuming setUser function can be used to delete session data
    console.log("execution is in logout gpt")

    // Clear session cookie on the client-side
    res.clearCookie("uid");

    // Redirect the user to the login page or any other desired page
    return res.redirect("/login"); // Redirect to login page after logout
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
    handleUserLogout, // Add logout function to exports
};
