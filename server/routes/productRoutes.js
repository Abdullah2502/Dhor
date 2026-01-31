import express from "express";
// REMOVE: import formidable from "express-formidable"; 
import {
  createProductController,
  getProductController,
  getSingleProductController,
  deleteProductController,
  updateProductController
} from "../controllers/productController.js";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// REMOVE `formidable()` from these lines:
router.post("/create-product", requireSignIn, isAdmin, createProductController);
router.put("/update-product/:pid", requireSignIn, isAdmin, updateProductController);

router.get("/get-product", getProductController);
router.get("/get-product/:slug", getSingleProductController);
router.delete("/delete-product/:pid", requireSignIn, isAdmin, deleteProductController);

export default router;