const { v4 } = require('uuid');

//const { request, response } = require("express")

module.exports = (db) => {
    return async (request, response) => {
        console.log(client)

        const data = {
            _id: v4(),
            title: request.body.title,
            choices: request.body.choices.map(choice => ({
                name: choice,
                count: 0,
                _id: v4()
            }))
        }
        await db.collection('polls').insertOne(data)

        return response.json({
            message: 'Poll created',
            pollId: data._id
        })
    }
}

/*}
response.json({
    message: 'create polls'
})*/