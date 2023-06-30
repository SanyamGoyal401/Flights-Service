const CrudRepository =require("./crud-repository");
const {Airport} = require("../models");

class AirportRepository extends CrudRepository{
    constructor(){
        super(Airport);
    }
    async getAllAirports(filter) {
        console.log(filter);
        try {
            const response = await Airport.findAll({
                where: filter,
            });
            return response;
        }
        catch(error){
            console.log(error);
        }
    }
}

module.exports = AirportRepository;