var express = require('express')
var app = express()
var server = require('http').createServer(app)
var io = require('socket.io').listen(server)

var users =[]
var connections =[]

server.listen(process.env.PORT || 3000)
console.log('Server running')

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html')
})
//Create Connection
io.on('connection', function(socket){
    connections.push(socket)
    console.log('Connected: %s sockets connected oh yeah!!!!!!', connections.length)
})
//Disconnect Connection
io.on('disconnect', function(data){
    // if(!socket.username) return
    users.splice(users.indexOf(socket.username),1)
    updateUsernames()
    connections.splice(connections.indexOf(socket),1)
    console.log('Disconnected: %s sockets connected', connections.length)
      })

//Send Message
io.on('send message', function(data){
    console.log(data)
    sockets.emit('new message',{msg:data})
  })


//New users
io.on('new user', function(data, callback){
    callback(true)
    socket.username = data
    users.push(socket.username)
    updateUsernames()

})

function updateUsernames(){
    sockets.emit('get users', users)
}
