const express = require("express");
// What is cors
const cors = require("cors");
// import.meta;

// const importMetaUrl = "undefined" == typeof document ? require("url").pathToFileURL(__filename).href : document.currentScript && document.currentScript.src || new URL("styles.js", document.baseURI).href;

const app = express();

const url = require("url");
const { fileURLToPath } = require("url");
const path = require("path");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "./client/build")));

app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// configure env
require("dotenv").config();

// Port
const PORT = process.env.PORT || 8000;

// middlewares
app.use(express.json());

// cross origin resource shairing - control req from 1 domain to another domain
app.use(cors());

//express -middleware used to have logs of http requests
const morgan = require("morgan");
app.use(morgan("dev"));

// routes
const authRoutes = require("./routes/authRoute");
app.use("/api/v1/auth", authRoutes);

const categoryRoutes = require("./routes/categoryRoutes");
app.use("/api/v1/category", categoryRoutes);

const productRoutes = require("./routes/productRoutes");
app.use("/api/v1/product", productRoutes);

// run listen
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// DataBase Connection
const connectDB = require("./config/db");

connectDB();

// rest API
// app.get("/", (req, res) => {
//   res.send("<h1>Welcome to ecommerce app</h1>");
// });
