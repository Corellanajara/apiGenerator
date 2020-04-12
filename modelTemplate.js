var model = "const mongoose = require('../../common/services/mongoose.service').mongoose;\r\nconst Schema = mongoose.Schema;\r\n\r\nconst Botoneschema = new Schema({\r\nCAMPOS\r\n}, { timestamps: true }\r\n);\r\nBotoneschema.virtual('id').get(function () {\r\nreturn this._id.toHexString();\r\n});\r\nBotoneschema.set('toJSON', {\r\nvirtuals: true\r\n});\r\n\r\nBotoneschema.findById = function (cb) {\r\nreturn this.model('Botones').find({id: this.id}, cb);\r\n};\r\nconst Botones = mongoose.model('Botones', Botoneschema);\r\nexports.findById = (id) => {\r\nreturn Botones.findById(id)\r\n.then((result) => {\r\nresult = result.toJSON();\r\ndelete result._id;\r\ndelete result.__v;\r\nreturn result;\r\n});\r\n};\r\nexports.createBotones = (BotonesData) => {\r\nconst botones = new Botones(BotonesData);\r\nreturn botones.save();\r\n};\r\nexports.list = (perPage, page) => {\r\nreturn new Promise((resolve, reject) => {\r\nBotones.find()\r\n.limit(perPage)\r\n.skip(perPage * page)\r\n.exec(function (err, botones) {\r\nif (err) {\r\nreject(err);\r\n} else {\r\nresolve(botones);\r\n}\r\n})\r\n});\r\n};\r\nexports.patchBotones = (id, BotonesData) => {\r\nreturn new Promise((resolve, reject) => {\r\nBotones.findById(id, function (err, botones) {\r\nif (err) reject(err);\r\n\r\nconsole.log(BotonesData);\r\nfor (let i in BotonesData) {\r\nbotones[i] = BotonesData[i];\r\n}\r\nbotones.save(function (err, updatedBotones) {\r\nif (err) return reject(err);\r\nresolve(updatedBotones);\r\n});\r\n});\r\n})\r\n};\r\nexports.removeById = (BotonesId) => {\r\nreturn new Promise((resolve, reject) => {\r\nProductos.remove({_id: BotonesId}, (err) => {\r\nif (err) {\r\nreject(err);\r\n} else {\r\nresolve(err);\r\n}\r\n});\r\n});\r\n};";

module.exports = {
  get: function () {
    return model;
  },
  set: function (palabra,campos) {
    console.log(palabra);
    console.log(campos)
    return respuesta = new Promise((resolve, reject) => {
      while(model.includes("botones") || model.includes("Botones")){
        model = model.replace("botones",palabra);;
        model = model.replace("Botones",palabra.replace(palabra[0],palabra[0].toUpperCase()));
        if(!model.includes("botones") && !model.includes("Botones")){
          var modeloCompleto = "";
          for(var tupla of campos){
            console.log(tupla);
            modeloCompleto += ""+Object.keys(tupla)+" : "+Object.values(tupla)+",\r\n"
          }
          model = model.replace("CAMPOS",modeloCompleto)
          resolve(model);
        }
      }
    })

  }
};
