const User = require('../models/User');
const mailSend = require('./mailController'); 


//TELA 
const index = async (req, res) => {
  res.render("gifhy/criar.njk");
};


 //CADASTRO 
const save = async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = { name, email, password };

  try {

    await User.criar(newUser);
    await mailSend.sendCreateUser(email);
    
    res.redirect('/');
  } catch (err) {
    if (String(err).includes('UNIQUE constraint failed')) {
      res.render('gifhy/criar.njk', {
        error: 'E-mail já cadastrado',
        newUser,
      });
    }
  }
};

module.exports = { index, save };
