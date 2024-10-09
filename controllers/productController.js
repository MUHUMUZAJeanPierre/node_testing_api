const Product = require('../models/productModel');

const getAllProducts = async(req,res)=>{
    try {
        const products = await Product.find({});
        res.status(200).json({message:"Product successfully retrieved", data: products});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getProductById = async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        if(!product)  {
           return res.status(404).json({message:`Product not found with ID ${id}`})
        }
        res.status(200).json({message:"Product successfully retrieved", data: product});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const createProduct = async(req,res)=>{
    try {
        const product = await Product.create(req.body);
        res.status(201).json({message:"Product successfully created", data: product});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateProduct = async(req,res)=>{
    try {
        const {id} = req.params
        const product = await Product.findByIdAndUpdate(id, req.body, {new: true});
        if(!product)  {
            return res.status(404).json({message:`Product not found with ID ${id}`})
        }
        res.status(200).json({message:"Product  updated successfully", data: product});
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const deleteProduct = async(req,res)=>{
    try {
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id);
        if(!product)  {
            return res.status(404).json({message:`Product not found with ID ${id}`})
        }
        res.status(200).json({message:"Product deleted successfully", data: product});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    getAllProducts, 
    getProductById, 
    createProduct, 
    updateProduct, 
    deleteProduct
};