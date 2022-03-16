const express = require("express");
const dotenv = require("dotenv");
//import DB Connection
const connectDB = require("./API/config/connectDB");
const errorHandler = require("./API/middleware/error");

//improt Router

const user = require("./API/router/user");
const doctor = require("./API/router/doctor");
const authentication = require("./API/router/auth");

// Cors and Assing PORT
const cors = require("cors");
const port = process.env.PORT || 3000;

//Dotenv Config Path 
dotenv.config({ path: "/home/owais/Project/login_0_1/login_module/API/config/.env" });

//Connect Database 
connectDB(process.env.MONGODB_URI);

const app = express();

// specify the allowed domains and set corsOptions to check them
var whitelist = ['http://localhost:5500', 'http://127.0.0.1:5500'];
var corsOptions = {
    origin: function (origin, callback) {
        var originWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originWhitelisted);
    }
};

//Middleware
app.use(express.json());
// Router
app.use("/api/auth", cors(corsOptions), authentication);
app.use("/api/user", cors(corsOptions), user);
app.use("/api/docter", cors(corsOptions), doctor);

//  Middleware
app.use(errorHandler);
app.listen(port, () => {
    console.log(`Server Connected ${port}`);
});
