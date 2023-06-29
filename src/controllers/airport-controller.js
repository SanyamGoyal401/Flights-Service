const { StatusCodes } = require("http-status-codes");
const {AirportService} = require("../services");
const {ErrorResponse, SuccessResponse} = require("../utils/common");


/**
 * POST:  /airports
 * req.body {name: 'IGI', code: "DEL", address: '', cityID: 5}
 **/
async function createAirport(req, res){
    try{
        const response = await AirportService.createAirport({
            name: req.body.name,
            code: req.body.code,
            address: req.body.address,
            cityId: req.body.cityId,
        });
        SuccessResponse.data = response;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse)
    }
    catch(error){
        ErrorResponse.error = error
        return res.status(error.statusCode)
        .json(ErrorResponse)
    }
}


/**
 * GET:  /airports
 * req.body: {}
 **/
async function getAirports(req, res){
    try{
        const response = await AirportService.getAirports();
        SuccessResponse.data = response;
        return res 
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    }
    catch(error){
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

/**
 * GET:  /airports/:id
 * req.body: {}
 **/
async function getAirport(req, res) {
    try{
        const response = await AirportService.getAirport(req.params.id);
        SuccessResponse.data = response;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    }
    catch(error){
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}


/**
 * DELETE:  /airports/:id
 * req.body: {}
 **/
async function destroyAirport(req, res) {
    try{
        const response = await AirportService.destroyAirport(req.params.id);
        SuccessResponse.data = response;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    }
    catch(error){
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

module.exports = {
    createAirport,
    getAirport,
    getAirports,
    destroyAirport,
}