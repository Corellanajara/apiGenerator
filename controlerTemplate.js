var controler = "const BotonesModel = require('../models/botones.model');\r\nconst crypto = require('crypto');\r\nexports.insert = (req, res) => {\r\nBotonesModel.createBotones(req.body)\r\n.then((result) => {\r\nres.status(201).send({id: result._id});\r\n});\r\n};exports.list = (req, res) => {\r\nlet limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;\r\nlet page = 0;\r\nif (req.query) {\r\nif (req.query.page) {\r\nreq.query.page = parseInt(req.query.page);\r\npage = Number.isInteger(req.query.page) ? req.query.page : 0;\r\n}\r\n}\r\nBotonesModel.list(limit, page)\r\n.then((result) => {\r\nres.status(200).send(result);\r\n})\r\n};\r\nexports.getById = (req, res) => {\r\nBotonesModel.findById(req.params.botonesId)\r\n.then((result) => {\r\nres.status(200).send(result);\r\n});\r\n};\r\nexports.patchById = (req, res) => {\r\nBotonesModel.patchBotones(req.params.botonesId, req.body)\r\n.then((result) => {\r\nres.status(204).send({});\r\n});\r\n};\r\nexports.removeById = (req, res) => {\r\nBotonesModel.removeById(req.params.botonesId)\r\n.then((result)=>{\r\nres.status(204).send({});\r\n});\r\n};";

module.exports = {
  get: function () {
    return controller;
  },
  set: function (palabra) {
    console.log(palabra);
    return respuesta = new Promise((resolve, reject) => {
      while(controler.includes("botones") || controler.includes("Botones")){
        controler = controler.replace("botones",palabra);
        controler = controler.replace("Botones",palabra.replace(palabra[0],palabra[0].toUpperCase()));
        if(!controler.includes("botones") && !controler.includes("Botones")){
          console.log("resolviendo");
          resolve(controler);
        }
      }
    })
  }
};
