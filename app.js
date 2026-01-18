import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import connectDB from "./config/db.js";

// Import routes
import customerRoute from "./routes/customerRoutes.js";
import itemRoute from "./routes/itemRoutes.js";
import saleRoute from "./routes/saleRoutes.js";

// Load env vars
dotenv.config();

// Initialized express
const app = express();

// Security Middleware
app.use(helmet());
app.use(cors());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use("/api/", limiter);

// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Middleware added
app.use(express.json());

// Root route provides guidance for the API
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Mini POS API",
    description: "A lightweight Point of Sale API for managing customers, items, and sales.",
    documentation: {
      base_url: "/api",
      endpoints: {
        customers: {
          path: "/api/customers",
          methods: ["GET", "POST", "GET /:id", "PUT /:id", "DELETE /:id"]
        },
        items: {
          path: "/api/items",
          methods: ["GET", "POST", "GET /:id", "PUT /:id", "DELETE /:id"]
        },
        sales: {
          path: "/api/sales",
          methods: ["GET", "POST", "GET /:id", "PUT /:id", "DELETE /:id"]
        }
      }
    },
    status: "Active"
  });
});

// Routes
app.use("/api/customers", customerRoute);
app.use("/api/items", itemRoute);
app.use("/api/sales", saleRoute);

// Mongo DB connected
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});
