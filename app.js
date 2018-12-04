const express = require("express");
const app = express();
const hbs = require("hbs");
const morgan = require("morgan");
const fs = require("fs");

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public"));
// app.use(morgan("combined"));

app.use((req, res, next) => {
  date = new Date().toString();
  const log = `${date}:, ${req.method}, ${req.url}`;
  console.log(log);
  fs.appendFile("server.log", log + "\n", err => {
    if (err) {
      console.log("Connection failed");
      return;
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render("maintainance.hbs");
// });

hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

hbs.registerHelper("screamIt", text => {
  return text.toUpperCase();
});

app.get("/", (req, res) => {
  console.log("Root Route.");
  res.render("home.hbs", {
    pageTitle: "WELCOME",
    welcomeMessage: "Welcome to my website"
  });
});

app.get("/about", (req, res) => {
  console.log("About Route");
  res.render("about.hbs", {
    pageTitle: "About Page"
  });
});

var PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server Started at port:", PORT);
});
