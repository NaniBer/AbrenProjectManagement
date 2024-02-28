const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const adminRoutes = require("./routes/adminRoutes");
const UserRoutes = require("./routes/UserRoutes");

const url =
  "mongodb+srv://nardosmehari22:crud@cluster0.9yh40dd.mongodb.net/test?retryWrites=true&w=majority";

DB_CONNECTION = "mongodb://localhost:27017/AbrenProjectManagement";
const app = express();
app.use(express.json());
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);
// app.use("/auth", )
app.use("/admin", adminRoutes);
app.use("/Users", UserRoutes);

// mongoose
//   .connect(DB_CONNECTION)
//   .then(() => {
//     console.log("Connected to MongoDB");
//     // Continue with your code here
//   })
//   .catch((error) => {
//     console.error("Error connecting to MongoDB:", error);
//   });
//establish the connection

mongoose
  .connect(url)
  .then(() => {
    console.log("connected to MongoDB");
    app.listen(5000, () => {
      console.log("server started on port 5000");
    });
  })
  .catch((err) => {
    console.error("error connectimg to mongodb:", err);
  });

module.exports = app;
