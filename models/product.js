//product.js
const db = require('../connection');

//Key Points:
//Promises: Ensure asynchronous operations return a Promise to handle the results properly.
//Async/Await: Use async functions in the controller to await the results of the Promise.
//Error Handling: Always handle errors to avoid unhandled exceptions.

class Product {
    constructor() {
        this.products = [];
        this.idCounter = 1;
    }

    // Create
    createProduct(data) {
        const { name, price } = data;
        const sql = 'INSERT INTO products (name, price) VALUES (?, ?)';

        return new Promise((resolve, reject) => {
            db.query(sql, [name, price], (err, result) => {
                if (err) return reject(err);
                resolve({ id: result.insertId, name, price });
            });
        });
    }

    // get all products
    getAllProducts() {
        const sql = 'SELECT * FROM products';

        return new Promise((resolve, reject) => {
            db.query(sql, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        })
        
    }

    getProductById(id) {
        const sql = 'SELECT * FROM products where id = ?';
        return new Promise((resolve, reject) => {
            db.query(sql, [id], (err, result) => {
                if (err) return reject(result);
                resolve(result);
            });
        });
    }

    updateProduct(data, id) {
        const { name, price } = data;
        const sql = 'Update products Set name = ?, price = ? Where id = ?';
        return new Promise((resolve, reject) => {
            db.query(sql, [name, price, id], (err, result) => {
                if (err) return reject(result);

                // Check if any rows were affected (i.e., the product was updated)
                if (result.affectedRows === 0) {
                    return reject(new Error('Product not found or no changes made.'));
                }

                resolve({id, name, price});
            });
        });
    }

    deletProduct(id) {
        const sql = 'Delete from products where id = ?';

        return new Promise((resolve, reject) => {
            db.query(sql, [id], (err, result) => {
                if (err) return reject(err);

                if (result.affectedRows == 0) {
                    return reject(new Error('Product not found or no changes made'));
                }

                resolve({message: 'Product has been deleted'});
            });
        });
    }

}

module.exports = new Product();