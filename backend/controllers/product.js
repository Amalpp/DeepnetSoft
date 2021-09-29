const Product = require('../models/product')
const _ = require('lodash')

exports.singleProduct = (req, res) => {
    // 
    if(req.product){
        return res.json(req.product);
    }
    else{
        return res.status(400).json({
            error:"Error"
        })
    }
};

exports.newProduct=(req,res)=>{
    const product = new Product(req.body)
    product.save((err, result) => {
        if (err) {
            console.log('PRODUCT CREATE ERROR ', err);
            return res.status(400).json({
                error: 'All fields are required'
            });
        }
        res.json(result);
    });
}
exports.list = (req, res) => {
  
    Product.find()
        .then((result)=> {
            
            res.status(200).json({
                products:result
            });
        }).catch((error) => {
            res.status(422).json({
                status: false,
                message: error+''
            })
        })
};

exports.removeProduct = (req,res)=>{
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if (err) {
            return res.status(400).json({
                error: 'Product removal failed'
            });
        }
        res.json({
            message: 'Product deleted successfully'
        });
    });
}
exports.searchProduct = (req, res) => {
    const query = {};
    if (req.query.search) {
        query.name = { $regex: req.query.search, $options: 'i' };
        if (req.query.category && req.query.category != 'All') {
            query.category = req.query.category;
        }

        Product.find(query, (err, products) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(products);

        }).populate('category')
    }
};

exports.productById = (req, res, next, id) => {
    Product.findById(id)
        .exec((err, product) => {
            if (err || !product) {
                return res.status(400).json({
                    error: 'Product not found'
                });
            }
            req.product = product;
            next();
        });
};

exports.update = (req, res) => {
    let product = req.product;
    product = _.extend(product,req.body)
    product.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: 'Error in updating '
            });
        }
        res.json(result);
    });
};

