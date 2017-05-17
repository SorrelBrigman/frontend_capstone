'use strict'

const CONFIG = require("./client/config/config.js");
console.log(CONFIG);

const express = require('express')
const app = express()
const amazon = require('amazon-product-api');


const {json} = require('body-parser');

app.use(json());

var client = amazon.createClient({
  awsId: CONFIG.key,
  awsSecret: CONFIG.secret,
  awsTag: "sorrelbrigman-20"
});


app.post('/api/amazon', (req, res, err) => {
  // console.log("amazon!!!");
  // console.log("req,body", req.body);
  // console.log("req.body.params.Keywords", req.body.params.Keywords);
  client.itemSearch({
    // Keywords :"piñon coffee",
    // responseGroup : "ItemAttributes,Offers,Images",
    // searchIndex : "Grocery"
    // responseGroup: 'ItemAttributes,Offers,Images'
    Keywords : req.body.params.Keywords,
    searchIndex: req.body.params.searchIndex,
    responseGroup: 'ItemAttributes,Offers,Images'
  }).then(function(results){

    res.send(results);
  }).catch(function(err){

    res.send(err);
  });
})



const PORT = process.env.PORT || 3000

app.use(express.static('client'))


//listen

    app.listen(PORT, () => {
    console.log(`Hey, I'm listening on port ${PORT}`);
    })
