const InventoryItem = require('../models/inventoryItem')
const Item = require('../models/item')
const Category = require('../models/category')
const asyncHandler = require('express-async-handler')
const { body, validationResult } = require("express-validator");


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

exports.inventory_item_create_get = asyncHandler(async (req, res, next) =>{
    const allCategories = await Category.find().exec()

    res.render('inventory_item_form', {
        title: 'Create New Inventory Item',
        all_storages: ['dry-shelving', 'dry-open', 'refridgeration', 'frozen'],
        selected_storage: null,
        all_categories: allCategories,
        selected_category: null,
        inventory_item: null,
        errors: null
    })
})

exports.inventory_item_create_post = [
    body("name", "Inventory Item name must contain at least 2 characters")
    .trim()
    .isLength({ min: 2 })
    .escape(),

    body("description", "Inventory Item description must contain at least 2 characters")
    .trim()
    .isLength({ min: 2 })
    .escape(),

    body("manufaturer", "Inventory Item Manufacturer must contain at least 2 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),

    asyncHandler(async (req, res, next) =>{
        const errors = validationResult(req);

        const isDiscountedCheckbox = req.body.isDiscounted === 'on';

        const inventoryItem = new InventoryItem({
           name: req.body.name,
           description: req.body.description,
           manufaturer: req.body.manufaturer,
           inventory_item_discount: {
            isDiscounted: isDiscountedCheckbox,
           },
           price: req.body.price,
           storage: req.body.storage,
           category_id: req.body.category
        })
        if(req.body.discountDecimalized){
            inventoryItem.inventory_item_discount.discountDecimalized = req.body.discountDecimalized
        }

        if (!errors.isEmpty()) {
            const allCategories = await Category.find().exec()

            res.render('inventory_item_form', {
                title: 'Create New Inventory Item',
                all_storages: ['dry-shelving', 'dry-open', 'refridgeration', 'frozen'],
                selected_storage: req.body.storage,
                all_categories: allCategories,
                selected_category: req.body.category,
                inventory_item: inventoryItem,
                errors: errors.array()
            })
            return
        } else {
            const inventoryItemExists = await InventoryItem.findOne({name:req.body.name})
            if(inventoryItemExists){
                res.redirect(inventoryItemExists.url);
            } else {
                await inventoryItem.save();
                // New genre saved. Redirect to genre detail page.
                res.redirect(inventoryItem.url);
            }
        }
    })
]

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
