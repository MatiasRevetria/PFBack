const { captureRejectionSymbol } = require("events");

const sumar = (a,b) => {
    return a + b;
}

const restar = (a,b) => {
    return a - b;
}

const suma = sumar(5,5);
const resta = restar(5,5);

console.log(suma);
console.log(resta);

module.exports = { 
    sumar,
    restar
};