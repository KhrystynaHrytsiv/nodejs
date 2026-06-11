const path = require('node:path');
const fs = require('node:fs');
const afs = require('node:fs/promises');
const readline = require('node:readline/promises');

const reduceEmails = async () =>{

const pathToFile = path.join(process.cwd(), 'emails-2.txt');
const readStream = fs.createReadStream(pathToFile, 'utf8');
const rl = readline.createInterface({input:readStream});
try{
    for await (const line of rl){
        const email = line.trim().split(/\s+/).pop();
        if(email.endsWith('@gmail.com')){
            await afs.appendFile('gmail.com.txt', email + '\n')
        }else if(email.endsWith('ukr.net')){
            await afs.appendFile('ukr.net.txt', email + '\n')
        }
    }
}finally {
    rl.close()
}
}
void reduceEmails()