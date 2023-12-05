const express = require('express')
const router = express.Router()

// Use models
const Product = require('../models/products')

// UploadFile
const multer = require('multer')
// Create Storage
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/images/products') // Location of file
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+".jpg") // Protect same name of file
    }
})
// Use Storage
const upload = multer({
    storage:storage
})

// Cookie check Login
router.post('/login',(req,res)=>{
    const username = req.body.username
    const password = req.body.password
    const timeExpire = 1000000 // 1000Second

    if (username === "admin" && password === "123"){
        req.session.username = username
        req.session.password = password
        req.session.login = true
        req.session.cookie.maxAge = timeExpire
        res.redirect('/manage')
    }else {
        res.render('404')
    }
})
// Cookie check Logout
router.get('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        res.redirect('/manage')
    })
})

// Dynamic file (EJS) use render
router.get('/',(req,res)=>{
    Product.find().exec((err,doc)=>{
        res.render('index',{products:doc})
    })
})

// Rout add-product page check with Cookie
router.get('/add-product',(req,res)=>{
    if(req.session.login){
        res.render('form')
    }else{
        res.render('admin')
    }
})

// Rout manage page
router.get('/manage',(req,res)=>{
    if(req.session.login){
        Product.find().exec((err,doc)=>{
            res.render('manage',{products:doc})
        })
    }else{
        res.render('admin')
    }
})

// Delete Data
router.get('/delete/:id',(req,res)=>{
    Product.findByIdAndDelete(req.params.id,{userFindAndModify:false}).exec(err=>{
        if (err) console.log(err)
        res.redirect('/manage')
    })
})

// Request From user to store in Database
// Read data form form.ejs
router.post('/insert',upload.single("image"),(req,res)=>{
    let data = new Product({
        name:req.body.name,
        price:req.body.price,
        image:req.file.filename,
        description:req.body.description
    })
    Product.saveProduct(data,(err)=>{
        if(err) console.log(err)
    })
    res.redirect('/')
})

// Go to product Page Check with ID
router.get('/:id',(req,res)=> {
    const product_id = req.params.id
    Product.findOne({_id:product_id}).exec((err,doc)=>{
        res.render('product',{product:doc})
    })
})

router.post('/edit',(req,res)=>{
    const edit_id = req.body.edit_id
    Product.findOne({_id:edit_id}).exec((err,doc)=>{
        // show data to form
        res.render('edit',{product:doc})
    })
})
router.post('/update',(req,res)=>{
    // New data from form edit.EJS
    const update_id = req.body.update_id
    let data = {
        name:req.body.name,
        price:req.body.price,
        description:req.body.description
    }
    Product.findByIdAndUpdate(update_id,data,{userFindAndModify:false}).exec(err=>{
        res.redirect('/manage')
    })
})

module.exports = router