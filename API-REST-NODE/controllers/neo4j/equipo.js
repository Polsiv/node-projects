const Equipo = require('../../models/neo4j/equipo')
const Deporte = require('../../models/neo4j/deporte')
const Pais = require('../../models/neo4j/pais')
const { filtroEquiposFutbol, filtroEquiposCiclismo } = require('../../helpers/filtros');
const { UPDATE } = require('sequelize/lib/query-types');

const agregarEquipo = async (req, res) => {

    const {nombre, titulos, estadio, especialidad, pais, deporte} = req.body
    try {
        const payload = {
            nombre, titulos,
            ...(estadio !== undefined && { estadio }),
            ...(especialidad !== undefined && { especialidad })
        };
        
        // creation and relationships
        const deporte_asignado = await Deporte.first({nombre: deporte})
        const equipo = await Equipo.create(payload);
        const pais_origen = await Pais.first({nombre: pais})

        await equipo.relateTo(deporte_asignado, 'asignado_a');
        await deporte_asignado.relateTo(equipo, 'la_razon_de')
        await equipo.relateTo(pais_origen, 'fundado_en')
        await pais_origen.relateTo(equipo, 'lugar_de_origen')

        // response

        res.status(201).json({
            ok: true,
            msg: "Equipo Created!",

        });
    } catch (error) {
        console.error('Error adding Equipo:', error);
        res.status(500).json({
            ok: false,
            msg: 'Failed to add Equipo',
        });
    }
}

const getEquiposFutbol = async (req, res) => {
    try {
        const deporte = await Deporte.first({nombre: 'Futbol'})
        const equipos = filtroEquiposFutbol(deporte.get('equipos'))

        res.status(200).json({
            ok: true,
            msg: equipos
        });
    } catch (error) {

        console.error("Error al traer equipos futbol", error)
        res.status(500).json({
            ok: false,
            msg: 'Error al traer los los equipos futbol'
        });

    }
}

const getEquiposCiclismo = async (req, res) => {
    try {
        const deporte = await Deporte.first({nombre: 'Ciclismo'})
        const equipos = filtroEquiposCiclismo(deporte.get('equipos'))

        res.status(200).json({
            ok: true,
            msg: equipos
        });
    } catch (error) {

        console.error("Error al traer equipos de ciclismo", error)
        res.status(500).json({
            ok: false,
            msg: 'Error al traer los los equipos Ciclismo'
        });

    }
}

const getEquipoId = async(req, res) => {
    const { id } = req.params;
    try {
        const collection = await Equipo.first({id_equipo: id});

        if (!collection) {
            return res.status(200).json({
                ok: true,
                msg: "Equipo not found!"
            });
        }

        const deporte = await collection.get('estadio')
        const equipo = deporte 
            ? filtroEquiposFutbol([collection]) 
            : filtroEquiposCiclismo([collection]);

        res.status(200).json({
            ok: true,
            data: equipo
        });

    } catch (error) {

        console.error("Error al traer el equipo de ciclismo", error)
        res.status(500).json({
            ok: false,
            msg: 'Error al traer el equipo de ciclismo'
        });
    }
}

const updateEquipo = async(req, res) => {
    const { id } = req.params;
    const { nombre, titulos, estadio, especialidad } = req.body;

    try {
        const equipo = await Equipo.first({id_equipo: id})
        if (!equipo) {
            return res.status(200).json({
                ok: true,
                msg: "Equipo not found!"
            });
        }
        const payload = {
            nombre,
            titulos,
            estadio: estadio || equipo.estadio,
            especialidad: estadio ? undefined : especialidad
        };

        await equipo.update(payload);

        res.status(200).json({
            ok: true,
            msg: "Equipo actualizado!"
        });

    } catch (error) {

        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: "Internal server error"
        });
    }
}
module.exports = { agregarEquipo, getEquiposFutbol, getEquiposCiclismo, getEquipoId, updateEquipo }
