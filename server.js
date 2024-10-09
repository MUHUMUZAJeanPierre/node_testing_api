const express = require('express');
const mongoose = require('mongoose')
const productRoutes = require('./routes/productRoutes')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended:false}))

app.use('/products', productRoutes)


mongoose.connect('mongodb://localhost:27017/learn').then(()=>{
    console.log("connection successfully");
    app.listen(port, ()=>{
        console.log('Node api os running on port 3000 ')
      })
    
}).catch(()=>{
    console.log('error in connection');
    
})