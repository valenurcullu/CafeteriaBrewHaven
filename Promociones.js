/*
Explicación General:
Este archivo usa JavaScript puro para hacer 3 cosas:
1. Esperar a que la página se cargue.
2. Escuchar cada vez que el usuario escribe en las casillas de cantidad.
3. Cuando el usuario escribe, ejecutar una función que calcula los totales.
*/

// 'const' se usa para crear variables que no van a cambiar de valor.
// Estos son los precios fijos de nuestros productos.
const PRECIO_LATTE = 3500;
const PRECIO_MEDIALUNA = 1200;
const LIMITE_DESCUENTO_TOTAL = 30000;
const PORCENTAJE_DESCUENTO_TOTAL = 0.10; // 10%

// Explicación:
// 'window.onload' es una función que se asegura de que todo el HTML
// de la página se haya cargado antes de intentar ejecutar este código.
// Si no lo usamos, el código podría correr antes de que existan los
// 'inputs' y 'spans' y daría error.
window.onload = function() {

    // Explicación:
    // Buscamos en el HTML los elementos que necesitamos y los guardamos en variables.
    // 'document.getElementById' es la forma de "agarrar" un elemento por su ID.

    // Inputs (de donde el usuario carga datos)
    let inputLatte = document.getElementById('qty-latte');
    let inputMedialuna = document.getElementById('qty-medialuna');
    let inputOtros = document.getElementById('total-otros');

    // Explicación:
    // 'addEventListener' es como "poner un espía" en el input.
    // Le decimos: "cuando el usuario 'input' (escriba o cambie el número),
    // ejecuta la función 'calcularTotales'".
    inputLatte.addEventListener('input', calcularTotales);
    inputMedialuna.addEventListener('input', calcularTotales);
    inputOtros.addEventListener('input', calcularTotales);

    // Llamamos a la función una vez al principio para que muestre $0.00
    calcularTotales();
};

// Explicación:
// 'function' declara un bloque de código que podemos llamar (ejecutar)
// cuando queramos. Esta función hace todos los cálculos.
function calcularTotales() {

    // Explicación:
    // 1. Agarramos los valores de los inputs.
    // 'parseInt' trata de convertir el texto del input (ej: "2") en un número (ej: 2).
    // '|| 0' significa: "si el resultado es inválido (ej: está vacío), usa 0 en su lugar".
    let qtyLatte = parseInt(document.getElementById('qty-latte').value) || 0;
    let qtyMedialuna = parseInt(document.getElementById('qty-medialuna').value) || 0;
    // 'parseFloat' hace lo mismo pero permite decimales (para el total de otros productos).
    let totalOtros = parseFloat(document.getElementById('total-otros').value) || 0;

    // Explicación:
    // 2. Creamos variables para ir guardando los totales.
    let subtotal = 0;
    let ahorro = 0;

    // --- Cálculo Promo Latté (50% en la 2da) ---
    let subtotalLatte = qtyLatte * PRECIO_LATTE;
    // 'Math.floor' redondea para abajo. (ej: 3 / 2 = 1.5, Math.floor(1.5) = 1)
    // Así, 3 lattes = 1 par con descuento. 2 lattes = 1 par. 1 latte = 0 pares.
    let paresLatte = Math.floor(qtyLatte / 2);
    let ahorroLatte = paresLatte * (PRECIO_LATTE * 0.5); // El ahorro es la mitad del precio

    // --- Cálculo Promo Medialunas (3x2) ---
    let subtotalMedialuna = qtyMedialuna * PRECIO_MEDIALUNA;
    // (ej: 5 medialunas / 3 = 1.66, Math.floor(1.66) = 1).
    // Así, 5 medialunas = 1 promo 3x2 (paga 2, 1 gratis). 3 medialunas = 1 promo.
    let triosMedialuna = Math.floor(qtyMedialuna / 3);
    let ahorroMedialuna = triosMedialuna * PRECIO_MEDIALUNA; // El ahorro es 1 medialuna gratis

    // Explicación:
    // 3. Calculamos el Subtotal (el total ANTES de descuentos)
    subtotal = subtotalLatte + subtotalMedialuna + totalOtros;

    // Explicación:
    // 4. Sumamos los ahorros de las promos.
    ahorro = ahorroLatte + ahorroMedialuna;

    // --- Cálculo Promo 10% por compra > $30.000 ---
    // 'if' es un condicional. "SI el subtotal es MAYOR QUE 30000..."
    if (subtotal > LIMITE_DESCUENTO_TOTAL) {
        // "...entonces calcula el 10% de ese subtotal"
        let ahorroAdicional = subtotal * PORCENTAJE_DESCUENTO_TOTAL;
        // "...y súmalo al ahorro que ya teníamos."
        ahorro = ahorro + ahorroAdicional;
    }

    // Explicación:
    // 5. Calculamos el Total Final
    let totalFinal = subtotal - ahorro;

    // Explicación:
    // 6. Buscamos los 'span' de resultados en el HTML y les ponemos el texto.
    // '.textContent' es la propiedad para cambiar el texto de un elemento.
    // El '$' es solo texto. '.toFixed(2)' es para que muestre 2 decimales (ej: $3500.00)
    document.getElementById('res-subtotal').textContent = '$' + subtotal.toFixed(2);
    document.getElementById('res-ahorro').textContent = '$' + ahorro.toFixed(2);
    document.getElementById('res-total').textContent = '$' + totalFinal.toFixed(2);
}