const express = require("express");
const modulos = require("./modulos");

const app = express();


app.get("/",(req,res)=>{
    res.send("Hola Express");
})


let PORT = 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
