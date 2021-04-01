const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const icons = require("./icons");

const data = [];

const client = require("./data");

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

const getToken = async (tokenId) => {
  let query = {
    text: "SELECT * FROM tokens WHERE tokenId = $1",
    values: [tokenId],
  }
  try {
    let res = await client.query(query);
    return res.rows;
  } catch {
    return false;
  }
}

const setToken = async (address, tokenId) => {
  let query = {
    text: "INSERT INTO tokens(address, tokenId, updatedAt) VALUES($1, $2, $3)",
    values: [address, tokenId, "NOW()"],
  }
  try {
    await client.query(query);
    return true;
  } catch {
    return false;
  }
}

const updateToken = async (tokenId, address) => {
  let query = {
    text: "UPDATE tokens SET address = $1, updatedAt = $2 WHERE tokenId = $3",
    values: [address, "NOW()", tokenId],
  }
  try {
    await client.query(query);
    return true;
  } catch {
    return false;
  }
}

let port = process.env.PORT || 5000; 
app.listen(port, () => console.log(`listening on ${port}`));