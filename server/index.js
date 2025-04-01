require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const authRoutes = require("./routes/authRoutes");
const teamRoutes = require("./routes/teamRoutes");
require("./config/strategy-config");
const session = require("express-session");

const app = express();

//middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use(
  session({
    saveUninitialized: false,
    secret: "Christ is Lord",
    save: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

//routes
app.use("/api/auth", authRoutes);
app.use("/api/", teamRoutes);
//login authentication route
app.post(
  "/api/passport-auth",
  passport.authenticate("local"),
  (req, res, next) => {
    res.status(200).send("Logged in successfully!");
  }
);

//db
mongoose
  .connect(
    "mongodb+srv://iHoopcs:kZdAIyWlbASPeXAr@cluster1.gtarcla.mongodb.net/TeamManageHub?retryWrites=true&w=majority&appName=Cluster1"
  )
  .then(() => {
    console.log("db connected!"),
      app.listen(8080, () => {
        console.log("server started!");
      });
  })
  .catch((err) => {
    console.log(err);
  });
