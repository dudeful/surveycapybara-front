const mongoDb = require('mongodb');
const config = require('../config');

//const uri = config.dataBaseUri;
//const uri = "mongodb://127.0.0.1:27017/";

module.exports = async () => {
    const client = new mongoDb.MongoClient(config.dataBaseUri,{
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        family: 4,
    })

    await client.connect()

    return client.db()
}