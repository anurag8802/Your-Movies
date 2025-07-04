import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./utils/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import cors from "cors";
import path from "path";
dotenv.config({
    path:".env"
})
databaseConnection();

const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
const port = process.env.PORT || 8080;
const _dirname = path.resolve();
const corsOptions = {
    origin:'http://localhost:3000',
    methods: ["GET","POST"],

    credentials:true
}
app.use(cors(corsOptions));
 
app.use("/api/v1/user", userRoute);
app.use(express.static(path.join(_dirname, "/netflix/build")));
app.get('*',(_,res) => {
    res.sendFile(path.resolve(_dirname,"netflix","build","index.html"));
});
app.listen(port,() => {
    console.log(`Server listen at port ${port}`);
});