const express = require("express");
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/home.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname + "/About.html"));
});

app.get("/activities", (req, res) => {
  res.sendFile(path.join(__dirname + "/Activities.html"));
});

app.get("/modules", (req, res) => {
  res.sendFile(path.join(__dirname + "/Modules.html"));
});

app.get("/registration", (req, res) => {
  res.sendFile(path.join(__dirname + "/Registration.html"));
});

app.get("/info", (req, res) => {
  res.sendFile(path.join(__dirname + "/info.html"));
});


const server = app.listen(process.env.PORT||3000);
const portNumber = server.address().port;
console.log(`port: ${portNumber}`);
// can see the port number in terminal - you can dictate the port number
