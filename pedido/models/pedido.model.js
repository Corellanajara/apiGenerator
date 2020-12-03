const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const Pedidochema = new Schema({
    atributo1: String,
    nombre: String,
    productos: Array,

}, {
    timestamps: true
});
Pedidochema.virtual('id').get(function() {
    return this._id.toHexString();
});
Pedidochema.set('toJSON', {
    virtuals: true
});

Pedidochema.findById = function(cb) {
    return this.model('Pedido').find({
        id: this.id
    }, cb);
};
const Pedido = mongoose.model('Pedido', Pedidochema);
exports.findById = (id) => {
    return Pedido.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};
exports.createPedido = (PedidoData) => {
    const pedido = new Pedido(PedidoData);
    return pedido.save();
};
exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Pedido.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function(err, pedido) {
                if (err) {
                    reject(err);
                } else {
                    resolve(pedido);
                }
            })
    });
};
exports.patchPedido = (id, PedidoData) => {
    return new Promise((resolve, reject) => {
        Pedido.findById(id, function(err, pedido) {
            if (err) reject(err);

            console.log(PedidoData);
            for (let i in PedidoData) {
                pedido[i] = PedidoData[i];
            }
            pedido.save(function(err, updatedPedido) {
                if (err) return reject(err);
                resolve(updatedPedido);
            });
        });
    })
};
exports.findByDates = (date1,date2) => {
    return Pedido.find({"createdAt": {"$gte": date1, "$lt": date2}})
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
}
exports.removeById = (PedidoId) => {
    return new Promise((resolve, reject) => {
        Pedido.remove({
            _id: PedidoId
        }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};