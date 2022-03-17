const mongoose = require("mongoose");


const patientSchema = mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    cart: {
        appoinment: {
            doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: "doctor" },
            time: {
                type: Date
            },
            fees: {
                type: Number
            }
        },
    }
});

module.exports = mongoose.model('Patient', patientSchema);



// only accesible by patient 
//api/patient/cart
//POST
//  id,token,
// 
   cart:{
       appoinment:{
           doctorAccount_id:{

           }
       }
   }
