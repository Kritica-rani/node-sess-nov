const express = require("express");
const router = express.Router();

//import controller
const userController = require("../controller/userController");
// import middleware
const isAuth = require("../middleware/auth");

router.get("/", userController.getRegister);
router.post("/", userController.postRegister);
router.get("/login", userController.getLogin);
router.post("/login", userController.postLogin);
router.get("/home", isAuth, userController.getHome);
router.post("/logout", userController.logout);
module.exports = router;
