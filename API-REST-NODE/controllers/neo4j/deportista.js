const instance = require('../../models/neo4j/deportista');

const agregarDeportista = async (req, res) => {
    const { nombres, apellidos, fecha_nacimiento, titulos, partidos } = req.body;
    try {
        const payload = {
            nombres,
            apellidos,
            fecha_nacimiento,
            ...(titulos !== undefined && { titulos }), // Only include if defined
            ...(partidos !== undefined && { partidos }) // Only include if defined
        };
        const deportista = await instance.create('Deportista', payload);

        res.status(201).json({
            ok: true,
            data: deportista.toJson(),
        });
    } catch (error) {
        console.error('Error adding Deportista:', error);
        res.status(500).json({
            ok: false,
            message: 'Failed to add Deportista',
        });
    }
};

module.exports = { agregarDeportista };
