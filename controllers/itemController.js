const InventoryItem = require('../models/inventoryItem')
const Item = require('../models/item')
const Category = require('../models/category')
const asyncHandler = require('express-async-handler')
const { body, validationResult } = require("express-validator");

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

exports.item_detail = asyncHandler(async (req, res, next) =>{
    const item = await Item.findById(req.params.id).populate("inventory_item_id").exec()

    if (item === null) {
        // No results.
        const err = new Error("Item not found");
        err.status = 404;
        return next(err);
    }
    
    res.render('item_detail', {
        item: item,
        errors: null
    })
})

exports.item_create_get = asyncHandler(async (req, res, next) =>{
    const [allCategories, allInventoryItems] = await Promise.all([
        Category.find().exec(),
        InventoryItem.find().exec()
    ])
    res.render('item_form', {
        title: 'Create New Item',
        all_categories: allCategories,
        all_inventory_items: allInventoryItems,
        selected_category: null,
        selected_inventory_item: null,
        item: null,
        errors: null
    })
})

exports.item_create_post = [
    body('received_date', 'Invalid date')
    .isISO8601()
    .toDate(),

    body('expiration_date', 'Invalid date')
    .optional({ value: 'false' })
    .isISO8601()
    .toDate(),

    asyncHandler(async (req, res, next) =>{
        const errors = validationResult(req);

        const isDiscountedCheckbox = req.body.isDiscounted === 'on';
        const damagedCheckbox = req.body.damaged === 'on';
        const returnedCheckbox = req.body.returned === 'on';

        const item = new Item({
            received_date : req.body.received_date,
            isDiscounted: isDiscountedCheckbox,
            damaged: damagedCheckbox,
            returned: returnedCheckbox,
            category_id: req.body.category_id,
            inventory_item_id: req.body.inventory_item_id
        })

        if(req.body.expiration_date){
            item.expiration_date = req.body.expiration_date
        }
        if(req.body.discountDecimalized){
            item.item_discount.discountDecimalized = req.body.discountDecimalized
        }
        if(req.body.weight_oz !== null){
            item.weight_oz = req.body.weight_oz
        }
    })
]

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
