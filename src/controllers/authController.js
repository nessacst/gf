const bcrypt = require('bcrypt');
const User = require('../models/User');
const Gifhy = require("../models/Gifs");

const create = async (req, res) => {
  const resultado = await Gifhy.homegifs();
  res.render('gifhy/entrar.njk', { resultado });
};

async function signin(req, res) {
  const { email, password } = req.body;
  const resultado = await Gifhy.homegifs();
  const user = await User.readByEmail(email);

  const match = user
    ? await bcrypt.compare(password, user.password)
    : undefined;

  if (user && match) {
    req.session.isAuth = true;
    req.session.userId = user.id;
    req.session.name = user.name;
    req.session.userIdok = user.id;
    res.redirect('/');
  } else {
    
    res.render('gifhy/entrar.njk', {
      error: 'Email ou Senha inválido',
      login: { email, password },
      resultado
    });
  }
}

function signout(req, res) {
  req.session.destroy();
  res.redirect('/signin');
}

module.exports = { create, signin, signout };
