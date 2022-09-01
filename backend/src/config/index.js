module.exports = {
    dataBaseUri: process.env.DATABASE_URI || 'mongodb://localhost/voting-platform',
    port: process.env.PORT || 4000,
    redisConnectionUri: process.env.REDIS_CONNECTION_URI
}