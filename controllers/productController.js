const Product = require('../models/product');


class ProductController {
    async create(req, res) {
        try {
            const newProduct = await Product.createProduct(req.body);
            res.status(201).json(newProduct);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
        
    }

    async getAll(req, res) {
        try {
            const products = await Product.getAllProducts();
            res.json(products);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getById(req, res) {
        try {
            const product = await Product.getProductById(req.params.id);
            if (!product.length) {
                res.status(404).json({message: 'Product not found'});
            } else {
                res.json(product);
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async update(req, res) {
        try {
            const data = req.body;
            const id = parseInt(req.params.id);
            const product = await Product.updateProduct(data, id);
            console.log(product);
            if (!product) {
                res.status(404).json({message: 'Product not found!'});
            } else {
                res.json(product);
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    
    async delete(req, res) {
        try {
            const id = parseInt(req.params.id);
            const result = await Product.deletProduct(id);
            res.json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new ProductController();