// console.log('hello from node');
// console.log(__dirname);
// console.log(__filename);
// console.log(process.cwd());
//
// const {a, func} = require('./services/test');
//
// console.log(a);
// func()

///HTTP
// const http = require('node:http');
// const server = http.createServer((req, res) =>{
//     res.writeHead(200, {'Content-Type': 'application/json'})
//     if(req.url === '/cars'){
//         switch (req.method){
//             case "GET":
//                 return res.end(JSON.stringify({
//                     data: 'my cars'
//                 }))
//             case "POST":
//                 return res.end(JSON.stringify({
//                     data: 'want to create car'
//                 }))
//         }
//     }
// });
//
// server.listen(3000)


//Path
// const path = require('node:path');
// const pathToFile = path.join(process.cwd(), 'services', 'test.js');
// console.log(pathToFile);
// console.log(path.basename(pathToFile));//остання частина шляху test.js
// console.log(path.dirname(pathToFile));//весь шлях окрім файлу
// console.log(path.extname(pathToFile));//показує розширення файлу
// console.log(path.parse(pathToFile));//формує об'єкт про шлях
// console.log(path.normalize('D:\Projects\/nodejs/\services\/test.js'));//виправить на коректний шлях все звйве прибере
// console.log(path.isAbsolute(pathToFile));
// console.log(path.isAbsolute('./services/test'));

//Readline
// const readline = require('node:readline/promises');
//
// const start = async () =>{
//     const rlInterface = readline.createInterface({
//         input: process.stdin,
//         output: process.stdout
//     });
//     const name = await rlInterface.question('What is your name?');
//     const age = await rlInterface.question('How old are you?');
//
//     console.log(`Hello ${name} - ${age}`);
//     rlInterface.close();
//     // process.exit(0);
// };
//
// start()

//FS (File System)
// const fs = require('node:fs/promises');
// const path = require('node:path');
//
// const start = async () =>{
    // await  fs.mkdir(path.join('storage', 'files'), {recursive:true})
    // const filePath= path.join('storage', 'asd', 'meFile2.txt');
    // await fs.writeFile(filePath, 'Hello\n')
    // await fs.appendFile(filePath, 'Hello1\n');
    // const data = await fs.readFile(filePath, {encoding: 'utf8'});
    // console.log(data);
    // await fs.rename(filePath, path.join(process.cwd(), 'storage', 'asd', 'meFile2.txt'))//перейменувати і перемістити
    // await fs.rename(filePath, path.join(path.dirname(filePath), 'qwe.txt'))//перейменувати
    // await fs.copyFile(filePath, path.join(path.dirname(filePath), 'myFile.txt'))
    // await fs.rmdir(path.dirname(filePath));
    // await fs.rm(path.join(process.cwd(), 'storage'), {recursive:true});
    // await fs.unlink('111.txt')
    // const stats = await fs.stat('services/test.js');
    // console.log(stats.isDirectory());
    // //читання по строково
    // const afs = require('node:fs/promises');
    // const fs = require('node:fs');
    // const readline = require('node:readline/promises');
    //
    // const filePath = path.join('storage', 'qwe.txt');
    // const fileStream = fs.createReadStream(filePath, 'utf8');
    // const rl = readline.createInterface({input:fileStream});
    // try{
    //     for await (const line of rl){
    //         await afs.appendFile('result.txt', `${line}****\n`)
    //     }
    // }finally {
    //     await rl.close()
    // }
//copy binary code
    // const fs = require('node:fs');
    //
    // const readStream = fs.createReadStream('nature.jpg');
    // const writeStream = fs.createWriteStream('123.jpg');
    // readStream.on('data', (chunk) =>{
    //     writeStream.write(chunk)
    // })
    // readStream.pipe(writeStream)// це те саме що і вище
// }
// start()

//OS (Operating System)
// const os = require('node:os');
// console.log(os.arch());// архітектура процесора
// console.log(os.cpus());// покаже інфу по кожному ядру
// console.log(os.totalmem()/1024/1024/1024);//оперативна пам'ть в гб
// console.log(os.freemem()/1024/1024/1024);
// console.log(os.homedir());//дерикторія поточного користувача
// console.log(os.hostname());//назва пк
// console.log(os.release());//версія ядра
// console.log(os.tmpdir());//тимчасова директорія
// console.log(os.type());
// console.log(os.uptime()/60/60);
// console.log(os.userInfo());
// console.log(os.version());
// console.log(os.networkInterfaces());
// console.log(os.platform());

//Events
// const emitter = require('node:events');
// const em = new emitter.EventEmitter();
// em.on('firstCall', () =>{
//     console.log('firstCall');
// });
// em.on('secondCall', (name, age) =>{
//     console.log('secondCall', name, age);
// })
// em.once('thirdCall', (name, age) =>{
//     console.log('thirdCall', name, age);
// })
// em.emit('firstCall')
// em.emit('secondCall', "max", 16)
// em.emit('thirdCall', "max", 16)
// em.emit('thirdCall', "max", 16)
// em.emit('thirdCall', "max", 16)

