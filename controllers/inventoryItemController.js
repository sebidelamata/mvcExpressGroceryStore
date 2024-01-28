const InventoryItem = require('../models/inventoryItem')
const Item = require('../models/item')
const asyncHandler = require('express-async-handler')

exports.inventory_item_list = asyncHandler(async (req, res, next) =>{
    const allInventoryItems = await InventoryItem
        .find()
        .populate("category_id")
        .exec()
    console.log(allInventoryItems)
    res.render('inventory_item_list', {
        allInventoryItems: allInventoryItems
    })
})

exports.inventory_item_detail = asyncHandler(async (req, res, next) =>{
    const [inventoryItem, inventoryItemItems] = await Promise.all([
        InventoryItem.findById(req.params.id).exec(),
        Item.find({ inventory_item_id: req.params.id }).exec(),
    ])

    if (inventoryItemItems === null) {
        // No results.
        const err = new Error("Inventory Item not found");
        err.status = 404;
        return next(err);
    }
    
    res.render('inventory_item_detail', {
        inventory_item: inventoryItem,
        inventory_item_items: inventoryItemItems,
        errors: null
    })
})

exports.inventory_item_create_get = asyncHandler((req, res, next) =>{
    res.send("NOT IMPLEMENTED: Inventory create get");
})

exports.inventory_item_create_post = asyncHandler((req, res, next) =>{
    res.send("NOT IMPLEMENTED: Inventory create post");
})

exports.inventory_item_delete_get = asyncHandler((req, res, next) =>{
    res.send("NOT IMPLEMENTED: Inventory delete get");
})

exports.inventory_item_delete_post = asyncHandler((req, res, next) =>{
    res.send("NOT IMPLEMENTED: Inventory delete post");
})

exports.inventory_item_update_get = asyncHandler((req, res, next) =>{
    res.send("NOT IMPLEMENTED: Inventory update get");
})

exports.inventory_item_update_post = asyncHandler((req, res, next) =>{
    res.send("NOT IMPLEMENTED: Inventory update post");
})
