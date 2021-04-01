const { Client } = require('pg');

const client = new Client({
  user: 'snpaihrdggikku',
  host: 'ec2-54-161-239-198.compute-1.amazonaws.com',
  database: 'db3um1ghfks4qp',
  password: '5c539eee8917e8930c025daf881028ea5dcac22d4cf1e3d87b6cedaea3d84503',
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

// const query = {
//   text: 'INSERT INTO tokens(address, tokenId, updatedAt) VALUES($1, $2, $3)',
//   values: ['aaaaa', '1', 'NOW()'],
// }

// const query = {
//   text: `CREATE TABLE tokens (
//     id SERIAL PRIMARY KEY,
//     address VARCHAR NOT NULL,
//     tokenId INTEGER,
//     updatedAt DATE
//   );`
// }

// const query = {
//   text: `CREATE TABLE tokens (
//     id SERIAL PRIMARY KEY,
//     address VARCHAR NOT NULL,
//     tokenId INTEGER,
//     updatedAt DATE
//   );`
// }

// const query = {
//   text: 'truncate table tokens'
// }

// client
//   .query(query)
//   .then(res => console.log(res))
//   .catch(e => console.error(e.stack))

module.exports = client;