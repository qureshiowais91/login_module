const express = require("express");
const register = require("./API/router/auth");
const account = require("./API/router/doctor/account");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
// const connectDB = require("./API/config/connectDB");
const cors = require("cors");



dotenv.config({ path: '/home/owais/Project/Wellness_v1/API/config/.env' });


async function connectDB(URI) {
    try {
       await mongoose.connect(URI).then((res) => {
            console.log(`connected`);
        });

    } catch (error) {
        console.log(error);
    }
}

connectDB("mongodb+srv://owais91:1kOyxuwdWM0gs4TX@cluster0.btnyu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");


const app = express();

var corsOptions = {
    origin: 'http://127.0.0.1:5500',
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", register);
app.use("/api/doctor", account);


app.listen(3000, () => {
    console.log(`Server Connected 3000`);
});
