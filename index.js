const express = require("express");
const db = require("./config/mongoose");
const app = express();
const PORT = 4000;
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const router = require("./routes/userRoute");

app.use(express.urlencoded());
app.set("view engine", "ejs");
app.set("views", "views");
var store = new MongoDBStore({
  uri: "mongodb+srv://kritica:1234@cookie-session.k8i8klk.mongodb.net/?retryWrites=true&w=majority",
  collection: "mySessions",
});
app.use(
  session({
    secret: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", //some random string
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use("/", router);
// app.get("/", (req, res) => {
//   console.log("req", req.session);
//   console.log("req-sessionId", req.sessionID);
//   req.session.isAuth = true;
//   return res.send("hello world");
// });

app.listen(PORT, (err) => {
  if (err) {
    console.log("error in starting the server", err);
  }
  console.log("Server is up", PORT);
});
