const Deporte = require('../../models/neo4j/deporte')
const { filtroDeporte }  = require('../../helpers/filtros')


const getDeporteFutbol = async (req, res) => {
    try {
        const collection = await Deporte.first({nombre: "Futbol"})
        const deporte = filtroDeporte([collection])

        res.status(200).json({
            ok: true,
            data: deporte
        })

    } catch (error) {
        console.error("Error al traer el deporte")
        res.status(500).json({
            ok: true,
            msg: 'Error al traer deporte'
        })

    }
}

const getDeporteCiclismo = async (req, res) => {
     
    try {
        const collection = await Deporte.first({nombre: "Ciclismo"})
        const deporte = filtroDeporte([collection])

        res.status(200).json({
            ok: true,
            data: deporte
        })

    } catch (error) {
        console.error("Error al traer el deporte")
        res.status(500).json({
            ok: true,
            msg: 'Error al traer deporte'
        })

    }
}

module.exports = {getDeporteCiclismo, getDeporteFutbol}