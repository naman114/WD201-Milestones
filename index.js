const fs = require("fs");

fs.writeFile(
  "sample.txt",
  "Hello World. Welcome to Node.js File System module.",
  function (err) {
    if (err) throw err;
    console.log("File created!");
  }
);

fs.readFile("sample.txt", function (err, data) {
  if (err) throw err;
  console.log(data.toString());
});

fs.appendFile("sample.txt", " This is my updated content", function (err) {
  if (err) throw err;
  console.log("File updated!");
});

fs.rename("sample.txt", "test.txt", function (err) {
  if (err) throw err;
  console.log("File name updated!");
});

// Deleting files
fs.unlink("test.txt", function (err) {
  if (err) throw err;
  console.log("File test.txt deleted successfully!");
});
