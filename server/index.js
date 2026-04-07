import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import postRoutes from "./routes/posts.js"
import userRoutes from "./routes/users.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config();


app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

// Serve static files from client build
app.use(express.static(path.join(__dirname, '../client/build')));

// Health check endpoint
app.get("/api", (req, res) => {
    res.status(200).json({ 
        message: "Server is running successfully!",
        status: "OK",
    });
});

app.use("/posts",postRoutes);
app.use("/user",userRoutes);

// Serve client-side app for any unmatched routes (SPA routing)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const PORT = process.env.PORT;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>  app.listen(PORT,()=> console.log(`Server running on port: ${PORT}`)))
    .catch((err)=> console.log(err.message))

// mongoose.set('useFindAndModify', false);
