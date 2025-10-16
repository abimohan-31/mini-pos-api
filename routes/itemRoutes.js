import express from "express";
import {
  createItem,
  deleteItem,
  getAllItems,
  getItemById,
  updateItem,
} from "../controllers/itemController.js";

const ItemsRouter = express.Router();

ItemsRouter.get("/", getAllItems);
ItemsRouter.get("/:id", getItemById);
ItemsRouter.post("/", createItem);
ItemsRouter.put("/:id", updateItem);
ItemsRouter.delete("/:id", deleteItem);

export default ItemsRouter;
