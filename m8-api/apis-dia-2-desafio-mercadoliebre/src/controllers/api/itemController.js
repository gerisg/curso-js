const { validationResult } = require("express-validator");

// ******** Sequelize ***********

const {
  Product,
  Item,
} = require("../../database/models");

module.exports = {
    store: (req, res) => {
        const errors = validationResult(req);

        if (errors.isEmpty()) {
            // Busco el producto que voy a agregar como Item.
            Product.findByPk(req.body.productId, {
                include: ["user"],
            })
            .then((product) => {
                // Saco el valor del producto, teniendo en cuenta el descuento.
                let price =
                    Number(product.discount) > 0
                    ? product.price - (product.price * product.discount) / 100
                    : product.price;
                // Creo el Item de compra
                return Item.create({
                    salePrice: price,
                    quantity: req.body.quantity,
                    subTotal: price * req.body.quantity,
                    state: 1,
                    userId: req.session.user.id,
                    sellerId: product.user.id,
                    productId: product.id,
                });
            })
            .then((item) => res.status(201).json({
                "meta": {
                    "status": 201,
                    "message": "Created"
                },
                "data": item
            }))
            .catch((e) => console.log(e));
        } else {
            res.status(400).json({
                "meta": {
                    "status": 400,
                    "message": "Bad Request"
                },
                "error": errors.mapped()
            });
        }
    },
    remove: (req, res) => {
        Item.findAll({
            where: { id: req.body.itemId }
        }).then((result) => {
            if(!result.length) {
                throw new Error('Item not found');
            }
            return Item.destroy({where: { id: req.body.itemId }, force: true}).then(() => {return result});
        }).then((result) => res.status(200).json({
            "meta": {
                "status": 200,
                "message": "Removed"
            },
            "data": result
        })).catch((e) => res.status(400).json({
            "meta": {
                "status": 400,
                "message": "Item not found"
            }
        }));
    }
}