import express from "express";
import {
  createSale,
  deleteSale,
  getAllSales,
  getSaleById,
  updateSale,
} from "../controllers/saleController.js";

const saleRouter = express.Router();

saleRouter.get("/", getAllSales);
saleRouter.get("/:id", getSaleById);
saleRouter.post("/", createSale);
saleRouter.put("/:id", updateSale);
saleRouter.delete("/:id", deleteSale);

export default saleRouter;
