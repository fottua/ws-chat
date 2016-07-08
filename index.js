var WebSocketServer = new require('ws').Server;
var http = require('http');
var express = require("express")
var app = express()
var port = process.env.PORT || 80



app.use(express.static(__dirname + "/"))

var server = http.createServer(app)
server.listen(port)
console.log("http server listening on %d", port)

// подключенные клиенты
var clients = {};
var wss = new WebSocketServer({server: server})
// WebSocket-сервер на порту 8081
wss.on('connection', function(ws) {
  var animal = ["Капитошка", "Звероящер", "АгрессивныйХомяк", "ПлотоядныйБык", "СобакоЗавр", "Кот", "Паук", "Иссушитель", "Троль1000лвл"];
  var id = animal[Math.round(Math.random()*6)];
  clients[id] = ws;
  console.log("новое соединение " + id);
  for(var key in clients) {
       clients[key].send(id + '@-Вошёл в чат');
  }
  ws.on('message', function(message) {
    console.log('получено сообщение ' + message);

    for(var key in clients) {
      clients[key].send(id + ': ' + message);
      clients[key].send('  : .' + object.keys(clients));
    }
  });

  ws.on('close', function() {
    console.log('соединение закрыто ' + id);
    
    for(var key in clients) {		      
        clients[key].send(id + ':@-Вышел из чата');	
    }
    });

});
