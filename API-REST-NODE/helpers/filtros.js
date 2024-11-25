const { col } = require("sequelize");

function filtroFutbolista(collection){
    return collection.map(element => {
        const fechaNacimiento = element.get('fecha_nacimiento');
        const dia = fechaNacimiento.day.low;
        const mes = fechaNacimiento.month.low;
        const year = fechaNacimiento.year.low
        const partidos = element.get('partidos').low;

        return {
            id: element.get('id_deportista'),
            nombres: element.get('nombres'),
            apellidos: element.get('apellidos'),
            fecha_nacimiento: `${year}-${mes}-${dia}`,
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
            id: element.get('id_deportista'),
            nombres: element.get('nombres'),
            apellidos: element.get('apellidos'),
            fecha_nacimiento: `${year}-${mes}-${dia}`,
            sexo: element.get('sexo'),
            titulos: titulos,
            deporte: element.get('deporte'),
        };
    });
}

function filtroEquiposFutbol(collection) {
    return collection.map(equipo => ({
        id: equipo.get('id_equipo'),
        nombre: equipo.get('nombre'),
        titulos: equipo.get('titulos').low,
        estadio: equipo.get('estadio')
    }));
}


function filtroEquiposCiclismo(collection) {
    return collection.map(equipo => ({
        id: equipo.get('id_equipo'),
        nombre: equipo.get('nombre'),
        titulos: equipo.get('titulos').low,
        especialidad: equipo.get('especialidad')
    }));
}



function filtroContratacion(collection) {
    return collection.map(contratacion => {
    
        const { day: { low: d_i }, month: { low: m_i }, year: { low: a_i } } = contratacion.get('fecha_inicio');
        
        const { day: { low: d_f }, month: { low: m_f }, year: { low: y_f } } = contratacion.get('fecha_finalizacion');

        return {
            id: contratacion.get('id_contratacion'),
            fecha_inicio: `${a_i}-${m_i}-${d_i}`,
            fecha_finalizacion: `${y_f}-${m_f}-${d_f}`,
            valor: contratacion.get('valor').low
        };
    });
}

function filtroDeporte(collection){
    return collection.map(deporte => ({
        id_deporte: deporte.get('id_deporte'),
        nombre: deporte.get('nombre'),
        pais_origen: deporte.get('pais_origen')
    }))
}

module.exports = {
    filtroFutbolista, 
    filtroCiclista, 
    filtroEquiposFutbol, 
    filtroEquiposCiclismo,
    filtroContratacion,
    filtroDeporte
}