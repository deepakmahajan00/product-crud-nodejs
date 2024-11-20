const express = require('express');
const bodyParse = require('body-parser');

// Middleware
const productRoutes = require('./routes/productRoutes');


const app = express();

app.use(bodyParse.json());

app.use('/products', productRoutes);

const PORT = 3001;
app.listen(PORT, () => {
console.log(`Server running on http://localhost:${PORT}`);
});