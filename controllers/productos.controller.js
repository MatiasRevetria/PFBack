const express = require('express');
const db = require('../db/db');

const index =  (req,res) => {
    const sql = 'SELECT * FROM productos'
    db.query(sql,(err,rows) => {
        if(err){
            throw err;
        }
        res.json(rows);
    });
}

const individual = (req,res) => {

    const { id } = req.params;
    const sql = 'SELECT * FROM productos where id = ?';

    db.query(sql,[id],(err,rows) => {

        if(err){
            console.log(err);
            return res.status(501).json({ error:'Intente mas tarde'});
        };

        if(rows.length === 0){
            return res.status(404).json( {error:"No existe el producto+"});
        }

        res.json(rows);
    });
};

const agregar = (req,res) => {
    const {nombre, precio, stock, categoria_id, fecha} = req.body;
    const sql = 'INSERT INTO productos (nombre, precio, stock, categoria_id, fecha) VALUES (?,?,?,?,?)';

    db.query(sql,[nombre,precio,stock,categoria_id,fecha],(error,result) => {
        if(error){
            console.log(error);
            return res.status(501).json({ error:'Intente mas tarde'});
        };
        const productId = result.insertId;
        res.json({...req.body,productId});
    })
}

const modificar = (req,res) => {
    const { id } = req.params;
    const { precio,stock,fecha } = req.body;

    const sql = 'UPDATE productos SET  precio = ?, stock = ?, fecha = ? WHERE id = ?'

    db.query(sql,[precio,stock,fecha,id],(err,result) => {
        if(err){
            console.log(err);
            return res.status(500).json({error: "Intente mas tarde"});
        };

        if(result.affectedRows === 0){
            return res.status(404).json({error:"No existe el producto"});
        }

        const producto = {...req.body, ...req.params};
        res.json(producto);
    });
};

const borrar = (req,res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM productos WHERE id = ?'

    db.query(sql,[id],(err,result) => {
        console.log(result);
        if(err){
            console.log(err);
            return res.status(500).json({error: "Intente mas tarde"});
        };
        if(result.affectedRows === 0){
            return res.status(404).json({error:"No se encontro dicho producto"});
        };
        res.json({mensaje: "Producto borrado"});
    });

};

module.exports = {
    index,
    individual,
    agregar,
    modificar,
    borrar
}