const InventoryItem = require('../models/inventoryItem')
const asyncHandler = require('express-async-handler')

exports.inventory_item_list = asyncHandler((req, res, next) =>{
    res.send("NOT IMPLEMENTED: Inventory list");
})

exports.inventory_item_detail = asyncHandler((req, res, next) =>{
    res.send("NOT IMPLEMENTED: Inventory detail");
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
