const pagination = (model) => {
    return async (req, res, next) => {
        var page = parseInt(req.query.page);
        var limit = parseInt(req.query.limit);

        // if (!limit || limit > 25) {
        //     limit = 15;
        // }


        // if (!page) {
        //     page = 1;
        // }


        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const result = {};


        result.curr = {
            page: startIndex,
            limit: limit
        }
        if (endIndex < await model.countDocuments().exec()) {
            result.next = {
                page: page + 1,
                limit: limit
            }
        }


        if (startIndex > 0) {
            result.prev = {
                page: page - 1,
                limit: limit
            }
        }

        try {
            res.paginationData = result;
            next();
        } catch (error) {
            next(error);
        }
    }
}


module.exports = pagination;