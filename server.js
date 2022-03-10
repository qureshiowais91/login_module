const express = require("express");
const register = require("./API/router/auth");
const connectDB = require("./API/config/connectDB");
const dotenv = require("dotenv");

const app = express();

dotenv.config({ path: '/home/owais/Project/Wellness_v1/API/config/.env' })
connectDB(process.env.URI);
app.use(express.json());
app.use("/api/auth", register);


app.listen(3000, () => {
    console.log("Server Connected");
});
