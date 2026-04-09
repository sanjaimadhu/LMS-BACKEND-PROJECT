import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./database/db.js";
import {errorMiddleware} from "./middlewares/errorMiddlewares.js";
import authRouter  from "./routes/authRouter.js";
import bookRouter from "./routes/bookRouter.js";
import userRouter from "./routes/userRouter.js";
import borrowRouter from "./routes/borrowRouter.js";
import expressFileUpload from "express-fileupload";
import { notifyUsers } from "./services/notifyUser.js";
import { removeUnverifiedAccounts } from "./services/removeUnverifiedAccounts.js";
import notificationRouter from  "./routes/notificationRouter.js";
import paymentRouter from "./routes/paymentRoute.js";


export const app = express();

config ({ path: "./config/config.env" });

app.use(cors({
    origin: "http://localhost:5173",
    methods:["GET", "POST", "PUT", "DELETE"],
    credentials: true,
})
);

app.use(expressFileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));

app.use(cookieParser());
// --- UPDATED LINES START ---
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded ({extended: true, limit: "50mb"}));
// --- UPDATED LINES END ---

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/book", bookRouter);
app.use("/api/v1/borrow",borrowRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/notification",notificationRouter);
app.use("/api/v1/payment",paymentRouter);

notifyUsers();
removeUnverifiedAccounts();
connectDB();

app.use(errorMiddleware);