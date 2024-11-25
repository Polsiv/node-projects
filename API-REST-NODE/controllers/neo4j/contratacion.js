const Contratacion = require('../../models/neo4j/contratacion')
const Equipo = require('../../models/neo4j/equipo')
const Deportista = require('../../models/neo4j/deportista')
const { filtroContratacion } = require('../../helpers/filtros')

const getContrataciones = async (req, res) => {

    try {
        const collection = await Contratacion.all()
        const contrataciones = filtroContratacion(collection)
        res.status(200).json({
            ok: true,
            data: contrataciones
        });
    } catch (error) {

        console.error("Error al traer las contrataciones", error)
        res.status(500).json({
            ok: false,
            msg: 'Error al traer las contrataciones'
        });
    }
}

const getContratacionId = async (req, res) => {
    const { id } = req.params

    try {
        const collection = await Contratacion.first({id_contratacion: id})

        if (!collection) {
            return res.status(404).json({
                ok: false,
                msg: 'Contratacion no encontrada!'
            });
        } 
      
        const contratacion = filtroContratacion([collection])

        res.status(200).json({
            ok: true,
            data: contratacion
        });
    } catch (error) {
        console.error("Error al traer la contratacion", error)
        res.status(500).json({
            ok: false,
            msg: 'Error al traer la contratacion'
        });
    }
}

const createContratacion = async (req, res) => {
    const {fecha_inicio, fecha_finalizacion, valor, id_equipo, id_deportista } = req.body
   
    try {
        const payload = {
            fecha_inicio: fecha_inicio,
            fecha_finalizacion: fecha_finalizacion,
            valor: valor
        }
        const deportista = await Deportista.first({id_deportista: id_deportista})
        const equipo = await Equipo.first({id_equipo: id_equipo})
        const deporte_equipo = equipo.get('deporte')
     
        if (deportista.get('deporte') !== deporte_equipo.get('nombre')){
            return res.status(400).json({
                ok: false,
                msg: 'El deporte del equipo y el deporte del deportista DEBEN coincidir'
            });
        }

        if (deportista.get('equipo')) {
            return res.status(400).json({
                ok: false, 
                msg: 'El deportista ya tiene un contrato activo!'
            })
        }

        const contratacion = await Contratacion.create(payload);
        await contratacion.relateTo(deportista, 'para_el')
        await deportista.relateTo(contratacion, 'tiene_una')
        await contratacion.relateTo(equipo, 'realizada_por')
        await equipo.relateTo(contratacion, 'genera_una' )
        await deportista.relateTo(equipo, 'pertenece_a', {fecha_de_vinculacion: fecha_inicio})
        await equipo.relateTo(deportista, 'conformado_por')



        res.status(200).json({
            ok: true,
            msg: "Contratacion creada!"
        });
              
    } catch(error) {
        console.error('Error al crear la contratacion:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear la contratacion',
        });
    }
}

const updateContratacion = async(req, res) => {
    const { id } = req.params
    const {fecha_inicio, fecha_finalizacion, valor } = req.body
    
   try {
    const contratacion = await Contratacion.first({id_contratacion: id})

    if (!contratacion) {
        return res.status(404).json({
            ok: false,
            msg: 'Contratacion no encontrada!'
        });
    } 
    const payload = {
        fecha_inicio: fecha_inicio,
        fecha_finalizacion: fecha_finalizacion,
        valor: valor
    }

    await contratacion.update(payload)

    res.status(200).json({
        ok: true,
        msg: 'contratacion actualizada!'
    })
   } catch (error) {

    console.error("error al acutalizar la contratacion", error)
    res.status(500).json({
        ok: false,
        msg: 'Error al actualizar a contratacion'
    })

   }
}

const deleteContratacion = async(req, res) => {
    const { id } = req.params

    try {

        const contratacion = await Contratacion.first({id_contratacion: id})

        if (!contratacion) {
            return res.status(404).json({
                ok: true,
                msg: 'Contratacion no encontrada!'
            });
        };

        const equipo = await contratacion.get('equipo')
        //const equipo_id = await equipo.get('id_equipo')
        const deportista = await contratacion.get('deportista')
        //const id_deportista = await deportista.get('id_deportista')

        equipo.detachFrom(deportista)
        deportista.detachFrom(equipo)
        await contratacion.delete({id_contratacion: id})

        res.status(200).json({
            ok: true,
            msg: "Contratacion eliminada!"
        });
        
    } catch (error) {
        console.error("error al eliminar la contratacion", error);
        return res.status(500).json({
            ok: false,
            msg: "Error al eliminar la contratacion"
        });
    }
}

module.exports = { getContrataciones, getContratacionId, createContratacion, deleteContratacion, updateContratacion }