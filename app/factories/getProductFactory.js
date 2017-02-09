app.factory('getProductFactory', function($http){
  return {
    getAllProducts : () => {
      //get all the products from firebase
      return $http
      .get('https://skb-capstone-frontend.firebaseio.com/products.json')
      //parse the return from firebase, just returning the data object
      .then((e)=>{
        console.log("from get factory .data", e.data);
        return e.data;
      })
      //turn the data object into an array
      .then((e)=>{
        let productList = e;
        let allProducts = [];
        for (var key in productList) {
          let myProduct = productList[key];
          console.log("myProduct", myProduct);
          myProduct.key = key;
          for (var votes in productList[key].votes){
            // myProduct.votesArray = [];
            myProduct.votesArray = [];
            let thisVote = productList[key].votes[votes];
            console.log("thisVote", thisVote);
            myProduct.votesArray.push(thisVote);
          }
          if (myProduct.votesArray) {
          myProduct.countVotes = myProduct.votesArray.length;
        };
          allProducts.push(myProduct);
        }
        console.log("allProducts", allProducts);
        return allProducts;
      });
    }, //end of getAllProducts()
    getThisProduct : (value) => {
      console.log("value", value);
      let thisProduct = value;
      //get specific product from firebase
      return $http
      .get(`https://skb-capstone-frontend.firebaseio.com/products/${thisProduct}/.json`)
      //parse the return from firebase, just returning the data object
      .then((e)=>{
        console.log("specific product object", e.data);
        return e.data;
      });
    }
  };
});
