import * as express from "express";
import * as cookiesParser from "cookie-parser";
import * as path from "path";
import indexRouter from "./routes/index";
import registrationRouter from "./routes/registration";

require("dotenv").config();

const app = express();
// view engine setup
app.set("views", path.join("./views"));
app.set("view engine", "jade");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookiesParser());
app.use(express.static(path.join("./public")));

app.use("/", indexRouter);
app.use("/registration", registrationRouter);

app.listen(3000, () => {
  console.log("Sugarman is running on!");
});
