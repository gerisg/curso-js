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
					"count": 8,
					"url": "/api/products/latest"
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
					"count": 8,
					"url": req.hostname + "/api/products/offers"
				},
				"data": inSale.sort(() => Math.random() - 0.5)
			}));
			
		} catch (e) {
			console.log(e);
		}
	}
}