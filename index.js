const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req,res)=>{
    const pathFile = "./public/index.html";
    const html = fs.readFileSync(pathFile);
    res.writeHead(200, { 'content-type': 'text/html; Charset=utf - 8'});
    res.end(html);
})

const PORT = 3000;

server.listen(PORT,()=>console.log(`http://localhost:${PORT}`));