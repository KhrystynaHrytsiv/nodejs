const express = require('express');
const {wishesService} = require("./services/wishesService");
const app = express();
app.use(express.json());
app.get('/wishes', async (req, res) =>{
    const wishes = await wishesService.getAll();
    res.json(wishes)
})
app.post('/wishes', async (req, res) =>{
    const wish = req.body;//зчитай з клієнта боді
    const data = await wishesService.create(wish);// створи нове бажання
    res.json(data)//відправляє відповідь у форматі json
})
app.put('/wishes/:id', async (req, res) =>{
    const {id} = req.params;
    const wish = req.body;
    const data = await wishesService.update(id, wish);
    res.json(data)
})
app.delete('/wishes/:id', async (req, res) =>{
    const id = req.params.id;
    await wishesService.delete(id);
    res.end('deleted')
})
app.listen(4000, () =>{
    console.log('server on port 4000');
})