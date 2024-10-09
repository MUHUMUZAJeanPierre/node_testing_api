// tests/productModel.test.js

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Product = require('../models/productModel'); // Adjust the path as necessary

let mongoServer;

beforeAll(async () => {
    // Start the in-memory MongoDB server
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    // Connect to the in-memory database
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

afterAll(async () => {
    // Stop the in-memory MongoDB server and close the connection
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Product Model Test', () => {

    it('should create and save a product successfully', async () => {
        const validProduct = new Product({
            name: 'Sample Product',
            quantity: 10,
            price: 25,
            image: 'sample-image.jpg'
        });

        const savedProduct = await validProduct.save();

        // Check if all fields are saved correctly
        expect(savedProduct._id).toBeDefined();
        expect(savedProduct.name).toBe('Sample Product');
        expect(savedProduct.quantity).toBe(10);
        expect(savedProduct.price).toBe(25);
        expect(savedProduct.image).toBe('sample-image.jpg');
    });

    it('should set a default value for quantity if not provided', async () => {
        const productWithoutQuantity = new Product({
            name: 'No Quantity Product',
            price: 30
        });

        const savedProduct = await productWithoutQuantity.save();

        // Quantity should default to 0 if not provided
        expect(savedProduct.quantity).toBe(0);
    });

    it('should throw an error if a required field is missing', async () => {
        const productWithoutRequiredField = new Product({
            quantity: 5,
            price: 10
        });

        let err;
        try {
            await productWithoutRequiredField.save();
        } catch (error) {
            err = error;
        }

        // The name field is required, so the save should fail
        expect(err).toBeDefined();
        expect(err.errors.name).toBeDefined();
        expect(err.errors.name.message).toBe('Path `name` is required.');
    });

    it('should allow saving without the image field', async () => {
        const productWithoutImage = new Product({
            name: 'Product Without Image',
            quantity: 10,
            price: 20
        });

        const savedProduct = await productWithoutImage.save();

        // Image is optional, so it should not affect saving
        expect(savedProduct.image).toBeUndefined();
    });
});
