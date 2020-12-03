const PedidoModel = require('../models/pedido.model');
const crypto = require('crypto');
exports.insert = (req, res) => {
    PedidoModel.createPedido(req.body)
        .then((result) => {
            res.status(201).send({
                id: result._id
            });
        });
};
exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    PedidoModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};
exports.getById = (req, res) => {
    PedidoModel.findById(req.params.pedidoId)
        .then((result) => {
            res.status(200).send(result);
        });
};
exports.patchById = (req, res) => {
    PedidoModel.patchPedido(req.params.pedidoId, req.body)
        .then((result) => {
            res.status(204).send({});
        });
};
exports.removeById = (req, res) => {
    PedidoModel.removeById(req.params.pedidoId)
        .then((result) => {
            res.status(204).send({});
        });
};