const express = require("express");
const app = express();
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

app.use(cors({ origin: "*" }));
app.use(express.json());

//routes
app.use("/api/auth", authRoutes);
module.exports = app;
