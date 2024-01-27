const Category = require('./models/category')
const InventoryItem = require('./models/inventoryItem')
const Item = require('./models/item')

const categories = []
const inventoryitems = []
const items = []

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const userArgs = process.argv.slice(2);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategories();
  await createInventoryItems();
  await createItems();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function categoryCreate(index, name, description) {
    const category = new Category({ name: name, description: description });
    await category.save();
    categories[index] = category;
    console.log(`Added category: ${name}`);
}

async function inventoryItemCreate(
    index, 
    name, 
    description, 
    manufaturer, 
    isDiscounted, 
    discountDecimalized, 
    price,
    storage, 
    category_id
    ){
        console.log(discountDecimalized)
        const inventoryItem = new InventoryItem({ 
            name: name, 
            description: description, 
            manufaturer: manufaturer, 
            inventory_item_discount: {
                isDiscounted: isDiscounted,
            },
            price: parseFloat(price),
            storage: storage.toString(),
            category_id: category_id 
        });
        if(discountDecimalized !== undefined){
            inventoryItem.inventory_item_discount.discountDecimalized = discountDecimalized
        }

        await inventoryItem.save();
        inventoryitems[index] = inventoryItem;
        console.log(`Added category: ${name}`);
}

async function itemCreate(
    index, 
    received_date, 
    expiration_date,
    isDiscounted,
    discountDecimalized,
    damaged,
    returned,
    weight_oz,
    inventory_item_id,
    category_id
    ){
    const item = new Item({ 
        received_date: received_date,
        item_discount: {
            isDiscounted: isDiscounted,
        },
        damaged: damaged,
        returned: returned,
        inventory_item_id: inventory_item_id,
        category_id: category_id
    })
    if(expiration_date !== undefined){
        item.expiration_date = expiration_date
    }
    if(discountDecimalized !== undefined){
        item.item_discount.discountDecimalized = discountDecimalized
    }
    if(weight_oz !== undefined){
        item.weight_oz = weight_oz
    }
    
    await item.save();
    items[index] = item;
    console.log(`Added item: ${item._id}`);
}

