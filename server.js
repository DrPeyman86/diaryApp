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


//catch certain function if it occurs in app and exit the app properly
const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  switch (error.code) {
    case "EACCESS":
      console.error(bind + " requires elevated privilages");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;

  }

};


//output to debug what the address/port we are listening to as incoming requests are made to log what is being requested
const onListening = ()=> {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe" + addr: "port " + port;
  debug("Listening on " + bind)
}

const port = normalizePort(process.env.PORT || "3000");
app.set('port', port)
const server = http.createServer(app);

// server.on("error", (error)=>{
//   debug.log(error);
// })
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);
