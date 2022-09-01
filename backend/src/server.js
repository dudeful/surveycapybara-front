const express = require('express');
const setupMiddleware = require('./setup/middleware');
const setupRouter = require('./setup/router');
const setupRedis = require('./setup/redis');
const setupDatabase = require('./setup/database');
const config = require('./config');

//const port = process.env.PORT || 4000;
const app = express();

setupMiddleware(app);
//setupRouter(app);

async function start() {
    const db = await setupDatabase()
    const redisDb = await setupRedis()

    setupRouter(app, db, redisDb);

        app.listen(config.port, () => {
            console.log(`Server started PORT: ${config.port}`)
        })
}

start().catch(console.error)


/*setupDatabase()
    .then((client) => {
        console.log(client)

        setupRouter(app, client);

        app.listen(port, () => {
            console.log(`Server started PORT: ${port}`)
        })
    })
    app.listen(port, () => {
        console.log(`Server started PORT: ${port}`)
    })*/