async function createCategories() {
    console.log("Adding categories");
    await Promise.all([
      categoryCreate(0, "Produce", 'fruits and vegetables, fresh herbs'),
      categoryCreate(1, "Meat", 'Chicken, pork, beef, seafood, eggs'),
      categoryCreate(2, "Dairy", 'Milk, yogurt, and cheeses'),
      categoryCreate(3, "Bakery", 'Bread, bagels, slice bread'), 
      categoryCreate(4, "Health", 'shampoo etc'),  
    ]);
  }

  async function createInventoryItems() {
    console.log("Adding inventory items");
    await Promise.all([
        inventoryItemCreate(
            index=0, 
            name="Lettuce", 
            description='iceberg', 
            manufaturer='Dole', 
            isDiscounted=false, 
            discountDecimalized=undefined,
            price= parseFloat(2.5),
            storage='refridgeration', 
            category_id=categories[0]._id
        ),
        inventoryItemCreate(
            index=1, 
            name="Celery", 
            description='1 bunch', 
            manufaturer='Dole', 
            isDiscounted=true,
            discountDecimalized=0.2,
            price= 2.99, 
            storage='refridgeration', 
            category_id=categories[0]._id,
        ),
        inventoryItemCreate(
            index=2, 
            name="Tomato", 
            description='roma', 
            manufaturer='Sunshine Farms', 
                isDiscounted=false,
                discountDecimalized=undefined,
                price= 2, 
                storage='dry-open', 
                category_id=categories[0]._id,
        ),
        inventoryItemCreate(
            index=3, 
            name="Sweet Potato", 
            description='organic', 
            manufaturer='Idaho Direct', 
            isDiscounted=false,
            discountDecimalized=undefined,
            price= 1.5, 
            storage='dry-open', 
            category_id=categories[0]._id,
        ),
        inventoryItemCreate(
            index=4, 
            name="Chicken Breast", 
            description='organic', 
            manufaturer='Tyson', 
            isDiscounted=false,
            discountDecimalized=undefined,
            price= 12.99, 
            storage='refridgeration', 
            category_id=categories[1]._id,
        ),
        inventoryItemCreate(
            index=5, 
            name="Italian Sausage", 
            description='mild', 
            manufaturer='Johnson', 
            isDiscounted=false,
            discountDecimalized=undefined,
            price= 8.99, 
            storage='refridgeration', 
            category_id=categories[1]._id,
        ),
        inventoryItemCreate(
            index=6, 
            name="Salmon Filet", 
            description='Atlantic', 
            manufaturer='Seaside Foods', 
            isDiscounted=false,
            discountDecimalized=undefined,
            price= 8.99, 
            storage='refridgeration', 
            category_id=categories[1]._id,
        ),
        inventoryItemCreate(
            index=7, 
            name="Milk", 
            description='whole', 
            manufaturer='Lait', 
            isDiscounted=false,
            discountDecimalized=undefined,
            price= 4.99, 
            storage='refridgeration', 
            category_id=categories[2]._id,
        ),
        inventoryItemCreate(
            index=8, 
            name="Butter", 
            description='whole', 
            manufaturer='Lait', 
            isDiscounted=false,
            discountDecimalized=undefined,
            price= 4.99, 
            storage='refridgeration', 
            category_id=categories[2]._id,
        ),
        inventoryItemCreate(
            index=9, 
            name="Yogurt", 
            description='whole', 
            manufaturer='Lait', 
            isDiscounted=false,
            discountDecimalized=undefined,
            price= 4.99, 
            storage='refridgeration', 
            category_id=categories[2]._id,
        ),
        inventoryItemCreate(
            index=10, 
            name="Muffins", 
            description='bran', 
            manufaturer='Golden Ray Bakeries', 
            isDiscounted=false,
            discountDecimalized=undefined,
            price= 4.99, 
            storage='dry-open', 
            category_id=categories[3]._id,
        ),
        inventoryItemCreate(
            index=11, 
            name="Sliced Whole Wheat Bread", 
            description='21 grain', 
            manufaturer='Golden Ray Bakeries', 
            isDiscounted=false,
            discountDecimalized=undefined,
            price= 5.99, 
            storage='dry-shelving', 
            category_id=categories[3]._id,
        ),
        inventoryItemCreate(
            index=12, 
            name="Sliced White Bread", 
            description='fortified', 
            manufaturer='Golden Ray Bakeries', 
            isDiscounted=false,
            discountDecimalized=undefined,
            price= 4.99, 
            storage='dry-shelving', 
            category_id=categories[3]._id,
        ),
        inventoryItemCreate(
            index=13, 
            name="Shampoo", 
            description='lime-mint', 
            manufaturer='Fructis', 
            isDiscounted=false,
            discountDecimalized=undefined,
            price= 9.99, 
            storage='dry-shelving', 
            category_id=categories[4]._id,
        ),
        inventoryItemCreate(
            index=14, 
            name="Toothbrush", 
            description='whitening', 
            manufaturer='Crest', 
            isDiscounted=false,
            discountDecimalized=undefined,
            price= 8.99, 
            storage='dry-shelving', 
            category_id=categories[4]._id,
        ),
    ]);
  }

  async function createItems() {
    console.log("Adding items");
    await Promise.all([
        itemCreate(
            index = 0, 
            received_date = new Date('2023-10-20'), 
            expiration_date = undefined,
            isDiscounted=false,
            discountDecimalized=undefined,
            damaged=false,
            returned=false,
            weight_oz = undefined,
            inventory_item_id = inventoryitems[13]._id,
            category_id = categories[4]._id
        ),
        itemCreate(
            index = 1, 
            received_date = new Date('2023-10-20'), 
            expiration_date = undefined,
            isDiscounted=false,
            discountDecimalized=undefined,
            damaged=false,
            returned=false,
            weight_oz = undefined,
            inventory_item_id = inventoryitems[13]._id,
            category_id = categories[4]._id
        ),
        itemCreate(
            index = 2, 
            received_date = new Date('2024-01-04'),
            expiration_date = undefined, 
            isDiscounted=false,
            discountDecimalized=undefined,
            damaged=false,
            returned=false,
            weight_oz = undefined,
            inventory_item_id = inventoryitems[13]._id,
            category_id = categories[4]._id
        ),
        itemCreate(
            index = 3, 
            received_date = new Date('2023-10-20'), 
            expiration_date = new Date('2024-03-10'),
            isDiscounted=false,
            discountDecimalized=undefined,
            damaged=false,
            returned=false,
            weight_oz = undefined,
            inventory_item_id = inventoryitems[8]._id,
            category_id = categories[2]._id
        ),
        itemCreate(
            index = 4, 
            received_date = new Date('2023-10-20'), 
            expiration_date = new Date('2024-03-10'),
            isDiscounted=false,
            discountDecimalized=undefined,
            damaged=false,
            returned=false,
            weight_oz = undefined,
            inventory_item_id = inventoryitems[8]._id,
            category_id = categories[2]._id
        ),
        itemCreate(
            index = 5, 
            received_date = new Date('2023-10-20'), 
            expiration_date = new Date('2024-03-10'),
            isDiscounted=false,
            discountDecimalized=undefined,
            damaged=false,
            returned=false,
            weight_oz = undefined,
            inventory_item_id = inventoryitems[8]._id,
            category_id = categories[2]._id
        ),
        itemCreate(
            index = 6, 
            received_date = new Date('2023-10-20'), 
            expiration_date = new Date('2024-03-10'),
            isDiscounted=false,
            discountDecimalized=undefined,
            damaged=false,
            returned=false,
            weight_oz = undefined,
            inventory_item_id = inventoryitems[8]._id,
            category_id = categories[2]._id
        ),
        itemCreate(
            index = 7, 
            received_date = new Date('2024-01-20'), 
            expiration_date = new Date('2024-02-07'),
            isDiscounted=false,
            discountDecimalized=undefined,
            damaged=false,
            returned=false,
            weight_oz = undefined,
            inventory_item_id = inventoryitems[7]._id,
            category_id = categories[2]._id
        ),
        itemCreate(
            index = 8, 
            received_date = new Date('2024-01-20'), 
            expiration_date = new Date('2024-02-07'),
            isDiscounted=false,
            discountDecimalized=undefined,
            damaged=false,
            returned=false,
            weight_oz = undefined,
            inventory_item_id = inventoryitems[7]._id,
            category_id = categories[2]._id
        ),
        itemCreate(
            index = 9, 
            received_date = new Date('2024-01-20'), 
            expiration_date = new Date('2024-02-07'),
            isDiscounted=false,
            discountDecimalized=undefined,
            damaged=false,
            returned=false,
            weight_oz = undefined,
            inventory_item_id = inventoryitems[7]._id,
            category_id = categories[2]._id
        ),
        itemCreate(
            index = 10, 
            received_date = new Date('2024-01-20'), 
            expiration_date = new Date('2024-02-07'),
            isDiscounted=false,
            discountDecimalized=undefined,
            damaged=false,
            returned=false,
            weight_oz = undefined,
            inventory_item_id = inventoryitems[7]._id,
            category_id = categories[2]._id
        ),
        itemCreate(
            index = 11, 
            received_date = new Date('2024-01-20'), 
            expiration_date = new Date('2024-02-07'),
            isDiscounted=false,
            discountDecimalized=undefined,
            damaged=false,
            returned=false,
            weight_oz = undefined,
            inventory_item_id = inventoryitems[7]._id,
            category_id = categories[2]._id
        ),
        itemCreate(
            index = 12, 
            received_date = new Date('2024-01-20'), 
            expiration_date = new Date('2024-02-07'),
            isDiscounted=false,
            discountDecimalized=undefined,
            damaged=false,
            returned=false,
            weight_oz = undefined,
            inventory_item_id = inventoryitems[7]._id,
            category_id = categories[2]._id
        ),
        itemCreate(
            index = 13, 
            received_date = new Date('2024-01-20'), 
            expiration_date = new Date('2024-02-07'),
            isDiscounted=false,
            discountDecimalized=undefined,
            damaged=false,
            returned=false,
            weight_oz = undefined,
            inventory_item_id = inventoryitems[7]._id,
            category_id = categories[2]._id
        ),
        itemCreate(
            index = 14, 
            received_date = new Date('2024-01-20'), 
            expiration_date = new Date('2024-01-25'),
            isDiscounted=false,
            discountDecimalized=undefined,
            damaged=false,
            returned=false,
            weight_oz = undefined,
            inventory_item_id = inventoryitems[0]._id,
            category_id = categories[0]._id
        ),
        itemCreate(
            index = 15, 
            received_date = new Date('2024-01-20'), 
            expiration_date = new Date('2024-01-25'),
            isDiscounted=false,
            discountDecimalized=undefined,
            damaged=false,
            returned=false,
            weight_oz = undefined,
            inventory_item_id = inventoryitems[0]._id,
            category_id = categories[0]._id
        ),
        itemCreate(
            index = 16, 
            received_date = new Date('2024-01-25'), 
            expiration_date = new Date('2024-01-30'),
            isDiscounted=false,
            discountDecimalized=undefined,
            damaged=false,
            returned=false,
            weight_oz = undefined,
            inventory_item_id = inventoryitems[3]._id,
            category_id = categories[0]._id
        ),
        itemCreate(
            index = 17, 
            received_date = new Date('2024-01-25'), 
            expiration_date = new Date('2024-01-30'),
            isDiscounted=false,
            discountDecimalized=undefined,
            damaged=false,
            returned=false,
            weight_oz = undefined,
            inventory_item_id = inventoryitems[3]._id,
            category_id = categories[0]._id
        ),
        itemCreate(
            index = 18, 
            received_date = new Date('2024-01-25'), 
            expiration_date = new Date('2024-01-30'),
            isDiscounted=false,
            discountDecimalized=undefined,
            damaged=false,
            returned=false,
            weight_oz = undefined,
            inventory_item_id = inventoryitems[3]._id,
            category_id = categories[0]._id
        ),
        itemCreate(
            index = 19, 
            received_date = new Date('2024-01-25'), 
            expiration_date = new Date('2024-01-30'),
            isDiscounted=false,
            discountDecimalized=undefined,
            damaged=false,
            returned=false,
            weight_oz = undefined,
            inventory_item_id = inventoryitems[3]._id,
            category_id = categories[0]._id
        ),
        itemCreate(
            index = 20, 
            received_date = new Date('2024-01-25'), 
            expiration_date = new Date('2024-01-30'),
            isDiscounted=false,
            discountDecimalized=undefined,
            damaged=false,
            returned=false,
            weight_oz = undefined,
            inventory_item_id = inventoryitems[3]._id,
            category_id = categories[0]._id
        ),
        itemCreate(
            index = 21, 
            received_date = new Date('2024-01-25'), 
            expiration_date = new Date('2024-01-30'),
            isDiscounted=false,
            discountDecimalized=undefined,
            damaged=false,
            returned=false,
            weight_oz = undefined,
            inventory_item_id = inventoryitems[3]._id,
            category_id = categories[0]._id
        ),
        itemCreate(
            index = 22, 
            received_date = new Date('2024-01-27'), 
            expiration_date = new Date('2024-02-08'),
            isDiscounted=false,
            discountDecimalized=undefined,
            damaged=false,
            returned=false,
            weight_oz = undefined,
            inventory_item_id = inventoryitems[10]._id,
            category_id = categories[3]._id
        ),
        itemCreate(
            index = 23, 
            received_date = new Date('2024-01-27'), 
            expiration_date = new Date('2024-02-08'),
            isDiscounted=false,
            discountDecimalized=undefined,
            damaged=false,
            returned=false,
            weight_oz = undefined,
            inventory_item_id = inventoryitems[10]._id,
            category_id = categories[3]._id
        ),
        itemCreate(
            index = 24, 
            received_date = new Date('2024-01-27'), 
            expiration_date = new Date('2024-02-08'),
            isDiscounted=false,
            discountDecimalized=undefined,
            damaged=false,
            returned=false,
            weight_oz = undefined,
            inventory_item_id = inventoryitems[11]._id,
            category_id = categories[3]._id
        ),
        itemCreate(
            index = 25, 
            received_date = new Date('2024-01-27'), 
            expiration_date = new Date('2024-02-08'),
            isDiscounted=false,
            discountDecimalized=undefined,
            damaged=false,
            returned=false,
            weight_oz = undefined,
            inventory_item_id = inventoryitems[11]._id,
            category_id = categories[3]._id
        ),
    ]);
  }
