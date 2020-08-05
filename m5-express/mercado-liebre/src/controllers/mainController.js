const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

function reload() {
	products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
}

const controller = {
	index: (req, res) => {
		reload();
		let visited = products.filter(p => p.category == 'visited');
		let inSale = products.filter(p => p.category == 'in-sale');
		res.render('index', { visited, inSale });
	},
	search: (req, res) => {
		// Do the magic
	},
};

module.exports = controller;
