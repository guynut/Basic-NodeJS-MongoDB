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
let userSchema = mongoose.Schema({
    username:String,
    password:String
})

// create models
let User = mongoose.model("user",userSchema)

// export models
module.exports = User

// Method for save data from user
module.exports.addUser = function(model,data){
    model.save(data)
}