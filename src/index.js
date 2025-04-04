import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000; 

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/tickets", ticketRoutes);

connectDB();

app.listen(PORT, () => console.log(`Servidor en línea en el puerto ${PORT}`));
