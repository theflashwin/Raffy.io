const mongoose = require('mongoose')

const eventSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    numTickets: {
        type: Number,
        required: true
    },
    code: {
        type: String,
        required: false,
    },
    winnerIndexes: [],
    winners: []
})

const eventmodel = mongoose.model("event", eventSchema)

module.exports = eventmodel