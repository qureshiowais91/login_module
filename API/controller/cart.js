const cart = require("../model/cart");

exports.addInfo = async (req, res, next) => {
    console.log(req.body);
    patient_id = req.body.patient_id;
    doctor_id = req.body.doctor_id;

    const cartData = await cart.create(req.body);
    res.status(200).json({
        cartData
    });
}


exports.Getall = async (req, res, next) => {
    const carts = await cart
        .find()
        .populate("appoinment.doctor_id")
        .populate("appoinment.patient_id");

    res.status(200).json({
        success: true,
        carts
    })
}

exports.userCart = async (req, res, next) => {
    try {

        const patientCart = await cart
            .find({
                appoinment:
                {
                    patient_id: req.user._id
                }
            })
            .populate({ path: "appoinment.patient_id" })
            .populate({ path: "appoinment.doctor_id" });

        if (!patientCart) {
            throw new ErrorResponse("patient Cart Not Populate", 403);
        }

        res
            .status(200)
            .json({
                success: true,
                Cart: patientCart
            })
    }
    catch (error) {
        next(error
        )
    }
}


