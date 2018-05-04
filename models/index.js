
//Modelo con BBDD
//Carga el módulo Sequelize
const  Sequelize= require('sequelize');
//Creo una instancia de sequelize para acceder a una instancia que esta en el fichero y este es el protocolo para acceder a ella
const sequelize = new Sequelize("sqlite:quizzes.sqlite", // Para que no me salgan trazas
    {logging: false});
//Defino un modelo o tipo de datos que es el quizz que tiene la pregunta y la respuesta ambos son string, diciendo que es una pregunta y otro es una respuesta!! NO PERMETIMOS QUE SE CREEEN PREGUNTAS VACÍAS, COMPROBAMOS QUE LA respuesta NO PUEDE ESTAR VACÍA. No esta asignado a ninguna variable porque cada vez qye defino un modelo, dentro de sequelize se crea un modelo con todas las preguntas y respuestas. Una vez que ha terminado la sequelizacion que es una promesa se ejecuta el then

sequelize.define('quiz', {		//Defino el quiz, que es un modelo de datos
    question: {
        type: Sequelize.STRING,
        unique: {msg: "Ya no existe esta pregunta"}, //Cada pregunta es unica, si se repite me sale ese mensaje
        validate: {notEmpty: {msg: "La pregunta no puede estar vacía"}} //Validación adicional
    },
    answer: {
        type: Sequelize.STRING,
        validate: {notEmpty: {msg: "La respuesta no puede estar vacía"}}
    }
});
//dentro de sequelize accede al modelo quiz y cuenta cuantos hay, una promesa que tarda un rato. EN caso de 0 creo varios quizzes
sequelize.sync()
    .then(() => sequelize.models.quiz.count())	//Cuenta cuantos quizzes hay y lo pasaremos luego como parámetro en el then
.then(count => {
    if (!count) { //Si hay cero quizzes necesito crear mas por tanto
    return sequelize.models.quiz.bulkCreate([
        { question: "Capital de Italia", answer: "Roma" },
        { question: "Capital de Francia", answer: "París" },
        { question: "Capital de España", answer: "Madrid" },
        { question: "Capital de Portugal", answer: "Lisboa" }
    ]);
}
})
.catch(error => {
    console.log(error);
});
//exporto el sequelize
module.exports = sequelize;
//Para crear nuevos quizzes apartir de ahora lo hacemos a través del objeto sequelize.
//Instalar paquetes para el sequlize