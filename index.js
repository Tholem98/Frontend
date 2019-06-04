const express = require('express');
const path = require('path');
const cookieParser=require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')




//INITIALIZATION
const app=express()


//SETTING
app.set('port',process.env.PORT || 3000);
app.set('views',path.join(__dirname,'views'))
app.set('view engine', 'ejs')

//MIDLEWARES
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:false}))
app.use(session({
  secret: 'Aerolab',
  resave: false,
  saveUninitialized: false
}))


app.use(express.urlencoded({extended:false}));
app.use(express.json());

//ROUTES
app.use(require('./routes/router'))

// STATIC FILES
app.use(express.static(path.join(__dirname,'public')))

// SERVER
app.listen(app.get('port'),()=>console.log('server on Port:',app.get('port')));

module.exports = app