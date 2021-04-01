const client = require("../data");

exports.getToken = async (tokenId) => {
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

exports.setToken = async (address, tokenId) => {
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

exports.updateToken = async (tokenId, address) => {
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

exports.getTokensByAddress = async (address) => {
  let query = {
    text: "SELECT * FROM tokens WHERE address = $1",
    values: [address],
  }
  try {
    let res = await client.query(query);
    return res.rows;
  } catch {
    return false;
  }
}