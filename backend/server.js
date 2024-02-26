const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');

//connect to mongoDB server
mongoose.connect('YOUR MONGODB URL', // your mongodb connection string
{
	useNewUrlParser: true,
	useUnifiedTopology: true
}
);

app.use(express.json());
app.use(cors()); // Use the cors middleware

const productSchema = new mongoose.Schema({
name: String,
type: String,
description: String,
price: Number,
image: String,
});

const Product = mongoose.model('Product', productSchema);

// Function to seed initial data into the database
const seedDatabase = async () => {
try {
	await Product.deleteMany(); // Clear existing data

	const products = [
	{
		name: 'Apple', type: 'Fruit',
		description: 'Fresh and crispy',
		price: 150,
		image:
'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
	},
	{
		name: 'Banana',
		type: 'Fruit',
		description: 'Rich in potassium',
		price: 75,
		image:
'https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
	},
	{
		name: 'Orange',
		type: 'Fruit',
		description: 'Packed with vitamin C',
		price: 200,
		image:
'https://images.pexels.com/photos/691166/pexels-photo-691166.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
	},
	{
		name: 'Carrot',
		type: 'Vegetable',
		description: 'Healthy and crunchy',
		price: 100,
		image:
'https://images.pexels.com/photos/1306559/pexels-photo-1306559.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
	},
	{
		name: 'Broccoli',
		type: 'Vegetable',
		description: 'Nutrient-rich greens',
		price: 175,
		image:
'https://media.istockphoto.com/id/579165978/photo/broccoli.jpg?s=1024x1024&w=is&k=20&c=GHhIogmmNQIPcMNHw5hJmeRzj4iwkYPO-VIa5mQKcMQ='
	},
	{
		name: 'Grapes',
		type: 'Fruit',
		description: 'Sweet and juicy',
		price: 250,
		image:
'https://images.pexels.com/photos/708777/pexels-photo-708777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
	},
	{
		name: 'Strawberry',
		type: 'Fruit',
		description: 'Delicious red berries',
		price: 300,
		image:
'https://images.pexels.com/photos/70746/strawberries-red-fruit-royalty-free-70746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
	},
	{
		name: 'Lettuce',
		type: 'Vegetable',
		description: 'Crisp and fresh',
		price: 120,
		image:
'https://images.pexels.com/photos/2893639/pexels-photo-2893639.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
	},
	{
		name: 'Tomato',
		type: 'Vegetable',
		description: 'Versatile and flavorful',
		price: 180,
		image:
'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
	},
	{
		name: 'Cucumber',
		type: 'Vegetable',
		description: 'Cool and hydrating',
		price: 130,
		image:
'https://images.pexels.com/photos/3568039/pexels-photo-3568039.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
	},

	];

	await Product.insertMany(products);
	console.log('Database seeded successfully');
} catch (error) {
	console.error('Error seeding database:', error);
}
};

// Seed the database on server startup
seedDatabase();

// Define API endpoint for fetching all products
app.get('/api/products', async (req, res) => {
try {
	// Fetch all products from the database
	const allProducts = await Product.find();

	// Send the entire products array as JSON response
	res.json(allProducts);
} catch (error) {
	console.error(error);
	res.status(500)
	.json({ error: 'Internal Server Error' });
}
});

app.listen(PORT, () => {
console.log(
	`Server is running on port ${PORT}`
);
});
