const http = require("http");
const hostname = "0.0.0.0";
const port = 3000;

/*
When using express with Node.js:

If you set `app.set("trust proxy", true)`, req.ip will return the real IP address even if behind proxy.
*/

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end(`Hello ${req.socket.remoteAddress} [socket] / ${req.headers["x-forwarded-for"]} [x-forwarded-for] from ${process.env.SERVERNAME}`);
});

server.listen(port, hostname, () => {
  console.log(`Server ${process.env.SERVERNAME} running at http://${hostname}:${port}/`); // Log a message to the console when the server starts running
});

process.stdin.on("data", (data) => {
  console.log(`${process.env.SERVERNAME} -> Command: ${data.toString().toLocaleLowerCase()}`);

  if(data.toString().trim().toLowerCase() == "on") {
    console.log(`${process.env.SERVERNAME} opened`);
    server.listen(port, hostname);
  }

  if(data.toString().trim().toLowerCase() == "off") {
    console.log(`${process.env.SERVERNAME} closed`);
    server.close();
  }

  if(data.toString().trim().toLowerCase() == "exit") {
    console.log("Exiting...");
    process.exit();
  }
});
