const Category = require('../models/category')
const InventoryItem = require('../models/inventoryItem')
const Item = require('../models/item')
const asyncHandler = require('express-async-handler')

exports.category_list = asyncHandler(async (req, res, next) =>{
    const allCategories = await Category
        .find({}, "name description")
        .sort({ name: 1 })
        .populate("name")
        .exec()

    res.render('category_list', {
        allCategories
    });
})

exports.category_detail = asyncHandler(async (req, res, next) =>{
    const [category, categoryInventoryItems, categoryItems] = await Promise.all([
        Category.findById(req.params.id).exec(),
        InventoryItem.find({ category_id: req.params.id }).exec(),
        Item.find({ category_id: req.params.id }).populate("inventory_item_id").exec(),
    ])

    if (category === null) {
        // No results.
        const err = new Error("Category not found");
        err.status = 404;
        return next(err);
    }
    
    res.render('category_detail', {
        category: category,
        category_inventory_items: categoryInventoryItems,
        category_items: categoryItems,
        errors: null
    })
})

exports.category_create_get = asyncHandler((req, res, next) =>{
    res.send("NOT IMPLEMENTED: Category create get");
})

exports.category_create_post = asyncHandler((req, res, next) =>{
    res.send("NOT IMPLEMENTED: Category create post");
})

exports.category_delete_get = asyncHandler((req, res, next) =>{
    res.send("NOT IMPLEMENTED: Category delete get");
})

exports.category_delete_post = asyncHandler((req, res, next) =>{
    res.send("NOT IMPLEMENTED: Category delete post");
})

exports.category_update_get = asyncHandler((req, res, next) =>{
    res.send("NOT IMPLEMENTED: Category update get");
})

exports.category_update_post = asyncHandler((req, res, next) =>{
    res.send("NOT IMPLEMENTED: Category update post");
})
