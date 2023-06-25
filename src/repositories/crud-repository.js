const { Logger } = require("../config");

class CrudRepository {
    constructor(model){
        this.model = model;
    }

    async create(data){
        try{
            const response = await this.model.create(data);
            return response;
        }
        catch(error){
            Logger.error("Something went wrong in the crud Repo: Create function");
            throw error;
        }
    }

    async destroy(data){
        try{
            const response = await this.model.destroy({
                where: {
                    id: data
                }
            })
        }
        catch(error){
            Logger.error("Something went wrong in this crup Rep: Destroy function");
            throw error;
        }
    }
    async get(data){
        try{
            const response = await this.model.findByPk(data);
            return response;
        }
        catch(error){
            Logger.error("Something went wrong in this crup Rep: get function");
            throw error;
        }
    }
    async getAll(data){
        try{
            const response = await this.model.findAll(data);
            return response;
        }
        catch(error){
            Logger.error("Something went wrong in this crup Rep: getAll function");
            throw error;
        }
    }
    async update(id, data){
        try{
            const response = await this.model.update(data, {
                where: {
                    id: id
                }
            });
            return response;
        }
        catch(error){
            Logger.error("Something went wrong in this crup Rep: Update function");
            throw error;
        }
    }
}


module.exports = CrudRepository;