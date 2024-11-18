const neo4j = require('neo4j-driver');

// Replace with your Neo4j connection details
const uri = 'bolt://127.0.0.1:7687';
const user = 'neo4j';
const password = 'pepega123';


// Create a driver instance
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

// Function to connect to the `sport` database
const dbConnectionNeo4j = async () => {
    try {
        const session = driver.session({ database : 'sport'}); // Specify the 'sport' database

        await session.run('RETURN 1');

        const result = await session.run('RETURN 1');
        console.log('Connection successful:', result.records);

        console.log('Connected to Neo4j `sport` database successfully');
        await session.close();
    } catch (error) {
        console.error('Error connecting to Neo4j `sport` database:', error);
    }
};

module.exports = { driver, dbConnectionNeo4j };


