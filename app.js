import express from "express";
import connectDB from "./config/db.js";
// Import routes

// Customer routes
import customerRoute from "./routes/customerRoutes.js";
import itemRoute from "./routes/itemRoutes.js";
import saleRoute from "./routes/saleRoutes.js";

// Initialized express
const app = express();

// Middleware added
app.use(express.json());

// Test if the server is working or not.
app.get("/", (req, res) => {
  res.send("Welcome to Mini pos API");
});

// Mongo DB connected
connectDB();

app.use("/api/customers", customerRoute);
app.use("/api/items", itemRoute);
app.use("/api/sales", saleRoute);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});
