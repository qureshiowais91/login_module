const express = require("express");
const dotenv = require("dotenv");
//import DB Connection
const connectDB = require("./API/config/connectDB");
const errorHandler = require("./API/middleware/error");

//register and login = auth
const auth = require("./API/router/auth");
const find = require("./API/router/find");
const update = require("./API/router/update");
const appoinment = require("./API/router/appoinment");
const drug = require("./API/router/drug");
const test = require("./API/router/test");
const order = require("./API/router/order");

// Cors and Assing PORT
const cors = require("cors");
const port = process.env.PORT || 3000;

//Dotenv Config Path 
dotenv.config({ path: "/home/owais/Project/login_module/API/config/.env" });

//Connect Database 
connectDB(process.env.MONGODB_URI);

const app = express();

// specify the allowed domains and set corsOptions to check them
var whitelist = ['http://localhost:5500', 'http://127.0.0.1:5500',
    'http://127.0.0.1:3000', 'http://localhost:3000'];

var corsOptions = {
    origin: function (origin, callback) {
        var originWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originWhitelisted);
    }
};

// Middleware
app.use(express.json());

// Router User
app.use("/user", cors(corsOptions), auth);
app.use("/user", cors(corsOptions), update);
app.use("/user", cors(corsOptions), find);

// Router pharmacy
app.use("/drug", cors(corsOptions), drug);
app.use("/test", cors(corsOptions), test);

// Router appoinment
app.use("/appoinment", cors(corsOptions), appoinment);
app.use("/order", cors(corsOptions), order);
// Middleware
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server Connected ${port}`);
});