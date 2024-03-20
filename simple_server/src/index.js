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
  res.end(`Hello ${req.socket.remoteAddress} [socket] / ${req.headers["x-forwarded-for"]} [x-forwarded-for] from ${process.env.SERVERNAME} -> url: ${req.url}`);
});

server.listen(port, hostname, () => {
  console.log(`Server **${process.env.SERVERNAME}** running at http://${hostname}:${port}/`); // Log a message to the console when the server starts running
});