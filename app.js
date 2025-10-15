import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

const app = express();

// Middleware added
app.use(express.json());

dotenv.config(process.env.MONGO_URI);

// Test if the server is working or not.
app.get("/", (req, res) => {
  res.send("Welcome to Mini pos API");
});

// Mongo DB connected
connectDB();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});
