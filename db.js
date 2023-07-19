const mongoose = require('mongoose')

var mongoURL = "mongodb://localhost:27017/scratchoff";

mongoose.connect(mongoURL); 

var connection = mongoose.connection;

connection.on('error', () => {
    console.log('MongoDB Connection Failure')
})

connection.on('connected', () => {
    console.log('MongoDB Connection Success')
})

module.exports = mongoose;