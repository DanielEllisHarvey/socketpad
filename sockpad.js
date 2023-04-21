const express = require("express");
const app = express();
const ews = require("express-ws")(app);
const bodyparser = require("body-parser");

app.use(bodyparser.json());

app.get("/sockpad/",(req,res) => {
    console.log("connection");
    res.sendFile(__dirname+"/index.html");
})
app.ws("/sockpad/ws", (wss,res) => {
    wss.on("message", (msg) => {
        console.log(msg.toString());
        ews.getWss("/sockpad").clients.forEach((client) => { if (client != wss)client.send(msg); });
    })
})
console.log("a")
app.listen(8181)