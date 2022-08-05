const fs = require("fs");
const http = require("http");
const readline = require("readline");

const createServer = (filePath) => {
  // The file is loaded into the memory from beginning to end and then processed i.e. the callback is executed after loading
  // This will return a response to the client after a delay when the file is large
  const fetchFileData = (req, res) => {
    fs.readFile(filePath, (err, data) => {
      res.end(data);
    });
  };

  // Streams in Node.js core
  // Streams allow to process data as soon as some bits are fetched
  const fetchFileDataUsingStream = (req, res) => {
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  };

  const server = http.createServer(fetchFileDataUsingStream);
  server.listen(3000);
};

const lineDetail = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

lineDetail.question("Please provide the full file path - ", (path) => {
  lineDetail.close();
  createServer(path);
});
