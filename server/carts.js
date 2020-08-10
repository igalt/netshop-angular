const mongoose = require('mongoose');

const products = require('./products');
const customers = require('./customers');



/* By Ref */
const cartSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  },
  products: [{
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Product'
            }],
  checkedOut: Boolean
});


/* Embedding objects 
const cartSchema = new mongoose.Schema({
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer'
    },
    products: [products.productSchema],
    checkedOut: Boolean
  });
*/

exports.cartSchema = cartSchema;

const Cart = mongoose.model('Cart', cartSchema); // Product is a class

exports.Cart = Cart;

exports.getAll = (req, res) =>{
    Cart.find()
        .populate('customer products')
        .then(data => res.send(data));
}

exports.getById = (req, res) =>{
    let reqId = req.params.id; 
    Cart.findById(reqId)
      .populate('customer products')
      .then(data => {
        if (data){
          res.send(data)
        } else{
          res.status(404).send(`404: cart #${req.params.id} wasn't found`);
        }
    });
}
  
exports.createNew = (req, res) =>{
    // creating a new product based on our Model
    let newCart = new Cart({
      checkedOut: false,
      customer: [],
      products: []
    });
  
    newCart.save() // returns a promise
           .then(() => {
              res.send(newCart)
           })
           .catch((err) => {
             console.error(err);
             res.send(err);
           })
}

exports.addProduct = (req,res) =>{
    Cart.findById(req.params.id).then(cart => {
        if (cart){
            cart.products.push(req.body.productId);
            cart.save();
        } else{
            res.status(404).send(`404: cart #${req.params.id} wasn't found`);
        }
    })
}

exports.removeProduct = (req,res) =>{
  Cart.findById(req.params.id).then(cart => {
    if (cart){
      cart.products.pull(req.params.productid);
      cart.save()
          .then(() => res.send(`${req.params.productid} removed succesfully`));
    } else{
      res.status(404).send(`404: cart #${req.params.id} wasn't found`);
    }
  });
}

  