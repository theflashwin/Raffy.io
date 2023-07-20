const express = require('express')
const path = require('path')
const dbConfig = require('./db')

// schema
const Event = require("./models/event")

const app = express()


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))

app.listen(8000)

app.get("/", (req, res) => {
    res.render('index')
})

app.get("/newevent", (req, res) => {
    res.render('newEvent')
})

app.get("/addnewevent", async (req, res) => {

    const chosenIndexes = []

    String.prototype.hashCode = function () {
        var hash = 0,
            i, chr;
        if (this.length === 0) return hash;
        for (i = 0; i < this.length; i++) {
            chr = this.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }

    const num = req.query.totalwinners
    const range = req.query.numtickets

    while (chosenIndexes.length != num) {
        const add = Math.floor(Math.random() * (range - 1))
        if (!chosenIndexes.includes(add)) {
            chosenIndexes.push(add)
        }
    }

    const newevent = new Event({
        name: req.query.name,
        summary: req.query.summary,
        numTickets: req.query.numtickets,
        code: Math.abs(req.query.name.hashCode() + "" + Math.floor(Math.random() * (90) + 1)),
        winnerIndexes: chosenIndexes
    })

    console.log(newevent)

    try {
        const event = await newevent.save()
        res.sendStatus(200)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }

})

app.get("/events/:code", async (req, res) => {
    const event = await Event.findOne({ code: req.params.code })
    if (event == null) {
        res.render("notfound")
    }
    res.render("show", { event: event })
    // res.send(event)
})

app.get("/scratch/:code", async (req, res) => {

    const event = await Event.findOne({code: req.params.code})
    const phoneNumber = req.query.phonenumber

    let isWinner = false

    event.winners.forEach((winner) => {
        if(winner.phoneNumber == phoneNumber) {
            isWinner = true
        }
    })

    res.render("scratch", {isWinner: isWinner, event: event})
})

app.get("/info/:code", async (req, res) => {
    const event = await Event.findOne({ code: req.params.code })
    if (event == null) {
        res.render("notfound")
    }
    res.render("info", { event: event })
})

app.get("/drawticket", async (req, res) => {

    let status = 200

    const phoneNumber = req.query.phonenumber
    const name = req.query.name
    const eventCode = req.query.eventcode

    const event = await Event.findOne({ code: eventCode })

    console.log(event)
 
    const tickets = event.tickets

    // check number does not exceed set number of tickets

    if (tickets.length >= event.numTickets) {
        console.log("what")
        status = 500
    }

    // check if phone number has already been registered

    tickets.forEach((ticket) => {
        if (ticket.phoneNumber == phoneNumber) {
            console.log("bitch")
            status = 500
        } 
    })

    // check if this draw is a winner, if so add to winner array
    if (event.winnerIndexes.includes(tickets.length) && status != 500) {
        event.winners.push({
            name: name,
            phoneNumber: phoneNumber,
        })
    }

    if(status != 500) {
        tickets.push({
            name: name,
            phoneNumber: phoneNumber,
        })
        event.save()
    }

    res.sendStatus(status)
})

app.get("/error", (req, res) => {
    res.render("error")
})