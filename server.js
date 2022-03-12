const express = require("express");
const register = require("./API/router/auth");
const connectDB = require("./API/config/connectDB");
const dotenv = require("dotenv");
const cors = require("cors");

let port = process.env.PORT || 4040;

dotenv.config({ path: '/home/owais/Project/Wellness_v1/API/config/.env' })
connectDB(process.env.MONGODB_URI);

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "*");

//     if (req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', '*');
//         return res.status(200).json({});
//     }

//     next();
// });

const app = express();

var corsOptions = {
    origin: '*',
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", register);
// app.use("api/appointment", appointment);

app.listen(port, () => {
    console.log("Server Connected");
});
