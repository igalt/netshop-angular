const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); 
const cors = require('cors');

const products = require('./products');
const customers = require('./customers');
const carts = require('./carts');

// Initializing Server
const app = express(); //express is a function that returns an instance

app.use(cors()) // enabling cross origin requests
app.use(express.json()); // this makes it easier to process JSON requests 
app.use(express.static(path.resolve("dist/Netshop-angular"))); // serving  our front-end client files with this server


      
app.listen(process.env.PORT || 8000, () => console.log('Netshop API is listening on port 8000... '));
      
// connecting to MongoDB
//const mongoURL = "mongodb://localhost/netshopDB"; // connection string
const mongoURL = "mongodb+srv://igal:12081982@mycluster-lgiw8.mongodb.net/netShopDB";

mongoose.set('useUnifiedTopology', true);

mongoose.connect(mongoURL, { useNewUrlParser: true })
        .then(() => console.log('connected to MongoDB'))
        .catch(err => console.error(err));
       


// *****
// Products
// *****

app.get('/api/products', products.getAll);

app.get('/api/products/:id', products.getById);

app.post('/api/products', products.createNew);

app.put('/api/products/:id', products.update);

app.delete('/api/products/:id', products.delete);


// *****
// Customers
// *****

app.get('/api/customers', customers.getFirst);

app.get('/api/customers/:id', customers.getById);

app.post('/api/customers', customers.createNew);
 
app.put('/api/customers/:id', customers.update)

// *****
// Cart
// *****


app.get('/api/carts', carts.getAll);

app.get('/api/carts/:id', carts.getById);

app.post('/api/carts', carts.createNew);

app.post('/api/carts/:id/products', carts.addProduct);

app.delete('/api/carts/:id/products/:productid', carts.removeProduct);

app.put('/api/carts/:id', carts.checkOut);


app.all('*', (req,res) =>{
        res.status(200).sendFile(path.resolve("dist/Netshop-angular") + '/index.html');
});