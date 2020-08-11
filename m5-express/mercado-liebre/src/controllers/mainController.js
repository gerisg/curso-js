const jsonTable = require('../database/jsonTable');

const productsModel = jsonTable('products');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

function priceWithDiscount(product) {
	if (product.discount > 0) {
		let discount = product.price * ((100 - product.discount) / 100);
		return Math.round(discount);
	}
	return product.price;
}

module.exports = {
	index: (req, res) => {
		let visited = productsModel.all().filter(p => p.category == 'visited');
		visited.map(p => p.priceWithDiscount = toThousand(priceWithDiscount(p)));
		
		let inSale = productsModel.all().filter(p => p.category == 'in-sale');
		inSale.map(p => p.priceWithDiscount = toThousand(priceWithDiscount(p)));
		
		res.render('index', { visited, inSale });
	},
	search: (req, res) => {
		// Do the magic
	},
};