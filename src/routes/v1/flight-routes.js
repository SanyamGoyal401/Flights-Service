const express = require('express');

const { FlightController } = require("../../controllers")
const {FlightMiddlewares} = require("../../middlewares")
const router = express.Router();



// /api/v1/Flights/ POST
router.post(
    '/',
    FlightMiddlewares.validateCreateRequest,
    FlightController.createFlight
);


// /api/v1/Flights/ GET
router.get('/', FlightController.getAllFlights);


module.exports = router;