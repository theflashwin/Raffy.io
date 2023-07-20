var submitButton = document.getElementById('submitButton')

submitButton.onclick = () => {

    const name = document.getElementById('name').value
    const phoneNumber = document.getElementById('phone_number').value
    const code = document.getElementById('event_code').innerText

    console.log(code)

    const http = new XMLHttpRequest();
    const url  = "/drawticket?name=" + name + "&phonenumber=" + phoneNumber + "&eventcode=" + code

    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            window.location = "/scratch/" + code + "?phonenumber=" + phoneNumber
        } else if(http.status == 500) {
            alert("This phone number has already been used! ONly one entry is allowed per phone number.")
        }
    }

    http.open("GET", url)
    http.send()

}