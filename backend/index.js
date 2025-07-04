import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./utils/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import cors from "cors";
dotenv.config({ path: ".env" });
databaseConnection();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
const port = process.env.PORT || 8080;

const corsOptions = {
    origin: [
        'http://localhost:3000',
        'https://resilient-gaufre-d84acd.netlify.app'
    ],
    methods: ["GET", "POST"],
    credentials: true
};
app.use(cors(corsOptions));

app.use("/api/v1/user", userRoute);

app.listen(port, () => {
    console.log(`Server listen at port ${port}`);
});