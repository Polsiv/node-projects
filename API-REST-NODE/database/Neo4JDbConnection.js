const Neode = require('neode');

let instance;

try {
    instance = new Neode(
        process.env.NEO4JCONN, 
        process.env.NEO4JUSER, 
        process.env.PASS
    );
    console.log('Neo4j instance created successfully.');
} catch (error) {
    console.error('Error connecting to Neo4j database:', error);
    throw error; 
}


module.exports = instance;
