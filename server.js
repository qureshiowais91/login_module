const express = require("express");
const dotenv = require("dotenv");
const authentication = require("./API/router/auth");
const doctor = require("./API/router/doctor");
const connectDB = require("./API/config/connectDB");
const errorHandler = require("./API/middleware/error");
// const connectDB = require("./API/config/connectDB");
const cors = require("cors");

dotenv.config({ path: "/home/owais/Project/login_0_1/login_module/API/config/.env" });

connectDB(process.env.MONGODB_URI);

const app = express();
// const allowedOrigins = ['http://127.0.0.1:3000', 'http://localhost:5500', 'http://127.0.0.1:3500', 'http://localhost:4500'];

// var corsOptions = {
//     origin: 'http://127.0.0.1:5500',
//     credentials: true
// };

// app.use(cors(corsOptions));

// specify the allowed domains and set corsOptions to check them
var whitelist = ['http://localhost:5500', 'http://127.0.0.1:5500'];
var corsOptions = {
    origin: function (origin, callback) {
        var originWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originWhitelisted);
    }
};

app.use(express.json());

app.use("/api/auth", cors(corsOptions), authentication);
app.use("/api/doctor", cors(corsOptions), doctor);

app.use(errorHandler);
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server Connected ${port}`);
});
