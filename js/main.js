import * as combine from './combine.js';

// Elementos de la interfaz
const numero1Input = document.getElementById('numero1');
const numero2Input = document.getElementById('numero2');
const inputGeneral = document.getElementById('inputGeneral');
const operacionSelect = document.getElementById('operacion');
const btncalcular = document.getElementById('btncalcular');
const resultadosDiv = document.getElementById('resultados');

// Elementos de testing
const btnTest = document.getElementById('btnTest');
const testStatus = document.getElementById('test-status');

// 1. FUNCION CALCULAR (Normal)
function calcular() {
    try {
        const operacion = operacionSelect.value;
        const num1 = parseFloat(numero1Input.value) || 0;
        const valGeneral = inputGeneral.value;
        let resultado;

        switch (operacion) {
            case 'ex26': resultado = combine.ejer.ex26({ subarrayInput: valGeneral }); break;
            case 'ex27': resultado = combine.ejer.ex27({ array1Input: valGeneral, array2Input: numero2Input.value }); break;
            case 'ex28': resultado = combine.ejer.ex28({ primeLimitInput: num1 }); break;
            case 'ex29': resultado = combine.ejer.ex29({ matrixInput: valGeneral }); break;
            case 'ex30': resultado = combine.ejer.ex30({ mergeSortInput: valGeneral }); break;
            case 'nombre': resultado = { result: `👤 Autor: ${combine.name}` }; break;
            default: throw new Error('Operación no implementada');
        }

        resultadosDiv.innerText = resultado.result;
        resultadosDiv.style.color = "#2ecc71";
        resultadosDiv.style.borderColor = "#2ecc71";
    } catch (error) {
        resultadosDiv.innerText = `❌ Error: ${error.message}`;
        resultadosDiv.style.color = "#e74c3c";
        resultadosDiv.style.borderColor = "#e74c3c";
    }
}

// 2. FUNCION DE TESTING (Validación)
const baseDeTests = {
    ex26: { input: { subarrayInput: "-2,1,-3,4,-1,2,1,-5,4" }, esperado: "6" },
    ex27: { input: { array1Input: "1,3,5", array2Input: "2,4,6" }, esperado: "1, 2, 3, 4, 5, 6" },
    ex28: { input: { primeLimitInput: 10 }, esperado: "2, 3, 5, 7" },
    ex29: { input: { matrixInput: "1,2;3,4" }, esperado: "1, 3, 2, 4" },
    ex30: { input: { mergeSortInput: "5, 2, 9, 1" }, esperado: "1, 2, 5, 9" }
};

function ejecutarTesting() {
    const id = operacionSelect.value;
    const prueba = baseDeTests[id];

    if (!prueba) {
        testStatus.innerText = "⚠️ No hay tests para esta opción.";
        testStatus.style.color = "#f39c12";
        return;
    }

    try {
        testStatus.innerText = "Ejecutando... ⏳";
        testStatus.style.color = "#3498db";

        // Llamada a combine.ejer[ex28](...) etc.
        const respuesta = combine.ejer[id](prueba.input);
        const obtenido = String(respuesta.result).trim();

        if (obtenido.includes(prueba.esperado)) {
            testStatus.innerText = `✅ APROBADO: Ejercicio ${id} funcionando.`;
            testStatus.style.color = "#2ecc71";
        } else {
            testStatus.innerText = `❌ DESAPROBADO: Se esperaba "${prueba.esperado}" pero se recibió "${obtenido}"`;
            testStatus.style.color = "#e67e22";
        }
    } catch (error) {
        testStatus.innerText = `💥 ERROR EN CÓDIGO: ${error.message}`;
        testStatus.style.color = "#e74c3c";
    }
}

// Escuchadores
btncalcular.addEventListener('click', calcular);
btnTest.addEventListener('click', ejecutarTesting);