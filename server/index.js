require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

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
