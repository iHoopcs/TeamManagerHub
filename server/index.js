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
