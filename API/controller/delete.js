const order = require("../model/appoinmentOrder");
const ErrorResponse = require("../utils/errorResponse");

exports.deleteOrder = async (req, res, next) => {
    try {
        const deletedOrder = await order.findOneAndDelete({ orderBy: req.body.orderBy });
        if (!deletedOrder) {
            throw new ErrorResponse("Delete Not performed", 404);
        }

        res
            .status(200)
            .json({
                success: true,
                data: deletedOrder
            });
    } catch (error) {
        next(error);
    }
}