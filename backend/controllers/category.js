const Category = require("../models/category");


exports.createCat = (req, res) => {
    const category = new Category(req.body)
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: `${req.body.name} already exists`
            });
        }
        res.json({ data });
    });
};

exports.getAllCategories = (req, res) => {
    Category.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};
