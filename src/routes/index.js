const express = require('express');
const router = express.Router();
const multer = require('multer');
const GifhyController = require('../controllers/GifhyController');
const usersController = require("../controllers/usersController");
const authController = require("../controllers/authController");
const Auth = require("../middleware/auth");

const parser = multer( { 
   storage: multer.diskStorage({
   destination: 'public/imgs',
   filename(req, file, callback) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    callback(null, file.fieldname + '-' + Date.now()+ '.' +extension)
    }
  })
})


//HOME
router.get('/', (req, res) => res.redirect('/index'));
//INDEX
router.get('/index\/', Auth.isAuthenticated, GifhyController.index);

//ENVIO DE GIFS (abordagem via post)
router.get('/cadastrar\/', Auth.isAuthenticated, GifhyController.cadastrar);
router.post('/cadastrar/action',  parser.single("image"), GifhyController.cadastrargifs);

//USUARIOS
router.get('/signup\/',  usersController.index);
router.post('/signup\/', usersController.save);

//BUSCAR
router.get('/buscar\/', Auth.isAuthenticated, GifhyController.buscar);

//PAGINA PARA EXIBIR O GIF
router.get('/gifs/:id\/',  GifhyController.listusgifs);

//CATEGORIAS
router.get('/categorias\/',  GifhyController.categoriasID);
router.get('/categorias/:id/:nome\/',  GifhyController.categoriasID);

//PERFIL
router.get('/mygifs\/',  GifhyController.meusGifs);

//API MYGIFS EDITAR E APAGAR (abordagem via api)
router.delete('/apigif/:id', Auth.isAuthenticated, GifhyController.destroy);
router.put('/apigif/:id', Auth.isAuthenticated,parser.single('image'), GifhyController.update);

// LOGIN E SAIR
router.get("/signin\/", authController.create);
router.post("/signin\/", authController.signin);
router.get("/logout\/", Auth.isAuthenticated, authController.signout);

module.exports = router;
