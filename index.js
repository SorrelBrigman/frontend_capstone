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
  console.log("amazon!!!");
  console.log("req,body", req.body);
  console.log("req.body.params.Keywords", req.body.params.Keywords);
  client.itemSearch({
    // Keywords :"piñon coffee",
    // responseGroup : "ItemAttributes,Offers,Images",
    // searchIndex : "Grocery"
    Keywords : req.body.params.Keywords,
    searchIndex: req.body.params.searchIndex,
    responseGroup: 'ItemAttributes,Offers,Images'
    // director: 'Quentin Tarantino',
    // actor: 'Samuel L. Jackson',
    // searchIndex: 'DVD',
    // audienceRating: 'R',
    // responseGroup: 'ItemAttributes,Offers,Images'
  }).then(function(results){
    console.log("results from request", results);
    res.send(results);
  }).catch(function(err){
    console.log(err);
  });
})



const PORT = process.env.PORT || 3000

app.use(express.static('client'))


//listen

    app.listen(PORT, () => {
    console.log(`Hey, I'm listening on port ${PORT}`);
    })
