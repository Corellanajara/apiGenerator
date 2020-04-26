const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const Causaschema = new Schema({
datos : Array,
cliente : Array,
carpeta : Array,
usuarios : Array,
nombres : String,
nombrePaterno : String,
nombreMaterno : String,
materia : String,
parte : String,
sucursal : String,
area : String,
usuario : String,
estado : Number,
estadoPago : Number,
materias : Array,
indice : Number,
clienteParte : Array,
contraParte : Array,
hojaRuta : Array,
fechaTermino : Date,
sede : String,
honorarios : Array,
matrizCausasVinculadas : Array,
tipoPago : String,

}, { timestamps: true }
);
Causaschema.virtual('id').get(function () {
return this._id.toHexString();
});
Causaschema.set('toJSON', {
virtuals: true
});

Causaschema.findById = function (cb) {
return this.model('Causas').find({id: this.id}, cb);
};
const Causas = mongoose.model('Causas', Causaschema);
exports.findById = (id) => {
return Causas.findById(id)
.then((result) => {
result = result.toJSON();
delete result._id;
//delete result.__v;
return result;
});
};
exports.createCausas = (CausasData) => {
const causas = new Causas(CausasData);
return causas.save();
};
exports.list = (perPage, page) => {
return new Promise((resolve, reject) => {
Causas.find()
.limit(perPage)
.skip(perPage * page)
.exec(function (err, causas) {
if (err) {
reject(err);
} else {
resolve(causas);
}
})
});
};
exports.patchCausas = (id, CausasData) => {
return new Promise((resolve, reject) => {
Causas.findById(id, function (err, causas) {
if (err) reject(err);

console.log(CausasData);
for (let i in CausasData) {
causas[i] = CausasData[i];
}
causas.save(function (err, updatedCausas) {
if (err) return reject(err);
resolve(updatedCausas);
});
});
})
};
exports.removeById = (CausasId) => {
return new Promise((resolve, reject) => {
Productos.remove({_id: CausasId}, (err) => {
if (err) {
reject(err);
} else {
resolve(err);
}
});
});
};
