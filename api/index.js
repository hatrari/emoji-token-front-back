const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const icons = require("./icons");

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

app.get("/icons/:id", (req, res) => {
  let id = req.params.id;
  res.send(icons[id - 1]);
});

const { getToken, updateToken, setToken, getTokensByAddress } = require("./tokens");

app.post("/tokens", async (req, res) => {
  let {address, tokenId} = req.body;
  if(tokenId === undefined || tokenId < 1) {
    res.status(400).json({message: "Bad Request."});
    return;
  }
  let token = await getToken(tokenId);
  if(token && token.length > 0) {
    res.status(409).json({message: "Conflict."});
  } else {
    let insert = await setToken(address, tokenId);
    if(insert) {
      res.status(201).json({message: "Created."});
    } else {
      res.status(500).json({message: "Internal Server Error."});
    }
  }
});

app.post("/tokens/:tokenId", async (req, res) => {
  let tokenId = req.params.tokenId;
  let {address} = req.body;
  let token = await getToken(tokenId);
  if(!token) {
    res.status(404).json({message: "Not Found."});
  } else {
    let update = await updateToken(tokenId, address);
    if(update) {
      res.status(204).json({message: "No Content."});
    } else {
      res.status(500).json({message: "Internal Server Error."});
    }
  }
});

app.get("/tokens/:tokenId", async (req, res) => {
  let tokenId = req.params.tokenId;
  let token = await getToken(tokenId);
  if(token) {
    res.status(200).json(token[0]);
  } else {
    res.status(500).json({message: "Internal Server Error."});
  }
});

app.get("/tokens/address/:address", async (req, res) => {
  let address = req.params.address;
  let tokens = await getTokensByAddress(address);
  if(tokens) {
    res.status(200).json(tokens);
  } else {
    res.status(500).json({message: "Internal Server Error."});
  }
});

let port = process.env.PORT || 5000; 
app.listen(port, () => console.log(`listening on ${port}`));