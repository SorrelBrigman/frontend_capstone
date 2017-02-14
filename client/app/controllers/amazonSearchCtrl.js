app.controller('amazonSearchCtrl',function($scope, $http){

  $scope.amazonSearchQuery = {
    searchIndex: "",
    Keywords: "",
    responseGroup: 'ItemAttributes,Offers,Images'
  }

  $scope.searchAmazon = () => {
    console.log("amazonSearchQuery", $scope.amazonSearchQuery)
    $scope.getAmazon();
  };

  $scope.getAmazon = () => {
    $http.post('/api/amazon',
      {params: { "searchIndex" : $scope.amazonSearchQuery.searchIndex,
                 "Keywords" : $scope.amazonSearchQuery.Keywords,
                 "responseGroup": "ItemAttributes,Offers,Images"}})
    .then((things) => {
        console.log(things.data);
        let searchResults = [];
        for (var i = 0; i < things.data.length; i++) {
          let searchProduct = {};
          searchProduct.productTitle = things.data[i].ItemAttributes[0].Title[0];
          console.log("title", searchProduct.productTitle);
          searchProduct.productCompany = things.data[i].ItemAttributes[0].Brand[0];
          console.log("company", searchProduct.productCompany);

          if(things.data[i].ImageSets) {
            searchProduct.productImage = things.data[i].ImageSets[0].ImageSet[0].LargeImage[0].URL[0];
            console.log("productImage", searchProduct.productImage);
            if(things.data[i].ItemAttributes[0].ListPrice) {
              searchProduct.listPrice = things.data[i].ItemAttributes[0].ListPrice[0].FormattedPrice[0];
            console.log("price", searchProduct.listPrice);
            }
            searchProduct.itemDescription = "";
          for (var j = 0; j < things.data[i].ItemAttributes[0].Feature.length; j++) {
            searchProduct.itemDescription += things.data[i].ItemAttributes[0].Feature[j] + ". ";
            };
            console.log("description", searchProduct.itemDescription);
          }
          searchProduct.productLink = things.data[i].DetailPageURL[0];
          console.log("link", searchProduct.productLink);
          searchProduct.amazonUniqueId = things.data[i].ASIN[0];
          console.log("ASIN", searchProduct.amazonUniqueId);
          searchProduct.addDate = new Date();
          console.log("date", searchProduct.addDate);
          searchResults.push(searchProduct);
        };
        console.log("searchResults", searchResults);
        $scope.searchResults = searchResults;
    })
  }


      // $('select').material_select();



});


// my key AKIAJXXFIMAXVEXQ354Q
//Signature key: CUzVp0CPbLCpbdTXUrmfnEZstpJ/6gbbCRnLsT9C

// example amazon api call:

// http://webservices.amazon.com/onca/xml?Service=AWSECommerceService&
//         Operation=ItemSearch&
//         AWSAccessKeyId=AKIAJXXFIMAXVEXQ354Q&
//         AssociateTag=sorrelbrigman-20&
//         Keywords=Harry%20Potter&
//         ResponseGroup=Images%2CItemAttributes%2COffers&
//         SearchIndex=Books&
//         Timestamp=2015-08-11T17%3A51%3A56.000Z&
//         Signature=w1cntxdHX+NuiaEBSFKweQIShxurfiZq/z42I72K



//   let today = new Date();
//   let todayISO = today.toISOString();
//   let urlTimeStamp = escape(todayISO);


// //node code from stackoverflow
// var request = require("request");
// var crypto = require("crypto");
// var d = new Date().toUTCString();
// var config = {
//   awsAccessKeyId : "AKIAJXXFIMAXVEXQ354Q",
//   awsSecretKey   : "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"
// };

// // Options for the http POST request
// var options = {
//   "headers" : {
//     "Date"   : d, // Must pass the Date header as well as the X-Amzn-Authorization header
//     "X-Amzn-Authorization" : "AWS3-HTTPS AWSAccessKeyId=" + config.awsAccessKeyId +
//       ",Algorithm=HMACSHA256,Signature=" + generateHmac(d, config.awsSecretKey)
//   },
//   "form"    : {
//   }
// };


// function generateHmac (data, awsSecretKey, algorithm, encoding) {
//   encoding = encoding || "base64";
//   algorithm = algorithm || "sha256";
//   return crypto.createHmac(algorithm, awsSecretKey).update(data).digest(encoding);
// }


// var amazon = require('amazon-product-api');

// var client = amazon.createClient({
//   awsId: "AKIAJXXFIMAXVEXQ354Q",
//   awsSecret: "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",
//   awsTag: "sorrelbrigman-20"
// });

// client.itemSearch({
//   director: 'Quentin Tarantino',
//   actor: 'Samuel L. Jackson',
//   searchIndex: 'DVD',
//   audienceRating: 'R',
//   responseGroup: 'ItemAttributes,Offers,Images'
// }).then(function(results){
//   console.log(results);
// }).catch(function(err){
//   console.log(err);
// });








// $http.get(`http://webservices.amazon.com/onca/xml?AWSAccessKeyId=AKIAIQAVHDMK5HGBAEEA&AssociateTag=sorrelbrigman&Keywords=pi%C3%B1on%20coffee&Operation=ItemSearch&ResponseGroup=Images%2CItemAttributes%2COfferSummary&SearchIndex=Grocery&Service=AWSECommerceService&Timestamp=2017-02-13T15%3A37%3A16.000Z&Signature=CDD8F1%2FBiBaY0%2FIr6R2E8dv7HCt3vP1Vl8Tq9yXxVEM%3D`)
//   .then((e)=>{
//     console.log("e", e);
//   })
//   .catch((e)=>{
//     console.log("error", e);
//   });



//QcEoo9MqKiokQKAjr6mMfhotHgQmerco3AHZvYizPEM%3D
