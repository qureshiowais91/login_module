const express = require("express");
const dotenv = require("dotenv");
const register = require("./API/router/auth");
const account = require("./API/router/doctor/account");
const connectDB = require("./API/config/connectDB");
const errorHandler = require("./API/middleware/error");
// const connectDB = require("./API/config/connectDB");
const cors = require("cors");

dotenv.config({ path: "/home/owais/Project/login_0_1/login_module/API/config/.env" });

connectDB(process.env.MONGODB_URI);

const app = express();

var corsOptions = {
    origin: 'http://127.0.0.1:5500',
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", register);
app.use("/api/doctor", account);
app.use(errorHandler);
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server Connected ${port}`);
});
