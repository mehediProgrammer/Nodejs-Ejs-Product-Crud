import express from "express";
import { createCustomer } from "../controllers/customerController.js";
import multer from "multer";
import { createCustomerMulter } from "../utils/multer.js";

//init router
const router = express.Router();

//routes
router.post("/customer", createCustomerMulter, createCustomer);
// export router
export default router;


// 20:00
