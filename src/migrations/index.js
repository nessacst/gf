const { conn } = require("../db");

async function up() {
  const db = await conn();

await db.run(sql = `
  CREATE TABLE IF NOT EXISTS gifs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    image TEXT,
    autor TEXT,
    categoria TEXT,
    chave TEXT
  )
`);


await db.run(sql = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT
 
  )
`);


await db.run(sql = `
CREATE TABLE IF NOT EXISTS categorias (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT
)
`);


}


async function down() {

  const db = await conn();
  await db.run('DROP TABLE gifs');
  await db.run('DROP TABLE users');
  await db.run('DROP TABLE categorias');

}

module.exports = { up, down };
