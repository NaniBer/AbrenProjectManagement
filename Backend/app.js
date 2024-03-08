const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const AdminRoutes = require("./routes/adminRoutes");
const UserRoutes = require("./routes/UserRoutes");
const AuthRoutes = require("./routes/authRoutes");

const url =
  "mongodb+srv://nardosmehari22:crud@cluster0.9yh40dd.mongodb.net/test?retryWrites=true&w=majority";

DB_CONNECTION = "mongodb://localhost:27017/AbrenProjectManagement";
const app = express();
app.use(express.json());
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 30 * 60 * 1000, // Session expiration time in milliseconds
      // secure: true,
      // sameSite: 'none',
    },
  })
);
app.use((req, res, next) => {
  if (req.session && req.session.userId) {
    // Check session expiration time
    const currentTime = new Date().getTime();
    const sessionExpirationTime =
      req.session.cookie.maxAge + req.session.cookie.expires.getTime();
    if (currentTime > sessionExpirationTime) {
      // Session has expired, destroy session
      req.session.destroy((err) => {
        if (err) {
          console.error("Error destroying expired session:", err);
        }
      });
    }
  }
  next();
});

app.use("/admin", AdminRoutes);
app.use("/Users", UserRoutes);
app.use("/auth", AuthRoutes);

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
