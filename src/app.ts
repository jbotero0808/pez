import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
const config = require("./config/config.ts");
const connectDB = require('./config/db');

const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Configurar el motor de vistas 
app.set("views", path.join(__dirname, "pages/views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

const authController = require("./aplication/Auth/Controller/auth.controller");
app.get("/home", authController.verifyJWT, (req, res) => {
  const userID = req.cookies.usersession;
  res.render("home", {userID});
});

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

import apiRoutes from "./config/api.routes";
app.use("/api", apiRoutes);

import pagesRoutes from "./pages/routes/pages.routes";
app.use("/", pagesRoutes);

const PORT = config.port || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
