import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
//Import routes
import productRoute from "./routes/product.routes.js";
import categoryRoute from "./routes/category.routes.js";
import billingRoute from "./routes/billing.routes.js";
import userRoute from "./routes/user.routes.js";
//Import middleware

const app = express();

//Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
//Routes
app.use("/api/v1/products", productRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/bill", billingRoute);
app.use("/api/v1/user", userRoute);
//Error Handler

export default app;
