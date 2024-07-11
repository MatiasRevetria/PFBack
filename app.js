const express = require("express");
const path = require("path");
const productosRouter = require('./routes/productos.router');//*de esta forma

const app = express();

//middleware para json
app.use(express.json());

//middleware para archivos estaticos y publicos
app.use(express.static(path.join(__dirname,"public")));

//*
app.use('/productos',productosRouter);
// o app.use('/productos', require("./routes/productos.router"));

app.get("/",(req,res)=>{
    res.send("Hola Express");
});

app.get("/factura", (req,res) => {
    res.sendFile(path.join(__dirname,'private', 'factura.html'));
});

let PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
