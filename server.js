let express = require('express');
let app = express();
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
const server = app.listen(8000);
const io = require('socket.io')(server);

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public/dist/public/'));

mongoose.connect("mongodb://localhost/GOTapi", { useNewUrlParser: true });

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

io.on('connection', function (socket) { //2
  
  socket.emit('greeting', { msg: 'Greetings, from server Node, brought to you by Sockets! -Server' }); //3
  socket.on('thankyou', function (data) { //7
    console.log(data.msg); //8 (note: this log will be on your server's terminal)
  });
    
});

// app.listen(8000, function() {
//   console.log("Listening on port 8000")
// })