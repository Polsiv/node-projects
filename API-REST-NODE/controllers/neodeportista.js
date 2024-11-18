
const { driver, dbConnectionNeo4j  } = require('../database/Neo4JDbConnection');
  
const obtenerDeportistas = async (req, res) => {
const session = driver.session({ database: 'sport' });
try {
    const result = await session.run('MATCH (p:Person) RETURN p');
    const personas = result.records.map(record => record.get('p').properties);


    res.json({
        ok: true,
        data: personas,
    });
} catch (error) {
    console.error('Error fetching personas:', error);
    res.status(500).json({
        ok: false,
        message: 'Failed to fetch personas',
    });
} finally {
    await session.close();
}
};

module.exports = {
  obtenerDeportistas
}