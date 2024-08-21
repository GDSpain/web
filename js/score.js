const scale = 2;

/**
 * Calcula la puntuación basada en la posición y el porcentaje de completitud
 * @param {Number} rank Posición en la lista (de 1 a 212)
 * @param {Number} percent Porcentaje de completitud
 * @param {Number} minPercent Porcentaje mínimo requerido para obtener una puntuación
 * @returns {Number}
 */
export function score(rank, percent, minPercent) {
    if (rank > 212) {
        return 0;
    }

    let score = 0;

    if (rank >= 1 && rank <= 75) {
        score = 350 - (rank - 1) * 4.18;
    } else if (rank >= 76 && rank <= 212) {
        score = 39.93 - (rank - 76) * 0.286;
    }

    score = Math.max(0, score);

    if (percent == 100) {
        return round(score);
    } else if (percent >= minPercent) {
        return round(0.5 * score * (percent - minPercent) / (100 - minPercent) + 0.25 * score);
    } else {
        return 0;
    }
}

/**
 * Redondea un número a un número específico de decimales
 * @param {Number} num Número a redondear
 * @returns {Number} Número redondeado a la cantidad de decimales especificada por scale
 */
export function round(num) {
    if (!('' + num).includes('e')) {
        return +(Math.round(num + 'e+' + scale) + 'e-' + scale);
    } else {
        var arr = ('' + num).split('e');
        var sig = '';
        if (+arr[1] + scale > 0) {
            sig = '+';
        }
        return +(
            Math.round(+arr[0] + 'e' + sig + (+arr[1] + scale)) +
            'e-' +
            scale
        );
    }
}
