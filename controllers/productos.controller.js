const db = require('../db/db');
const fs = require('fs');
const path = require('path');

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
    const { filename } = req.file;
    const sql = 'INSERT INTO productos (nombre, precio, stock, categoria_id, fecha, imagen) VALUES (?,?,?,?,?,?)';

    db.query(sql,[nombre,precio,stock,categoria_id,fecha, filename],(error,result) => {
        if(error){
            console.log(error);
            fs.unlinkSync(path.join(__dirname,'../public/uploads'));
            return res.status(501).json({ error:'Intente mas tarde'});
        };
        res.json({...req.body,productId: result.insertId});
    })
}

const modificar = (req,res) => {

    //hacer una query para buscar el nombre de la imagen anterior en caso de querer modificarla subiendo una nueva.

    const { id } = req.params;
    const { precio,stock,fecha } = req.body;
    const sql = 'UPDATE productos SET  precio = ?, stock = ?, fecha = ? WHERE id = ?'
    const valores = [precio,stock,fecha];

    if(req.file){
        const { filename } = req.file;
        const sql = 'UPDATE productos SET  precio = ?, stock = ?, fecha = ?, imagen = ?  WHERE id = ?'
        valores.push(filename);
    };

    valores.push(id);

    db.query(sql,valores,(err,result) => {
        if(err){
            console.log(err);
            return res.status(500).json({error: "Intente mas tarde"});
        };

        if(result.affectedRows === 0){
            //borrar la imagen subida
            return res.status(404).json({error:"No existe el producto"});
        }
        if(result.affectedRows === 1){
            // fs.unlinkSync; a la imagen anterior
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