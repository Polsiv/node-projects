const mongoose = require('mongoose')

const dbConnectionMongo = async() => {
    try {
        await mongoose.connect(process.env.MONGO_CNN,{
        })

        console.log('Base de Datos de Mongo online')
       
    } catch (error) {
        console.log(error)
        throw new Error('Error al levantar la BD de MongoDb')       
    }   
}

module.exports  = {
    dbConnectionMongo
}
