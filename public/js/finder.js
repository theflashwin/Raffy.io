var findButton = document.getElementById("findButton") // search for event

findButton.onclick = () => {

    var eventCode = document.getElementById("event_code").value

    window.location.href = `/events/${eventCode}`

}
