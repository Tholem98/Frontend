const express = require('express');
const routes = express.Router();

routes.post('/',  (req,res)=>{
    req.session.username = req.body.username;
    req.session.coins = req.body.coins;
    user = req.session.username
    coins = req.session.coins
    res.redirect('/')
    })
    
    routes.get('/', async (req,res)=>{
      var request = require('request');
    
    
        request({
           method: 'GET',
           url: 'https://aerolab-challenge.now.sh/products',
           headers: {
             'Content-Type': 'application/json',
             'Accept': 'application/json',
             'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2IxMTNiMWVhMWExMjAwNmNiNjUxMzAiLCJpYXQiOjE1NTUxMDg3ODV9.x9a4_E5eVwnjOmpagTFKJYxP1bC2QMOjiGyUuWHf3us'
          }},  function (error, response, body) {
            console.log('Status:', response.statusCode);
            const session = require('express-session')
            const arraySort = require('array-sort')
            let prod = arraySort(JSON.parse(body),'cost',{reverse:true});
            const prodr=arraySort(JSON.parse(body),'_id');
            const prodl=arraySort(JSON.parse(body),'cost')
    
    
            if(req.session.username){
           res.render('index.ejs',{
             prod,prodr,prodl,
             user:req.session.username,
            coins: req.session.coins,
             })
           
          }else{
            res.render('index.ejs',{
              prod,prodr,prodl,
              user:req.session.username,
              coins: '',
              })
          }
             });
          })
module.exports = routes    