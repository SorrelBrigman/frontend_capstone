app.factory('getProductFactory', function($http){
  return {
    getAllProducts : () => {
      //get all the products from firebase
      return $http
      .get('https://skb-capstone-frontend.firebaseio.com/products.json')
      //parse the return from firebase, just returning the data object
      .then((e)=>{
        return e.data;
      })
      //turn the data object into an array
      .then((e)=>{
        let productList = e;
        let allProducts = [];
        for (var key in productList) {
          let myProduct = productList[key];
          myProduct.key = key;
          myProduct.votesArray = [];
          for (var votes in productList[key].votes){
            // myProduct.votesArray = [];
            let thisVote = productList[key].votes[votes];
            myProduct.votesArray.push(thisVote);
          }
          if (myProduct.votesArray) {
          myProduct.countVotes = myProduct.votesArray.length;
        }
          allProducts.push(myProduct);
        }
        return allProducts;
      });
    }, //end of getAllProducts()
    getThisProduct : (value) => {
      let thisProduct = value;
      //get specific product from firebase
      return $http
      .get(`https://skb-capstone-frontend.firebaseio.com/products/${thisProduct}/.json`)
      //parse the return from firebase, just returning the data object
      .then((e)=>{
        e.data.votesArray = [];
        for (var votes in e.data.votes){
            // myProduct.votesArray = [];
            let thisVote = e.data.votes[votes];
            e.data.votesArray.push(thisVote);
          }
          if (e.data.votesArray) {
          e.data.countVotes = e.data.votesArray.length;
        }
        return e.data;
      });
    },
    getAllProductLinks : () => {
      //get all the products from firebase
      return $http
      .get('https://skb-capstone-frontend.firebaseio.com/products.json')
      //parse the return from firebase, just returning the data object
      .then((e)=>{
        return e.data;
      })
      //turn the data object into an array
      .then((e)=>{
        let productList = e;
        let allProductLinks = [];
        for (var key in productList) {
          let myProductLink = productList[key].link;
          console.log("myProduct",myProductLink );
          allProductLinks.push(myProductLink);
        }
        console.log("allProductLinks", allProductLinks);
        return allProductLinks;
      });
    }, //end of getAllProducts()
  };
});
