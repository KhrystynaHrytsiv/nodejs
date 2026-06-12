const fs = require('node:fs/promises');
const path = require('node:path');

const filePath = path.join(process.cwd(), 'db', 'wishes.json')
const read = async () =>{
    try{
        const json = await fs.readFile(filePath, 'utf-8');
        return json ? JSON.parse(json) : []
    }catch (e) {
        console.log('error', e.message);
    }
};

const write = async (wishes) =>{
    try{
       await fs.writeFile(filePath, JSON.stringify(wishes, null, 2))
    }catch (e) {
        console.log('error', e.message);
    }
}

module.exports = {read, write}