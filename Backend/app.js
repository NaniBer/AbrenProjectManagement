const express = require('express');
const mongoose = require('mongoose')
const session = require('express-session');
const routes = require('./routes/adminRoutes');
const UserRoutes= require('./routes/UserRoutes')

const url =
  "mongodb+srv://nardosmehari22:crud@cluster0.9yh40dd.mongodb.net/test?retryWrites=true&w=majority";
const app = express();
app.use(express.json());
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false
  }));
app.use('/admin', routes)
app.use('/Users', UserRoutes)
//establish the connection
mongoose
  .connect(url)
  .then(() => {
    console.log("connected to MongoDB");
    app.listen(3000, () => {
      console.log("server started on port 3000");
    });
  })
  .catch((err) => {
    console.error("error connectimg to mongodb:", err);
  });

module.exports = app;
