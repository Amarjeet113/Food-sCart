const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://sweetcart:amar2003@cluster0.tqm8rwl.mongodb.net/sweetcartmern?retryWrites=true&w=majority&appName=Cluster0';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');

        // Fetch food items
        const foodItemsCollection = mongoose.connection.db.collection("food_items");
        const foodItems = await foodItemsCollection.find({}).toArray();

        // Fetch food categories
        const foodCategoryCollection = mongoose.connection.db.collection("foodCategory");
        const foodCategories = await foodCategoryCollection.find({}).toArray();

        // Assign fetched data to global variables
        global.food_items = foodItems;
        global.foodCategory = foodCategories;

        console.log('Data fetched and stored in global variables');

    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
    }
};

module.exports = mongoDB;
