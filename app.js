const express = require("express");
const { ConnectDB } = require("./config/dbconfig ");
const app = express();

/**Middleware */
app.use(express.json());
app.use(express.json({ urlencoded: true }));

/**Import Routs*/
const { userRouter } = require("./routes/userRoutes");
const { contactRouter } = require("./routes/contactUsRoutes");
const { sliderRouter } = require("./routes/sliderRoutes");
const { productRouter } = require("./routes/productRoutes");
const { categoryRouter } = require("./routes/categoryRoutes");
const { jobRouter } = require("./routes/jobRoutes");
const { applyRouter } = require("./routes/applyroutes");
const { wishListRouter } = require("./routes/wishlistRoutes");
const { reviewRouter } = require("./routes/reviewRoutes");
const { orderRoutes } = require("./routes/orderRoutes");

/**Tested Route  */

app.route("/").get((req, res) => {
  res.send("<h2>Server is running.</h2> ");
});
/**Genrate Routes */
app.use("/api/v1", userRouter);
app.use("/api/v1/slider", sliderRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/contact", contactRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/apply", applyRouter);
app.use("/api/v1/Wishlist", wishListRouter);
app.use("/api/v1/review", reviewRouter);
app.use("/api/v1/Order", orderRoutes);
/**Server Setup**/
const Start = async (req, res) => {
  try {
    ConnectDB();
    const Port = 5000;
    app.listen(Port, console.log(`Server is listeining on ${Port}`));
  } catch (error) {
    console.log("An error occured while server is listening ");
  }
};
Start();
