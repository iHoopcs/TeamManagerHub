require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const teamRoutes = require("./routes/teamRoutes");
const app = express();

//middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

//routes
app.use("/api/auth", authRoutes);
app.use("/api/", teamRoutes);

//db
mongoose
  .connect(process.env.db_uri)
  .then(() => {
    console.log("db connected!"),
      app.listen(8080, () => {
        console.log("server started!");
      });
  })
  .catch((err) => {
    console.log(err);
  });
