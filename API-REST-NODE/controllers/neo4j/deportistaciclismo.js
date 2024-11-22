const instance = require('../../models/neo4j/deportista');

const agregarDeportista = async (req, res) => {
    const { nombres, apellidos, fecha_nacimiento, titulos } = req.body;
    try {
        const deportista = await instance.create('Deportista', { 
            nombres, 
            apellidos, 
            fecha_nacimiento,
            titulos
        });

        console.log('Deportista Created:', deportista.toJson());

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
