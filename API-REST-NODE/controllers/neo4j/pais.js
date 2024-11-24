const Pais = require('../../models/neo4j/pais');

const getPaises = async (req, res) => {
    try {
        const collection = await Pais.all();
        const paises = collection.map(pais => pais.get('nombre'));
        res.status(200).json({
            ok: true,
            data: paises,
        });
    } catch (error) {
        console.error('Error al traer los paises', error);
        res.status(500).json({
            ok: false,
            message: 'Error al traer los paises',
        });
    }
};

const agregarPais = async (req, res) => {

    const { nombre } = req.body;
    try {

        await Pais.create({nombre});
        res.status(200).json({
            ok: true,
            msg: 'Country created!'
        });
        
    } catch (error) {
        console.error('error adding Pais:', error);

        if (error.code === "Neo.ClientError.Schema.ConstraintValidationFailed") {
            res.status(400).json({
                ok: false,
                msg: 'Country already exists!'
            });
        } else {

        res.status(500).json({
            ok: false,
            message: 'Falied to add Pais'
            })
        }
    }
}

module.exports = { getPaises, agregarPais };
