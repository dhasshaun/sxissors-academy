import * as express from "express";
const router = express.Router();
import Register from "../registration/Register";

/* POST Registration. */
const register = new Register();
export default router.post("/", register.execute);
