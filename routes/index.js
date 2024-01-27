var express = require('express');
var router = express.Router();

const category_controller = require("../controllers/categoryController");
const inventory_item_controller = require("../controllers/inventoryItemController");
const item_controller = require("../controllers/itemController");

/* GET home page. */
router.get('/', item_controller.index);

// category controllers
router.get('/category/create', category_controller.category_create_get);
router.post('/category/create', category_controller.category_create_post);

router.get('/category/:id/delete', category_controller.category_delete_get);
router.post('/category/:id/delete', category_controller.category_delete_post);

router.get('/category/:id/update', category_controller.category_update_get);
router.post('/category/:id/update', category_controller.category_update_post);

router.get('/category/:id', category_controller.category_detail);

router.get('/category_list', category_controller.category_list);


// inventory items controllers
router.get('/inventory_item/create', inventory_item_controller.inventory_item_create_get);
router.post('/inventory_item/create', inventory_item_controller.inventory_item_create_post);

router.get('/inventory_item/:id/delete', inventory_item_controller.inventory_item_delete_get);
router.post('/inventory_item/:id/delete', inventory_item_controller.inventory_item_delete_post);

router.get('/inventory_item/:id/update', inventory_item_controller.inventory_item_update_get);
router.post('/inventory_item/:id/update', inventory_item_controller.inventory_item_update_post);

router.get('/inventory_item/:id', inventory_item_controller.inventory_item_detail);

router.get('/inventory_item_list', inventory_item_controller.inventory_item_list);

// item controllers
router.get('/item/create', item_controller.item_create_get);
router.post('/item/create', item_controller.item_create_post);

router.get('/item/:id/delete', item_controller.item_delete_get);
router.post('/item/:id/delete', item_controller.item_delete_post);

router.get('/item/:id/update', item_controller.item_update_get);
router.post('/item/:id/update', item_controller.item_update_post);

router.get('/item/:id', item_controller.item_detail);

router.get('/item_list', item_controller.item_list);

module.exports = router;
