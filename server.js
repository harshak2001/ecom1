import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import url from "url";
import path from "path";
import {fileURLToPath} from "url";

const app = express();


// const { fileURLToPath } = require("url");
// const path = require("path");

const filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filename);

app.use(express.static(path.join(__dirname, "./client/build")));

app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// configure env
dotenv.config();

// Port
const PORT = process.env.PORT || 8000;

// middlewares
app.use(express.json());

// cross origin resource shairing - control req from 1 domain to another domain
app.use(cors());

//express -middleware used to have logs of http requests
// const morgan = require("morgan");
app.use(morgan("dev"));

// routes
// const authRoutes = require("./routes/authRoute");
app.use("/api/v1/auth", authRoutes);

// const categoryRoutes = require("./routes/categoryRoutes");
app.use("/api/v1/category", categoryRoutes);

// const productRoutes = require("./routes/productRoutes");
app.use("/api/v1/product", productRoutes);

// run listen
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// DataBase Connection
// const connectDB = require("./config/db");

connectDB();

// rest API
// app.get("/", (req, res) => {
//   res.send("<h1>Welcome to ecommerce app</h1>");
// });
