const {read, write} = require("../services/fsService");

class WishesRepositories{
    async getAll(){
        return read()
    }
    async create(wish){
     const wishes = await read(); //прочитай всі бажання у файлі
     const newWish = {id: wishes.length ? wishes[wishes.length - 1].id +1 : 1, ...wish}; //створи нове бажання
     wishes.push(newWish);//додай його в масив
     await write(wishes);//запиши його в файл
     return newWish
    }
    async update (id, wish){
        const wishes = await read();//прочитай всі бажання у файлі
        const index = wishes.findIndex(wish => wish.id === Number(id));//знайти бажжання за айді
        if(index === -1) return null //якщо айді немає то бажання не оновиться
        wish.id = Number(id);//щоб айді не змінювалось
        wishes[index] = wish;//змінене бажання дорівнює новому бажанню
        await write(wishes);//запиши його в файл
        return wish;
    }
    async delete (id){
        const wishes = await read();
        const index = wishes.findIndex(wish => wish.id === Number(id));
        wishes.splice(index, 1);
        await write(wishes)
    }
}
const wishesRepositories = new WishesRepositories();
module.exports ={ wishesRepositories}