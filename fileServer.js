const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const fs   = require('fs');
const app = express();
var serverport = 8050;
// necesarios
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Activar CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.post('/subidas',(req, res) => {
  if(!req.body) {
      return res.status(400).send({
          message: "No puede estar vacio"
      });
  }
  let archivo = req.files.file;
  let path = process.cwd()+'/files/'+req.body.id;+'/';
  fs.mkdir(path, { recursive: true }, (err,success) => {
    if (err) throw err;
    console.log(success);
    archivo.mv(path+"/"+req.body.name, function(err) {
      if (err)
        return res.status(500).send(err);
      console.log(path+"/"+archivo.name);
      res.send({message: archivo.name });
    });
  });
});



app.get('/', (req, res) => {
    res.json({"message": "Api de archivos"});
});

app.listen(serverport, () => {
    console.log("Escuchando al puerto "+serverport);
});
