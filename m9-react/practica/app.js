const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();

app.get('/api/products', (req,res) => {
    let products = fs.readFileSync(path.join(__dirname, 'data/products.json'));
    products = JSON.parse(products);
    res.json({
        meta: {
            count: products.length,
            total: products.reduce((sum, current) => sum += current.price, 0).toFixed(2)
        },
        data: products
    })
});

app.get('*', (req, res) => 
    res.status(404).json({ error: 'Página no encontrada' })
);

app.listen(3000, () => { console.log('Server listening on 3000' )});