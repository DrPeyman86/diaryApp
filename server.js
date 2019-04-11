let http = require('http');
const debug = require('debug')('diaryApp');
const app = require('./NodeJs/app');

const normalizePort = val => {
  var port = parseInt(val, 10)//determine if it's an integer

  if (isNaN(port)) {
    //named pipe
    return val;
  }

  if (port >= 0) {
    //port number
    return port;
  }

  return false;

}

//output to debug what the address/port we are listening to as incoming requests are made to log what is being requested
const onListening = ()=> {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe" + addr: "port " + port;
  debug("Listening on " + bind)
}

const port = normalizePort(process.env.PORT || "3000");
app.set('port', port)
const server = http.createServer(app);

server.on("error", (error)=>{
  debug.log(error);
})
server.on("listening", onListening);
server.listen(port);
