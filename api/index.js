const express = require("express");

const app = express();

const icons = ["😀", "😃", "😄", "😁", "😆", "😅",
              "🤣", "😂", "🙂", "🙃", "😉", "😊", "😇"];

const data = [];

app.get("/random", (req, res) => {
  if(icons.length === 0) {
    res.send("No icons.");
  } else {
    const random = Math.floor(Math.random() * icons.length);
    let icon = icons[random];
    icons.splice(random, 1);
    data.push(icon);
    res.send(icon);
  }
});

app.get("/icon/:id", (req, res) => {
  let id = req.params.id;
  res.send(data[id - 1]);
});

app.listen(3333, () => console.log("listening..."));