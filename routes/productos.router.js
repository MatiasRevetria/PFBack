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
module.exports = router;