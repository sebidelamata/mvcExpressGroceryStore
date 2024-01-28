const Category = require('../models/category')
const asyncHandler = require('express-async-handler')

exports.category_list = asyncHandler(async (req, res, next) =>{
    const allCategories = await Category
        .find({}, "name description")
        .sort({ name: 1 })
        .populate("name description")
        .exec()

    res.render('category_list', {
        allCategories
    });
})

exports.category_detail = asyncHandler((req, res, next) =>{
    res.send("NOT IMPLEMENTED: Category detail");
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
