//step-1
//first create server
import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./utils/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import cors from "cors";
import path from "path";
//This line uses the dotenv package to load environment variables from a file named .env.
//The path: ".env" option specifies the location of the .env file, 
dotenv.config({
    path:".env"
})
//is a function call that is typically used  to establish a connection to a database. 
databaseConnection();

const app = express();//express is called
//middlewares 
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
const port = process.env.PORT || 8080;
const _dirname = path.resolve();
// These lines set up rules for which domains can
//  access your server, what HTTP methods they can use, 
//  and whether they can send credentials like cookies. 
//  This helps ensure that your server only accepts requests 
//  from trusted sources.
const corsOptions = {
    origin:'http://localhost:3000',
    methods: ["GET","POST"],
//  GET: Retrieve data.
// POST: Create new resources.
// PUT: Update or create resources.
// DELETE: Remove resources.
// PATCH: Partially update resources.
    credentials:true
}
app.use(cors(corsOptions));
 
// api
app.use("/api/v1/user", userRoute);
//app.listen is a method that starts the server and makes it listen for incoming requests.
//port is a variable that holds the port number where the server will listen for requests. This is typically a number like 3000 or 8080.
//The second argument is a callback function that gets executed once the server starts successfully.
app.use(express.static(path.join(_dirname, "/netflix/build")));
app.get('*',(_,res) => {
    res.sendFile(path.resolve(_dirname,"netflix","build","index.html"));
});
app.listen(port,() => {
    console.log(`Server listen at port ${port}`);
});