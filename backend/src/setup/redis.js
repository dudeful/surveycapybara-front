const redis = require('redis');
const config = require('../config');

module.exports = () => {
    return redis.createClient(config.redisConnectionUri)
}