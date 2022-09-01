const Router = require('express').Router;
const getPoll = require('../handlers/get-poll');
const createPolls = require('../handlers/create-poll');
const createVotes = require('../handlers/create-votes');
const createPollsValidator = require('../validators/create-polls');
const createVotesValidator = require('../validators/create-polls');

module.exports = (app, db, redisDb) => {
    const router = new Router();
    
    router.get('/polls/:poll', getPoll(db));

    router.post('/polls', createPollsValidator, createPolls(db));

    router.put('/polls/:poll', createVotesValidator, createVotes(db, redisDb));

    router.delete('/polls/:poll', createVotesValidator, createVotes(db, redisDb));


    app.use(router);
}