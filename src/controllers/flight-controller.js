const { StatusCodes } = require("http-status-codes");
const {FlightService} = require("../services");
const {ErrorResponse, SuccessResponse} = require("../utils/common");


/**
 * POST:  /flights
 * req.body {
 * flightNumber: "UK808", 
 * airplaneId: 'a344, 
 * departureAirportId: 12,
 * arrivalAirportId: 11,
 * arrivalTime: "22:10:00",
 * departureTime: "12:5:19",
 * price: 5000,
 * boardingGate: "12A",
 * totalSeats: 200,
 * }
 **/
async function createFlight(req, res){
    try{
        const response = await FlightService.createFlight({
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            departureAirportId: req.body.departureAirportId,
            arrivalAirportId: req.body.arrivalAirportId,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            price: req.body.price,
            boardingGate: req.body.boardingGate,
            totalSeats: req.body.totalSeats,
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

module.exports = {
    createFlight,
}