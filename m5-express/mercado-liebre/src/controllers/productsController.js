const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

function persist() {
	fs.writeFileSync(productsFilePath, JSON.stringify(products));
}

function generateID() {
	return Math.random().toString(36).substr(2, 9);
}

function update(oldProduct, product) {
	product.id = oldProduct.id;
	product.image = oldProduct.image;
	remove(product.id);
	save(product);
	persist();
}

function remove(id) {
	let index = products.findIndex(p => p.id == id);
	if(index != -1) {
		products.splice(index, 1);
	}
}

function save(product) {
	let newProduct = {
		id: product.id ? product.id : generateID(),
		name: product.name,
		price: product.price,
		discount: product.discount,
		category: product.category,
		description: product.description,
		image: 'default-image.png'
	}
	products.push(newProduct);
}

function find(id) {
	return products.find(p => p.id == id);
}

function getPromoPrice(product) {
	if (product.discount > 0) {
		let discount = product.price * ((100 - product.discount) / 100);
		return Math.round(discount);
	}
	return product.price;
}

const controller = {
	// Root - Show all products
	index: (req, res) => {
		products.map(p => p.priceFormatted = toThousand(getPromoPrice(p)));
		res.render('products', { products });
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let productToShow = find(req.params.id);
		productToShow.priceWithDiscount = toThousand(Math.round(productToShow.price * ((100 - productToShow.discount) / 100))); 
		productToShow.price = toThousand(productToShow.price);
		res.render('detail', { product: productToShow });
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form');
	},
	
	// Create -  Method to store
	store: (req, res) => {
		save(req.body);
		persist();
		res.redirect('/');
	},

	// Update - Form to edit
	edit: (req, res) => {
		res.render('product-edit-form', { product: find(req.params.id) });
	},
	// Update - Method to update
	update: (req, res) => {
		let oldProduct = find(req.params.id);
		let newProduct = req.body;
		update(oldProduct, newProduct);
		res.redirect('/');
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		remove(req.params.id);
		persist();
		res.redirect('/');
	}
};

module.exports = controller;