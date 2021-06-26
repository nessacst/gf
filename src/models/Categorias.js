const { conn: conexao } = require("../db");

async function create(data) {
  const sql = 'INSERT INTO categorias (id, name) VALUES (?, ?)';
  const db = await conexao();
  const { id, name } = data;
  const { lastID } = await db.run(sql, [id, name]);
  return lastID;
}

async function readAll() {
  const sql = `
    SELECT
      *
    FROM
      categorias
  `;

  const db = await conexao();
  const foods = await db.all(sql);
  return foods;
}

module.exports = { create, readAll };