// This file is connect to schema and dataBase with Mo ngoDB

// Use mongoose
const mongoose = require('mongoose')

// Connect to MongoDB
const dbUrl = 'mongodb://localhost:27017/productDB'
mongoose.connect(dbUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).catch(err=>console.log(err))

// Create to schema
let productSchema = mongoose.Schema({
    name:String,
    price:Number,
    image:String,
    description:String
})

// create models
let Product = mongoose.model("products",productSchema)

// export models
module.exports = Product

// Method for save data from user
module.exports.saveProduct = function(model,data){
    model.save(data)
}