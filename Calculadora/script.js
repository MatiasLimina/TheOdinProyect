let esResultado = false;

function agregar(valor) {
    const pantalla = document.getElementById('pantalla');
    if (esResultado) {
        // Si el valor NO es un operador (es un número), limpiamos la pantalla
        if (!['+', '-', '*', '/'].includes(valor)) {
            pantalla.value = "";
        }
        esResultado = false;
    }
    pantalla.value += valor;
}

function limpiarPantalla() {
    document.getElementById('pantalla').value = "";
    esResultado = false;
}

function borrarUltimo() {
    const pantalla = document.getElementById('pantalla');
    pantalla.value = pantalla.value.toString().slice(0, -1);
    esResultado = false;
}
function suma (a, b) {
    return a+b;
}
function resta (a, b){
    return a-b;
}
function multiplicacion (a, b){
    return a*b;
}
function division (a, b){
    if (b === 0) return "Error";
    return a/b;
}

function calcular(){
    const pantalla = document.getElementById('pantalla');
    let valor = pantalla.value;
    
    // 1. Obtener el primer número
    let match = valor.match(/^\s*(-?\d+(?:\.\d+)?)/);

    if (!match) {
        pantalla.value = "Error";
        esResultado = true;
        return;
    }

    let resultado = parseFloat(match[1]);
    valor = valor.slice(match[0].length); // Eliminar el número procesado del texto

    // 2. Bucle: buscar operador + número sucesivamente
    while (valor.length > 0) {
        // Busca patrón: operador seguido de número
        match = valor.match(/^\s*([\+\-\*\/])\s*(-?\d+(?:\.\d+)?)/);
        
        if (!match) break; // Si no hay más operaciones válidas, salimos del bucle

        const operador = match[1];
        const siguienteNumero = parseFloat(match[2]);

        if (operador === '+') resultado = suma(resultado, siguienteNumero);
        else if (operador === '-') resultado = resta(resultado, siguienteNumero);
        else if (operador === '*') resultado = multiplicacion(resultado, siguienteNumero);
        else if (operador === '/') {
            const res = division(resultado, siguienteNumero);
            if (res === "Error") {
                pantalla.value = "Error";
                esResultado = true;
                return;
            }
            resultado = res;
        }
        
        valor = valor.slice(match[0].length); // Avanzar en el texto
    }

    // Si quedó texto sin procesar (ej: "2+2+"), es un error de sintaxis
    if (valor.trim() !== "") {
        pantalla.value = "Error";
    } else {
        // Limitamos a 4 decimales y quitamos ceros extra con parseFloat
        pantalla.value = parseFloat(resultado.toFixed(4));
    }
    esResultado = true;
}