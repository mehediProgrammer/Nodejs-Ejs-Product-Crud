import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import studentRouter from "./routes/student.js";
import staffRouter from "./routes/staff.js";
import useerRouter from "./routes/user.js";
import customerRouter from "./routes/customer.js";
import productRouter from "./routes/product.js";
import EjsLayouts from "express-ejs-layouts";

//environment var
dotenv.config();

// PORT config
const PORT = process.env.PORT || 6060;

// express init
const app = express();

// //use express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//ejs setup
app.set("view engine", "ejs");
app.use(EjsLayouts);

//static folder
app.use(express.static("public"));

//app routes
app.use(studentRouter);
app.use(staffRouter);
app.use(useerRouter);
app.use(customerRouter);
app.use(productRouter);

//server listen
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`.bgGreen.black);
});
