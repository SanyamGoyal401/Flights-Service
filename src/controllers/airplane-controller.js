const { StatusCodes } = require("http-status-codes");
const {AirplaneService} = require("../services");
const {ErrorResponse, SuccessResponse} = require("../utils/common");


/**
 * POST:  /airplanes
 * req.body {modelNumber: 'airbus328', capacity: 200}
 **/
async function createAirplane(req, res){
    try{
        const response = await AirplaneService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity,
        });
        SuccessResponse.data = response;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse)
    }
    catch(error){
        return res.status(error.statusCode)
        .json(ErrorResponse)
    }
}

module.exports = {
    createAirplane
}