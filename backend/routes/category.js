var express = require("express");
var router = express.Router();
const { createCat,getAllCategories } = require('../controllers/category');


router.post('/category/create',createCat);
router.get('/categories', getAllCategories);

module.exports = router;