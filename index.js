const fs = require("fs");
const http = require("http");
const readline = require("readline");

const PORT = 3000;

const createServer = (registrationPageFilePath) => {
  http
    .createServer(function (request, response) {
      let url = request.url;
      response.writeHeader(200, { "Content-Type": "text/html" });
      let stream;
      switch (url) {
        case "/project":
          stream = fs.createReadStream("pages/project.html");
          break;
        case "/registration":
          stream = fs.createReadStream(registrationPageFilePath);
          break;
        default:
          stream = fs.createReadStream("pages/home.html");
          break;
      }
      stream.pipe(response);
    })
    .listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}/`);
    });
};

const lineDetail = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

lineDetail.question(
  "Enter full file path to the registration page (pages/registration.html): ",
  (path) => {
    lineDetail.close();
    path = path.length === 0 ? "pages/registration.html" : path;
    createServer(path);
  }
);
