const { conn: conexao } = require("../db");


//CADASTRO DE gifs
async function cadastrar(data) {
  const sql = `
  INSERT INTO
  gifs (name, image, autor, categoria, chave)
  VALUES
    (?, ?, ?, ?, ?)
  `;

  const db = await conexao();
  const { name, image, autor, categoria, chave } = data;
  const { lastID } = await db.run(sql, [name, image, autor, categoria, chave]);
  return lastID;
}

///UPDATE
async function update(id, data) {
  const sql = `
    UPDATE
      gifs
    SET
      name = ? , image = ?,  categoria = ?
    WHERE
      id = ?
  `;
  const db = await conexao();
  const { name, image, categoria } = data;
  const { changes } = await db.run(sql, [name, image, categoria, id]);
  return changes;
}


///APAGAR
async function destroy(id, chave) {
    const sql = `
    DELETE FROM
      gifs
    WHERE
      id = ?
    AND chave = ?
  `;
  const db = await conexao();
  const lastID = await db.get(sql, id, chave);
  return lastID; 
  
}


//VERIFICA CHAVE
  async function chaveok(id, chave) {  
    const sql = `
      SELECT
        *
      FROM
        gifs
      WHERE
        gifs.id = ?
      AND
        gifs.chave = ?  
    `;

    const db = await conexao();
    const getchave = await db.get(sql, id, chave);
    return getchave;
  }



//HOME GIFS
async function homegifs() {
  const sql = `
  SELECT
  gifs.id, gifs.name, gifs.image, gifs.categoria, gifs.autor, gifs.chave, categorias.name as cat
  FROM
    categorias INNER JOIN gifs
  WHERE
    categorias.id = gifs.categoria
  ORDER BY RANDOM () 
  LIMIT 5 
     
`;
  const db = await conexao();
  const gifs = await db.all(sql);
  return gifs;
}



//BUSCAR TODOS GIS
async function todosgifs() {
  const sql = `
  SELECT
  gifs.id, gifs.name, gifs.image, gifs.categoria, gifs.autor, gifs.chave, categorias.name as cat
  FROM
    categorias INNER JOIN gifs
  WHERE
    categorias.id = gifs.categoria
  ORDER BY RANDOM ()  
     
`;
  const db = await conexao();
  const gifs = await db.all(sql);
  return gifs;
}




//BUSCAR POR id
async function BuscaID(param) {
const sql = `
   SELECT
   gifs.id, gifs.name, gifs.image, gifs.categoria, gifs.autor, gifs.chave, categorias.name as cat
   FROM
     categorias INNER JOIN gifs
   WHERE
     categorias.id = gifs.categoria
   AND
     gifs.id LIKE ?  
 `;
 //const sql = 'SELECT * FROM gifs where id LIKE ?';
 const db = await conexao();
 const gifs = await db.all(sql, param);
 return gifs; 
 }



//BUSCAR POR CHAVE DE USUARIO
 async function BuscaChave(param) {
  const sql = `
     SELECT
     gifs.id, gifs.name, gifs.image, gifs.categoria, gifs.autor, gifs.chave, categorias.name as cat
     FROM
       categorias INNER JOIN gifs
     WHERE
       categorias.id = gifs.categoria
     AND
       gifs.chave LIKE ?
     ORDER BY gifs.id DESC  
   `;
   const db = await conexao();
   const gifs = await db.all(sql, param);
   return gifs; 
   }



//BUSCAR POR TITULO
async function BuscaAll(param) {
  const sql = `
  SELECT
  gifs.id, gifs.name, gifs.image, gifs.categoria, gifs.autor, gifs.chave, categorias.name as cat
  FROM
    categorias INNER JOIN gifs
  WHERE
    categorias.id = gifs.categoria
  AND
    gifs.name LIKE ?  
  `;
const db = await conexao();
const gifs = await db.all(sql, '%'+param+'%');
return gifs; 
}



//BUSCAR POR ID DE CATEGORIA
async function BuscaPorCat(param) {
  const sql = `
     SELECT
     gifs.id, gifs.name, gifs.image, gifs.categoria, gifs.autor, gifs.chave, categorias.name as cat
     FROM
       categorias INNER JOIN gifs
     WHERE
       categorias.id = gifs.categoria
     AND
       gifs.categoria LIKE ?  
     ORDER BY RANDOM ()   
   `;
   const db = await conexao();
   const gifscat = await db.all(sql, param);
   return gifscat; 
   }





module.exports = { cadastrar, todosgifs,  homegifs, BuscaAll, chaveok, BuscaID, BuscaPorCat, BuscaChave, update, destroy };
