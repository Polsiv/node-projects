const Deportista = require('../../models/neo4j/deportista');
const Pais = require('../../models/neo4j/pais')
const { filtroFutbolista, filtroCiclista } = require('../../helpers/filtros')

const getFutbolistas = async (req, res) => {
    try {
        const collection = await Deportista.all({ deporte: 'Futbol' });
        const deportistas = filtroFutbolista(collection);
        res.status(200).json({
            ok: true,
            data: deportistas,
        });
    } catch (error) {
        console.error('Error al traer los futbolistas', error);
        res.status(500).json({
            ok: false,
            msg: 'Error al traer los futbolistas',
        });
    }
};


const getCiclistas = async (req, res) => {
    try {
        const collection = await Deportista.all({ deporte: 'Ciclismo' });
        const deportistas = filtroCiclista(collection);
        res.status(200).json({
            ok: true,
            data: deportistas,
        });
    } catch (error) {
        console.error('Error al traer los ciclistas', error);
        res.status(500).json({
            ok: false,
            msg: 'Error al traer los ciclistas'
        });
    }
};

const getFutbolistaId = async (req, res) => {

    const {id} = req.params
    try {

        const collection = await Deportista.first({id_deportista: id});

        if (!collection){
            return res.status(404).json({
                ok: true,
                msg: 'Futbolista no encontrado!'
            })
        }

        const futbolisa = filtroFutbolista([collection])

        res.status(200).json({
            ok: true,
            data: futbolisa
        })

    } catch (error) {
        console.error("Error al encontrar el futbolista", error)

        res.status(500).json({
            ok: false,
            msg: "Error al encontrar el futbolista"
        });
    }
}

const getCiclistaId = async (req, res) => {

    const {id} = req.params
    try {

        const collection = await Deportista.first({id_deportista: id});

        if (!collection){
            return res.status(404).json({
                ok: true,
                msg: 'Ciclista no encontrado!'
            })
        }

        const ciclista = filtroCiclista([collection])

        res.status(200).json({
            ok: true,
            data: ciclista
        })

    } catch (error) {
        console.error("Error al encontrar el ciclista", error)

        res.status(500).json({
            ok: false,
            msg: "Error al encontrar el ciclista"
        });
    }
}

const agregarDeportista = async (req, res) => {
    const { nombres, apellidos, fecha_nacimiento, sexo, partidos, titulos, deporte, ciudad, id_pais } = req.body;
    try {

        const payload = {
            nombres, apellidos, fecha_nacimiento, sexo, deporte,
            // include if defined (ONLY)
            ...(titulos !== undefined && { titulos }), 
            ...(partidos !== undefined && { partidos }) 
        };

        const deportista = await Deportista.create(payload);
        const pais = await Pais.first({id_pais: id_pais})
        await deportista.relateTo(pais, 'nacido_en', {fecha_nacimiento: fecha_nacimiento, ciudad_de_nacimiento: ciudad})
        await pais.relateTo(deportista, "lugar_de_nacimiento_de")

        res.status(201).json({
            ok: true, 
            msg: "Deporista created!",
        });

    } catch (error) {
         console.error('Error al agregar el deportista', error);

        if (error.code === "Neo.ClientError.Schema.ConstraintValidationFailed") {
            res.status(400).json({
                ok: false,
                msg: 'El deportista ya existe!'
            });
        } else {

        res.status(500).json({
            ok: false,
            message: 'Error al agregar el deportista'
            })
        }
    }
};

const updateDeportista = async (req, res) => {
    const { id } = req.params;
    const { nombres, apellidos, sexo, partidos, titulos } = req.body;
    
    try {

        const deportista = await Deportista.first({id_deportista: id})

        if (!deportista) {
            return res.status(200).json({
                ok: true,
                msg: "Deportista no encontrado!"
            });
        }

        const payload = {
                nombres, apellidos, sexo, 
                // include if defined (ONLY)
                ...(titulos !== undefined && { titulos }), 
                ...(partidos !== undefined && { partidos }) 
        }

        await deportista.update(payload)

        res.status(200).json({
            ok: true,
            msg: 'Deportista actualizado'
        });

    } catch (error) {

        console.error("Error al actualizar el deportista!", error)
        res.status(500).json({
            ok: false,
            msg: "Error al actualizar el deportista"
        })
    }
}

const deleteDeportista = async (req, res) => {
    const { id } = req.params

    try {

        const deportista = await Deportista.first({id_deportista: id})

        if (!deportista) {
            return res.status(200).json({
                ok: true,
                msg: "Deportista no encontrado!"
            });
        }

        const contratacion = await deportista.get('contratacion')

        if (contratacion){
            await contratacion.delete()
        }

        await deportista.delete()
        
        res.status(200).json({
            ok: true,
            msg: "Deportista eliminado!"
        })
    
    } catch (error) {
        console.error("error al el deportista: ", error)
        res.status(500).json({
            ok: false,
            msg: "Error al eliminar del deportista"
        })
    }
}

module.exports = { agregarDeportista, getCiclistas, getFutbolistas, updateDeportista, deleteDeportista, getCiclistaId, getFutbolistaId };
