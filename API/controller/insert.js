const pharmacy = require("../model/pharmacy");
const drug = require("../model/drug");
const ErrorResponse = require("../utils/errorResponse");

exports.insertDrug = async (req, res, next) => {
    try {
        const addedBy = req.user.id;

        if (!addedBy) {
            throw new ErrorResponse("Pharmacy Token Missing or Role, Function:addMedicinbyPharmacy Line:10", 403);
        }

        const {
            drugName,
            company,
            price,
            power,
            level } = req.body;

        const addedDrug = await drug.create({
            addedBy,
            drugName,
            company,
            price,
            power,
            level
        });

        if (!addedDrug) {
            throw new ErrorResponse("Can't Add New Medicin, Function:addMedicinbyPharmacy Line:32", 500);
        }

        res.status(201).json({
            success:true,
            addedDrug
        })
    } catch (error) {
        next(error);
    }
}

