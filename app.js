import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
// Import routes
// Customer routes
import customerRoute from "./routes/customerRoutes.js";

// Initialized express
const app = express();

// Middleware added
app.use(express.json());

// Test if the server is working or not.
app.get("/", (req, res) => {
  res.send("Welcome to Mini pos API");
});

// Mongo DB connected
dotenv.config(process.env.MONGO_URI);
connectDB();

app.use("/api/mini-pos", customerRoute);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});
