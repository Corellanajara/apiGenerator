const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirer = require('inquirer');
var fsPath = require('fs-path');
var ruta = require("./ruteTemplate");
var models = require("./modelTemplate");
var controler = require("./controlerTemplate");
var flag = false;
clear();

console.log(
  chalk.yellow(
    figlet.textSync('generapp', { horizontalLayout: 'full' })
  )
);

console.log('Hola, bienvenido a generapp, generemos un modelo (yo me encargo de las rutas crud y del controlador basico)');
var nombreModelo = "";
var respuestas = [];
var modelo = []
var campos = [];
inquirer
  .prompt([
    {
      type: 'input',
      name: 'objeto',
      message: 'Nombre de la entidad',
    },
    {
      type: 'confirm',
      name: 'timestamps',
      message: 'Quieres que tenga timestamps?',
      default: true
    }

  ])
  .then(answers => {
    nombreModelo = answers['objeto'];
    modelo[answers['objeto']] = {"timestamps":answers['timestamps']}
    console.log(modelo);
    verPreguntas()
  })
  .catch(error => {
    if(error.isTtyError) {
      console.log(error);
    } else {
      console.log(error);
    }
  });

function verPreguntas(){


  var data = require('inquirer');
  data
    .prompt([
      {
        type: 'input',
        name: 'nombre',
        message: "Nombre del campo (Vacio para no agregar más)"
      },{
        type: 'list',
        name: 'tipo',
        message: 'Tipo de dato',
        choices: [
          "String",
          "Number",
          "Date",
          "Boolean",
          "Buffer",
          "ObjectId",
          "Mixed",
          "Array"]
      },
    ])
    .then(answers => {
      console.log(answers);
      if(!answers['nombre']){
        console.log("GENERANDO!");
        console.log(modelo);
        console.log(campos);
        var dir = './'+nombreModelo;
        ruta.set(nombreModelo).then(data=>{
          fsPath.writeFile(dir+"/routes.config.js", data, function(err){
            if(err) {
              throw err;
            } else {
              console.log('Generado el archivo de rutas');
            }
          });
        })
        models.set(nombreModelo,campos).then(data=>{
          fsPath.writeFile(dir+"/models/"+nombreModelo+".model.js", data, function(err){
            if(err) {
              throw err;
            } else {
              console.log('Generado el archivo de modelo');
            }
          });
        });
        controler.set(nombreModelo).then(data=>{
          console.log("dentro de controler then");
          fsPath.writeFile(dir+"/controllers/"+nombreModelo+".controller.js", data, function(err){
            if(err) {
              throw err;
            } else {
              console.log('Generado el archivo de controlador');
            }
          });
        })
        fsPath.pathExists(file, (err, exists) => {
          console.log(err) // => null
          if(!exists){
            fs.copy('./lib/', './', err => {
              if (err) return console.error(err)
              console.log('generado common y authorization');
            })
          }
        })


      }else{
          var tupla = {}
          tupla[answers['nombre']] = answers['tipo'];
          campos.push(tupla)
          verPreguntas();
      }

    })
    .catch(error => {
      if(error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else when wrong
      }
    });

}
