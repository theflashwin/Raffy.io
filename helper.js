const newEventButton = document.getElementById('submitButton')

newEventButton.onclick = () => {

    const eventName = document.getElementById('event_name')
    const totalTickets = document.getElementById('total_tickets')
    const totalWinners = document.getElementById('total_winners')

    window.location.href = "addnewevent?name=" + eventName + "&numtickets=" + totalTickets + "&totalwinners=10&totaltickets=" + totalWinners

}