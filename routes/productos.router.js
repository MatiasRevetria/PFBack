const express = require('express');
const router = express.Router();

const productos = [
    {
        id: 1,
        nombre: "Prod 1"   
    },
    {
        id: 2,
        nombre: "Prod 2"   
    },
    {
        id: 3,
        nombre: "Prod 3"   
    },
    {
        id: 4,
        nombre: "Prod 4"   
    }
]

router.get('/', (req,res) => {
    res.json(productos);
});

router.get("/:id",(req,res) => {

    const producto = productos.find((elemento) => elemento.id == req.params.id);

    if(!producto){
        return res.status(404).json({ error: "No se encontro el producto"});
    }

    res.json(producto);
})

router.post('/',(req,res) => {

    const id = productos[productos.length -1].id + 1;

    const producto = {
        id: id,
        nombre: req.body.nombre,
    };

    productos.push(producto);

    res.status(201).send("Producto creado");
    res.send("POST");
});


router.put('/:id',(req,res) => {

    const {id} = req.params;
    const {nombre} = req.body ;

    const producto = productos.find((elemento) => elemento.id == req.params.id);

    if(!producto){
        return res.status(404).json({error: "No se encontro el producto"});
    };

    res.json({id: id, nombre: nombre});
});

router.delete('/:id', (req,res) => {

    const {id} = req.params;

    const producto = productos.find((elemento) => elemento.id == id);

    if(!producto){
        return res.json(404).json({ error: "No se encuentra dicho producto"});
    };

    const prodIndex = productos.findIndex((elemento) => elemento.id == id);
    productos.splice(prodIndex,1);

    res.send(producto);
});


module.exports = router;