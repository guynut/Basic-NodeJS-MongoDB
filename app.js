const express = require('express')
const path = require('path')
const router = require('./routes/myRouter')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const app  = express()

// This line for POST method to see inside object
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(session({secret:"mysession",resave:false,saveUninitialized:false}))
app.use(router)
app.use(express.static(path.join(__dirname,'public')))

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

app.listen(8080,()=>{
    console.log("run sever on port 8080")
})