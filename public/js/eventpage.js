var copylink = document.getElementById('getlink')

const code = document.getElementById('event_code').innerText

copylink.addEventListener("click", () => {
    navigator.clipboard.writeText("http://raffy.io/events/" + code);
    alert("Link Copied to Clipboard")
})