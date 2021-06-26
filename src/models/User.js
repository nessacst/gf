const bcrypt = require('bcrypt');
const { conn } = require('../db');
const saltRounds = 10;



///CRIAR CONTA
async function criar(data) {
  const sql = `
  INSERT INTO
    users ( name, email, password)
  VALUES
    ( ?, ?, ?)
  `;
  const db = await conn();

  const {  name, email, password } = data;

  const hash = await bcrypt.hash(password, saltRounds);

  const { lastID } = await db.run(sql, [ name, email, hash]);

  return lastID;
}

//todos buscar
async function usuariostudo() {
    const sql = `
    SELECT
      *
    FROM
    users
  `;
    const db = await conn();
    const user = await db.all(sql);
    return user;
  }



  //BUSCAR POR ID
  async function readByID(id) {
    const sql = `
      SELECT
        *
      FROM
        users
      WHERE
        users.id = ?
    `;
  
    const db = await conn();
    const userid = await db.get(sql, id);
    return userid;
  }


  //BUSCAR POR EMAIL
  async function readByEmail(email) {
    const sql = `
      SELECT
        *
      FROM
        users
      WHERE
        users.email = ?
    `;
  
    const db = await conn();
  
    const food = await db.get(sql, email);
  
    return food;
  }

module.exports = { criar, usuariostudo,readByEmail, readByID };
