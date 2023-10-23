import express from "express";
import {
  createUser,
  getAlluser,
  registerUser,
} from "../controllers/userController.js";
import { createUserMulter } from "../utils/multer.js";

//init router
const router = express.Router();
// router.use(ageCheck);

//create router
router.post("/user", createUserMulter, createUser);
router.get("/user", getAlluser);
router.post("/register", registerUser);

//export default
export default router;
