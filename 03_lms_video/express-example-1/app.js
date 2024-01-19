import express from "express";

const app = express(); // app - веб сервер

app.get("/", (req, res) => {
  res.send("<h1>Home page</h1>");
});
app.get("/contacts", (req, res) => {
  console.log(req.url);
  console.log(req.method);
  res.send("<h2>Contacts page</h2>");
});

app.listen(3003, () => {
  console.log("Server is running");
});
