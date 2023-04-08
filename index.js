const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const app = express()
const https= require("http")
const port = process.env.PORT||8080
const {Server} = require("socket.io")
const { env } = require("process")
const httpsServer = https.createServer(app)
const {roomController} = require("./roomController")
const io = new Server(httpsServer,{
    cors:{origin:"*"}
})

const rooms = []
io.on("connection",(socket)=>{
    console.log("connected",socket.id)
    roomController(io,socket,rooms)
    socket.on("disconnected",()=>{
        console.log("disconnected",socket.id)
    })
})

httpsServer.listen(port,()=>{
    console.log(`your server is running on ${port}`)
})