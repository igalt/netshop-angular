const mongoose = require('mongoose');


// a Schema is a way of defining how our data looks like in MongoDB
// Supported types are: 
// String, Number, Date, 
// Buffer (for storing binary data), Boolean and ObjectID.
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    imageURL: String,
    shippableTo: [ String ],
    hasVAT: Boolean,
    category: String
  });

// this duplicates the "_id" field as an "id" field in JSON
productSchema.set('toJSON', {
    virtuals: true
});

  
exports.productSchema = productSchema;

// a Model is used to create a Class definition (not an instance!)
// based on the Schema.
// this class also helps us to communicate with the DB
let Product = mongoose.model('Product', productSchema); // Product is a class
exports.Product = Product;

exports.getAll = (req, res) => {
Product.find()
        .then(data => res.send(data));
};

exports.getById = (req, res) =>{
let reqId = req.params.id; 
Product.findById(reqId)
        .then(data => {
            if (data){
            res.send(data)
            } else{
            res.status(404).send(`404: product #${req.params.id} wasn't found`);
            }
        });

};

exports.createNew = (req, res) =>{
// creating a new product based on our Model
let newProd = new Product({
    name: req.body.name,
    price: req.body.price,
    imageURL: req.body.imageURL,
    shippableTo: req.body.shippableTo,
    hasVAT: req.body.hasVAT,
    category: req.body.category  
});

newProd.save() // returns a promise
        .then(() => {
            res.send(newProd)
        })
        .catch((err) => console.error(err))
};

exports.update = (req, res) => {
    Product.findById(req.params.id).then(product => {
        if (product){
        // update product
        product.name = req.body.name; 
        product.price = req.body.price;
        product.imageURL = req.body.imageURL;
        product.shippableTo = req.body.shippableTo;
        product.hasVAT = req.body.hasVAT;
        product.category = req.body.category;

        product.save()
                .then(() => res.send(JSON.stringify(product)));

        }else{
            res.status(404).send(`404: product #${req.params.id} wasn't found`);
        }
    })
};

exports.delete = (req,res) =>{
    Product.findByIdAndRemove(req.params.id)
            .then(product => {
                if (product){
                res.send(JSON.stringify(product));
                } else{
                res.status(404).send(`404: product #${req.params.id} wasn't found`);
                }
            });
}; 
