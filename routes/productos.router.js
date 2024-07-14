const express = require('express');
const router = express.Router();
const controller = require('../controllers/productos.controller');
const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, path.join(__dirname,"../public/uploads"));
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const mimetype = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

        if(mimetype && extname){
            return cb(null, true);
        };
    },
    limits: { fileSize: 1024 * 1024 * 1 }
});

router.get('/', controller.index);

router.get("/:id",controller.individual);
//'single' para un solo archivo y 'array' para varios
router.post('/', upload.single("imagen"),controller.agregar);

router.put('/:id',controller.modificar);

router.delete('/:id',controller.borrar);


module.exports = router;