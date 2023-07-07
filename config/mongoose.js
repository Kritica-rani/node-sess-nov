const mongoose = require("mongoose");
const URI =
  "mongodb+srv://kritica:1234@cookie-session.k8i8klk.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(URI)
  .then(() => console.log("MONGODB up and running"))
  .catch((err) => console.log("error in connecting mongodb", err));
