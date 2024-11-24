function filtroFutbolista(collection){
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

function filtroCiclista(collection){
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

function filtroEquiposFutbol(collection) {
    const equipos = [];
    for (const equipo of collection) {
        console.log(equipo.get('_id'))
        const payload = {
            nombre: equipo.get('nombre'),
            titulos: equipo.get('titulos').low,
            estadio: equipo.get('estadio')
        }
        equipos.push(payload)
    }
    
    return equipos
}

module.exports = {filtroFutbolista, filtroCiclista, filtroEquiposFutbol}