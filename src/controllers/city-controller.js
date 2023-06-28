const { StatusCodes } = require("http-status-codes");
const {CityService} = require("../services");
const {ErrorResponse, SuccessResponse} = require("../utils/common");


/**
 * POST:  /cities
 * req.body {name: 'London'}
 **/
async function createCity(req, res){
    try{
        const response = await CityService.createCity({
            name: req.body.name,
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
 * GET:  /Citys
 * req.body: {}
 **/
async function getCities(req, res){
    try{
        const response = await CityService.getCities();
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
 * GET:  /City/:id
 * req.body: {}
 **/
async function getCity(req, res) {
    try{
        const response = await CityService.getCity(req.params.id);
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
 * DELETE:  /City/:id
 * req.body: {}
 **/
async function destroyCity(req, res) {
    try{
        const response = await CityService.destroyCity(req.params.id);
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
    createCity,
    getCities,
    getCity,
    destroyCity
}