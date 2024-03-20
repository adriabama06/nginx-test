const http = require("http");
const fs = require("fs");
const { inspect } = require("util");
const hostname = "0.0.0.0";
const port = 3000;

/*
When using express with Node.js:

If you set `app.set("trust proxy", true)`, req.ip will return the real IP address even if behind proxy.
*/

const server = http.createServer((req, res) => {
  switch (req.url) {
    case "/photo":
    case "/photo.jpg":
      try
      {
        const data = fs.readFileSync("./photo.jpg", { encoding: "binary" });
        res.statusCode = 200;
        res.setHeader("Content-Type", "image/jpeg");
        setTimeout(() => { // Simulate latency
          res.end(data, "binary");
        }, 700);
      }
      catch (err)
      {
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/plain");
        res.write(inspect(req.headers, { depth: null }));
        res.write("\n");
        res.end(err.toString());
      }
      break;
    
    default:
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.write(inspect(req.headers, { depth: null }));
      res.write("\n");
      res.end(`Hello ${req.socket.remoteAddress} [socket] / ${req.headers["x-forwarded-for"]} [x-forwarded-for] from ${process.env.SERVERNAME}`);
      break;
  }
});

server.listen(port, hostname, () => {
  console.log(`Server **${process.env.SERVERNAME}** running at http://${hostname}:${port}/`); // Log a message to the console when the server starts running
});