import * as combine from './combine.js';

const numero1Input = document.getElementById('numero1');
const numero2Input = document.getElementById('numero2');
const inputGeneral = document.getElementById('inputGeneral');
const operacionSelect = document.getElementById('operacion');
const btncalcular = document.getElementById('btncalcular');
const resultadosDiv = document.getElementById('resultados');

function calcular() {
    try {
        const operacion = operacionSelect.value;
        const num1 = parseFloat(numero1Input.value) || 0;
        const valGeneral = inputGeneral.value;

        let resultado;

        switch (operacion) {
            case 'ex26':
                // Suma máxima de subarreglo
                resultado = combine.ejer.ex26({ subarrayInput: valGeneral });
                break;

            case 'ex27':
                // Merge de dos listas: mezcla 'Input General' con 'Número 2'
                resultado = combine.ejer.ex27({
                    array1Input: valGeneral,
                    array2Input: numero2Input.value 
                });
                break;

            case 'ex28':
                // Primos hasta el límite definido en 'Número 1'
                resultado = combine.ejer.ex28({ primeLimitInput: num1 });
                break;

            case 'ex29':
                // Transponer Matriz usando 'Input General'
                resultado = combine.ejer.ex29({ matrixInput: valGeneral });
                break;

            case 'ex30':
                // Ordenar lista usando 'Input General'
                resultado = combine.ejer.ex30({ mergeSortInput: valGeneral });
                break;

            case 'nombre':
                // Caso especial para mostrar el autor
                resultado = { result: `👤 Autor: ${combine.name}` };
                break;

            default:
                throw new Error('Operación no implementada');
        }

        // Renderizado del resultado exitoso
        resultadosDiv.innerText = resultado.result;
        resultadosDiv.style.color = "#2ecc71"; // Un verde éxito para que se vea genial
        resultadosDiv.style.fontWeight = "bold";

    } catch (error) {
        // Manejo de errores visual
        resultadosDiv.innerText = `❌ Error: ${error.message}`;
        resultadosDiv.style.color = "#e74c3c"; // Rojo para errores
    }
}

// Escuchador de eventos
btncalcular.addEventListener('click', calcular);