var express = require('express');
var router = express.Router();
const sequelize = require('../models/index');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/credits', function(req, res, next) {
    res.render('credits', { title: 'Express' });
});

router.get('/quizzes', function(req, res, next) {

    sequelize.models.quiz.findAll()  //busca todos los quizzes
        .then(quizzes => {
        res.render('quizzes', {quizzes}); //renderiza la vista ejs de la página de créditos
})
.catch(error =>{
        next(error);
});
});

module.exports = router;