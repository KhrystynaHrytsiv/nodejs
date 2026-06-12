const express = require('express');
const {userService} = require("./services/user.service");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))

// app.get('/users/:name',(req, res) =>{
//     console.log(req.params.name);
//     console.log(req.query);
//     res.end('hello from get')
// })
//
// app.post('/users',(req, res) =>{
//     console.log(req.body);
//     res.end('hello from post')
// })
// app.put('/users',(req, res) =>{
//     res.end('hello from put')
// })
// app.patch('/users',(req, res) =>{
//     res.end('hello from patch')
// })
// app.delete('/users',(req, res) =>{
//     res.end('hello from delete')
// })

app.get('/users', async (req, res) =>{
    const users = await userService.getAll();
    res.json(users)
})
app.get('/users/:id', async (req, res) =>{
    const id = req.params.id;
    const data = await userService.getById(id);
    res.json(data)
})

app.post('/users', async (req, res) =>{
    const newUser = req.body;
    const data = await userService.create(newUser);
    res.json(data)

})

app.listen(5000, () =>{
    console.log('server running on 5000 port');
})

