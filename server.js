const express = require("express");
const dotenv = require("dotenv");
//import DB Connection
const connectDB = require("./API/config/connectDB");
const errorHandler = require("./API/middleware/error");

//improt Router

const registerDoctor = require("./API/router/doctor/auth");

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
app.use("/doctor", cors(corsOptions), registerDoctor);


//  Middleware
app.use(errorHandler);
app.listen(port, () => {
    console.log(`Server Connected ${port}`);
});
