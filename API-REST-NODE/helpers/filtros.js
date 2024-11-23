function tratamientoFutbolista(collection){
    return collection.map(element => {
        const fechaNacimiento = element.get('fecha_nacimiento');
        const dia = fechaNacimiento.day.low;
        const mes = fechaNacimiento.month.low;
        const year = fechaNacimiento.year.low
        const partidos = element.get('partidos').low;

        return {
            nombres: element.get('nombres'),
            apellidos: element.get('apellidos'),
            fecha_nacimiento: `${dia}-${mes}-${year}`,
            sexo: element.get('sexo'),
            partidos: partidos,
            deporte: element.get('deporte'),
        };
    });
}

function tratamientoCiclista(collection){
    return collection.map(element => {
        const fechaNacimiento = element.get('fecha_nacimiento');
        const dia = fechaNacimiento.day.low;
        const mes = fechaNacimiento.month.low;
        const year = fechaNacimiento.year.low
        const titulos = element.get('titulos').low;

        return {
            nombres: element.get('nombres'),
            apellidos: element.get('apellidos'),
            fecha_nacimiento: `${dia}-${mes}-${year}`,
            sexo: element.get('sexo'),
            titulos: titulos,
            deporte: element.get('deporte'),
        };
    });
}

module.exports = {tratamientoFutbolista, tratamientoCiclista}