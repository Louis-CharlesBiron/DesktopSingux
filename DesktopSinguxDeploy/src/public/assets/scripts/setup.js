Neutralino.init()
const EXIT_KEY = "escape", ws = new WebSocket("ws://localhost:3000"), backlog = []

// CLOSES APP ON 'EXIT_KEY' PRESS
document.addEventListener("keydown", e=>{
    if (e.key.toLowerCase()==EXIT_KEY) {
        Neutralino.app.exit()
        send({type:"kill"})
    }
})

// SEND COMMAND TO BACKEND
function send(obj) {
    if (ws.readyState == 1) ws.send(JSON.stringify(obj))
    else if (!ws.readyState) backlog.push(obj)
}

// WEBSOCKET COMMUNICATIONS
ws.onopen=()=>{
    ws.onmessage=message=>{
        let m = JSON.parse(message.data)
        console.log(m)
    }

    backlog.forEach(send)
}

