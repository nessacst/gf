const Gifhy = require("../models/Gifs");
const User = require('../models/User');
const Category = require('../models/Categorias');
const fs = require('fs');
const path = require('path');

async function up() {

  const content = fs.readFileSync(path.join(__dirname, 'dados.json'));
  const data = JSON.parse(content);

   for (const gifs of data.gifs) {
    Gifhy.cadastrar(gifs);
  }

  for (const user of data.users) {
    User.criar(user);
  }
  for (const categorias of data.categorias) {
    Category.create(categorias);
  }
}

module.exports = { up };
