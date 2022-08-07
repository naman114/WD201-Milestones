const fs = require("fs");
const http = require("http");
const readline = require("readline");

const PORT = 3000;

const createServer = (registrationPageFilePath) => {
  let homeContent = "";
  let projectContent = "";
  let registrationContent = "";

  fs.readFile("pages/home.html", function (err, home) {
    if (err) throw err;
    homeContent = home;
  });

  fs.readFile("pages/project.html", function (err, project) {
    if (err) throw err;
    projectContent = project;
  });

  fs.readFile(registrationPageFilePath, function (err, registration) {
    if (err) throw err;
    registrationContent = registration;
  });

  http
    .createServer(function (request, response) {
      let url = request.url;
      response.writeHeader(200, { "Content-Type": "text/html" });
      switch (url) {
        case "/project":
          response.write(projectContent);
          response.end();
          break;
        case "/registration":
          response.write(registrationContent);
          response.end();
          break;
        default:
          response.write(homeContent);
          response.end();
          break;
      }
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
