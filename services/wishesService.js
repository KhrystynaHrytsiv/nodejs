const {wishesRepositories} = require("../repositories/wishesRepositories");

class WishesService {
    async getAll(){
        return await wishesRepositories.getAll()
    }
    async create (wish){
        return await wishesRepositories.create(wish)
    }
    async update (id, wish){
        return await wishesRepositories.update(id, wish)
    }
    async delete (id){
        return await wishesRepositories.delete(id)
    }
}
const wishesService = new WishesService();
module.exports={wishesService}