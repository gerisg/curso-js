// ******** Sequelize ***********

const { Sequelize, Product, Brand, Category } = require('../../database/models');
const Op = Sequelize.Op;

module.exports = {

	async latest (req, res){
		try {
			const ultimos = await Product.findAll({
				order: [
					['createdAt', 'DESC']
				],
				limit: 8
			});

			res.send({
				"meta": {
					"status": 200,
					"count": ultimos.length,
					"url": req.hostname + "/api/products/latest"
				},
				"data": ultimos
			});

		} catch (e) {
			console.log(e);
		}
	},

	async offers (req, res){
		try {
			const inSale = await Product.findAll({
				where: {
					discount: {
						[Op.gt]: 0
					}
				},
				limit: 8
			});

			res.send(res.send({
				"meta": {
					"status": 200,
					"count": inSale.length,
					"url": req.hostname + "/api/products/offers"
				},
				"data": inSale.sort(() => Math.random() - 0.5)
			}));
			
		} catch (e) {
			console.log(e);
		}
	},

	async categories (req, res){
		try {
			let where = {};
			let products = [];
			let title = "Todos los productos";

			if (req.params.category) {
				let category = await Category.findOne({
					where: { name: req.params.category },
					include: ['products']
				});
				title = req.params.category;
				if (category) {
					products = category.products
				};
			} else {
				products = await Product.findAll(where);
			}
			return res.send({
				"meta": {
					"title": title,
					"status": 200,
					"count": products.length,
					"url": req.hostname + "/api/products/offers"
				},
				"data": products
			});
		} catch (e) {
			console.log(e);
		}
	}
}