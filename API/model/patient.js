const mongoose = require("mongoose");

const patientSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: [true],
        minlength: [4],
        select: false
    },
    role: {
        type: String,
        default: "patient"
    },
    fullname: {
        type: String,
        MIN: [3],
        MAX: [100]
    },
    email: {
        type: String,
    },
    mobile: {
        type: String,
    },
    birthdate: {
        type: Date
    },
    address: {
        city: {
            type: String
        },
        state: {
            type: String
        }
    },
});
// , {
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true }
// }


// patientSchema.virtual('carts', {
//     ref: 'Cart',
//     localField: '_id',
//     foreignField: 'carts',
//     justOne: true
// });

module.exports = mongoose.model("Patient", patientSchema);


// in patient populate cart 