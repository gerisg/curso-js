const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const reload = () => { products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8')) };

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

function getPromoPrice(product) {
	if (product.discount > 0) {
		let discount = product.price * ((100 - product.discount) / 100);
		return Math.round(discount);
	}
	return product.price;
}

const controller = {
	index: (req, res) => {
		reload();

		let visited = products.filter(p => p.category == 'visited');
		visited.map(p => p.priceFormatted = toThousand(getPromoPrice(p)));
		let inSale = products.filter(p => p.category == 'in-sale');
		inSale.map(p => p.priceFormatted = toThousand(getPromoPrice(p)));
		
		res.render('index', { visited, inSale });
	},
	search: (req, res) => {
		// Do the magic
	},
};

module.exports = controller;
