const InventoryItem = require('../models/inventoryItem')
const Item = require('../models/item')
const Category = require('../models/category')
const asyncHandler = require('express-async-handler')

exports.index = asyncHandler(async (req, res, next) => {
    const [
        numCategories,
        numInventoryItems,
        numItems
    ] = await Promise.all([
        Category.countDocuments({}).exec(),
        InventoryItem.countDocuments({}).exec(),
        Item.countDocuments({}).exec()
    ])
    
    res.render('index', {
        numCategories: numCategories,
        numInventoryItems: numInventoryItems,
        numItems: numItems,
    });
})

exports.item_list = asyncHandler(async (req, res, next) =>{
    const allItems = await Item
        .find()
        .populate("category_id inventory_item_id")
        .exec()
    
    res.render('item_list',{
        allItems: allItems
    })
})

exports.item_detail = asyncHandler((req, res, next) =>{
    res.send("NOT IMPLEMENTED: Item detail");
})

exports.item_create_get = asyncHandler((req, res, next) =>{
    res.send("NOT IMPLEMENTED: Item create get");
})

exports.item_create_post = asyncHandler((req, res, next) =>{
    res.send("NOT IMPLEMENTED: Item create post");
})

exports.item_delete_get = asyncHandler((req, res, next) =>{
    res.send("NOT IMPLEMENTED: Item delete get");
})

exports.item_delete_post = asyncHandler((req, res, next) =>{
    res.send("NOT IMPLEMENTED: Item delete post");
})

exports.item_update_get = asyncHandler((req, res, next) =>{
    res.send("NOT IMPLEMENTED: Item update get");
})

exports.item_update_post = asyncHandler((req, res, next) =>{
    res.send("NOT IMPLEMENTED: Item update post");
})
