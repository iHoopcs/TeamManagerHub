const express = require("express");
const app = express();
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const teamRoutes = require("./routes/teamRoutes");
app.use(cors({ origin: "*" }));
app.use(express.json());

//routes
app.use("/api/auth", authRoutes);
app.use("/api/", teamRoutes);
module.exports = app;
