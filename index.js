import express from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import dbConfig from "./config/dbConfig.js";

// Import the routes
import Routes from "./routes/index.js";
// Call the config function from the dotenv package
config();

dbConfig();

const app = express();

// Define the PORT
const PORT = process.env.PORT || 5000;

// Define the middleware
app.use(express.json());
app.use(cookieParser());

// Define the routes
app.use("/api", Routes);
app.get("*", (req, res) => {
  res.send("You've tried reaching a route that doesn't exist.");
});

// Create a express server
app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON: http://localhost:${PORT}`);
});
