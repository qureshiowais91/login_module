const express = require("express");
const dotenv = require("dotenv");
//import DB Connection
const connectDB = require("./API/config/connectDB");
const errorHandler = require("./API/middleware/error");

//register and login = auth
const auth = require("./API/router/auth");
const find = require("./API/router/find");
const update = require("./API/router/update");


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
app.use("/user/", cors(corsOptions), auth);
app.use("/user/", cors(corsOptions), update);
app.use("/user/", cors(corsOptions), find);


//  Middleware
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server Connected ${port}`);
});