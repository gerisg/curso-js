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
		let products = productsModel.all();
		products.map(product => product.priceWithDiscount = toThousand(priceWithDiscount(product)));
		res.render('products', { products });
	},
	detail: (req, res) => {
		let product = productsModel.find(req.params.id);
		product.priceWithDiscount = toThousand(priceWithDiscount(product)); 
		product.price = toThousand(product.price);
		res.render('detail', { product });
	},
	create: (req, res) => {
		res.render('create-form');
	},
	store: (req, res) => {
		let product =  {
			name: req.body.name,
			price: parseInt(req.body.price),
			discount: parseInt(req.body.discount),
			category: req.body.category,
			description: req.body.description,
			image: null
		}
		let id = productsModel.create(product);
		res.redirect('/products/' + id);
	},
	edit: (req, res) => {
		let product = productsModel.find(req.params.id)
		res.render('edit-form', { product });
	},
	update: (req, res) => {
		let product =  {
			id: parseInt(req.params.id),
			name: req.body.name,
			price: parseInt(req.body.price),
			discount: parseInt(req.body.discount),
			category: req.body.category,
			description: req.body.description,
			image: null
		}
		let id = productsModel.update(product);
		res.redirect('/products/' + id);
	},
	destroy : (req, res) => {
		productsModel.remove(req.params.id);
		res.redirect('/');
	}
};