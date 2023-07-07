// import model
const User = require("../model/user");
// Todo: encrypt the password, password decryption

module.exports.getRegister = (req, res) => {
  const error = req.session.error;
  delete req.session.error;
  return res.render("register", { error: error });
};

module.exports.postRegister = async (req, res) => {
  try {
    console.log("req", req.body);
    const { username, password, email } = req.body;
    //1.email should be unique --> we have to see if email already exists or not
    const user = await User.findOne({ email: email });
    //check if user is empty or not
    if (user) {
      req.session.error = "User already exists";
      return res.render("login", {
        error: req.session.error,
      });
    }
    // create new user
    const newUser = await User.create({
      username,
      email,
      password,
    });
    res.redirect("/login");
  } catch (err) {
    console.log("error in registering", err);
    return res.redirect("/");
  }
};

module.exports.getLogin = (req, res) => {
  const error = req.session.error;
  delete req.session.error;
  return res.render("login", { error: error });
};

module.exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log("user", req.body);
    //check for user
    if (!user) {
      req.session.error = "Invalid credentials";
      return res.render("/login", {
        error: req.session.error,
      });
    }
    // password match
    if (password != user.password) {
      req.session.error = "Invalid pasword";
      return res.render("/login", {
        error: req.session.error,
      });
    }
    req.session.isAuth = true;
    req.session.username = user.username;
    console.log("last ");
    res.redirect("/home");
  } catch (err) {
    console.log("error in login", err);
  }
};
module.exports.getHome = (req, res) => {
  return res.render("home");
};

module.exports.logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("error in logiyt", err);
      throw err;
    }

    res.redirect("/login");
  });
};
