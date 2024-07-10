const express = require("express");
const modulos = require("./modulos");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname,"public")));

app.get("/",(req,res)=>{
    res.send("Hola Express");
});

app.get("/factura", (req,res) => {
    res.sendFile(path.join(__dirname,'private', 'factura.html'));
});

let PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
