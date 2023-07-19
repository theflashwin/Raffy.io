var newEventButton = document.getElementById("submitButton") // create new event


newEventButton.onclick = async () => {

    console.log('hello')

    const eventName = document.getElementById('event_name').value
    const totalTickets = document.getElementById('total_tickets').value
    const totalWinners = document.getElementById('total_winners').value
    const summary = document.getElementById('summary').value

    const http = new XMLHttpRequest();
    const url  = "/addnewevent?name=" + eventName + "&numtickets=" + totalTickets + "&totalwinners=" + totalWinners + "&summary=" + summary

    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            window.location = "/"
        }
    }

    http.open("GET", url)
    http.send()

}
