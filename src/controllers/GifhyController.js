const Gifhy = require("../models/Gifs");
const Categorias = require("../models/Categorias");
const User = require("../models/User");

//INDEX
const index = async (req, res) => {
  const gifs = await Gifhy.todosgifs();
  res.render("gifhy/index.njk", { gifs });
};


//TELA CADASTAR
const cadastrar = async (req, res) => {
  const categorias = await Categorias.readAll();
  res.render("gifhy/cadastro.njk", { categorias });
};


//CADASTRAR GIFS
const cadastrargifs = async (req, res) => {
  const { name, autor, categoria, chave } = req.body;
  const image = req.file
  ? `/imgs/${req.file.filename}`
  : '/imgs/gifplace.gif';
  const newGifs = { name, image, autor, categoria, chave };
  const foodId = await Gifhy.cadastrar(newGifs);
  console.log(foodId);

  res.redirect("/mygifs");
};


//MEUS GIFS - PERFIL
  const meusGifs = async (req, res) => {
    const categorias = await Categorias.readAll();
    const resultado = await Gifhy.BuscaChave(req.session.userIdok);
    res.render("gifhy/mygifs.njk", { resultado, categorias});
  };
  

//ATTUALIZAR  GIFS
const update = async (req, res) => {
  var id = req.params.id;
  var chave = req.session.userIdok;
  const chaveok = await Gifhy.chaveok(id, chave);
  if (chaveok) {
  const { name, image_path, categoria } = req.body;
  const image = req.file ? `/imgs/${req.file.filename}` : image_path;
  const updateGifs = { name, image, categoria };
  await Gifhy.update(id, updateGifs);
  const gifs = await Gifhy.BuscaID(id);
  res.json(gifs);
  console.log("Atualizado Sucesso!");
} else {
  res.status(204).send();
  console.log("Sem permissão!");
}
};


//APAGAR GIFS
const destroy = async (req, res) => {
  var parasm = req.params.id;
  var chave = req.session.userIdok;
  const chaveok = await Gifhy.chaveok(parasm, chave);
 if (chaveok) {
    await Gifhy.destroy(parasm, chave);
    res.status(204).send();
    console.log("Excluido com Sucesso!");
  } else {
    res.status(204).send();
    console.log("Sem permissão!");
  }
}

//TELA BUSCAR
const buscar = async (req, res) => {
  var paramdeBuscar = req.query.query;
  const resultado = await Gifhy.BuscaAll(paramdeBuscar);
  res.render("gifhy/buscar.njk", { resultado, paramdeBuscar});
};


  //TELA EXIBIR GIFS
  const listusgifs = async (req, res) => {
    var parasm = req.params.id;
    const resultado = await Gifhy.BuscaID(parasm);
    res.render("gifhy/gifs.njk", { resultado, parasm});
  };
  

//CATEGORIAS POR ID
const categoriasID = async (req, res) => {
  var parasm = req.params.id;
  var nomepar = req.params.nome;
  const cate = await Categorias.readAll();
  //VARIAÇÃO ENTRE AS CATEGORIAS OU GERAL
  if(parasm == null) {
    //GERAL TODOS OS GIFS
    const gifs = await Gifhy.todosgifs();
    res.render("gifhy/categorias.njk", { gifs, cate, parasm });
  } else {
    // POR CATEGORIA ID
    const gifs = await Gifhy.BuscaPorCat(parasm);
    res.render("gifhy/categorias.njk", { gifs, parasm, nomepar});
  }
};


module.exports = { index, cadastrar, cadastrargifs, buscar, listusgifs, categoriasID, meusGifs, update, destroy };
