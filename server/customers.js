const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: String,
    balance: Number,
    imageURL: String,
    isAdmin: Boolean
});

// this duplicates the "_id" field as an "id" field in JSON
customerSchema.set('toJSON', {
    virtuals: true
});

exports.customerSchema = customerSchema;

const Customer = mongoose.model('Customer', customerSchema); // Product is a class

exports.Customer = Customer;

exports.getFirst = (req, res) =>{
    Customer.findOne()
            .then(data => res.send(data));
}

exports.getById = (req, res) =>{
    let reqId = req.params.id; 
    Customer.findById(reqId)
            .then(data => {
                if (data){
                res.send(data)
                } else{
                res.status(404).send(`404: customer #${req.params.id} wasn't found`);
                }
            });
}

exports.createNew = (req, res) =>{
    // creating a new product based on our Model
    let newCustomer = new Customer({
      name: req.body.name,
      balance: req.body.balance,
      imageURL: req.body.imageURL,
      isAdmin: req.body.isAdmin  
    });
  
    newCustomer.save() // returns a promise
           .then(() => {
              res.send(newCustomer);
           })
           .catch((err) => console.error(err));
};

exports.update = (req,res) => {
    Customer.findById(req.params.id).then(cust => {
        if (cust){
          cust.name = req.body.name;
          cust.balance = req.body.balance;
          cust.imageURL = req.body.imageURL;
          cust.isAdmin = req.body.isAdmin;

          cust.save().then(() => {res.send(JSON.stringify(cust))})
        } else{
          res.status(404).send(`404: customer #${req.params.id} wasn't found`);
        }
      });
}