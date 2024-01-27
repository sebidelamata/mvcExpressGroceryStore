const Item = require('../models/item')
const asyncHandler = require('express-async-handler')

exports.index = asyncHandler((req, res, next) =>{
    res.send("NOT IMPLEMENTED: Site Homepage");
})

exports.item_list = asyncHandler((req, res, next) =>{
    res.send("NOT IMPLEMENTED: Item list");
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
