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
        //assign return from firebase to a var
        let productList = e;
        //create an empty array to hold parsed products
        let allProducts = [];
        //loop through return from firebase
        for (var key in productList) {
          let myProduct = productList[key];
          //make the key an accessible key:value pair
          myProduct.key = key;
          //take the votes from firebase and parse into an array of votes
          myProduct.votesArray = [];
          //for each vote in the votes object from firebase
          for (var votes in productList[key].votes){
            //gather the user.uid for each vote
            let thisVote = productList[key].votes[votes];
            //push that user id to the votes array so that it is more accessible in the app
            myProduct.votesArray.push(thisVote);
          }
          //if the product has votes (and thus has a votes array)
          if (myProduct.votesArray) {
            //take the votesarray, and quantifying it into a vote count
              //adding one to make up for the zero start of array's
          myProduct.countVotes = (myProduct.votesArray.length) + 1;
        }
        //push the parsed product to the product array
          allProducts.push(myProduct);
        }
        //return the array of parsed products
        return allProducts;
      });//end of then
    }, //end of getAllProducts()

    //argument from controller is the productKey from firebase
    getThisProduct : (value) => {
      //assign the key to a var
      let thisProduct = value;
      //get specific product from firebase
      return $http
      .get(`https://skb-capstone-frontend.firebaseio.com/products/${thisProduct}/.json`)
      //parse the return from firebase, just returning the data object
      .then((e)=>{
        //create an empty array to hold the array of users who votes for the product
        e.data.votesArray = [];
        //loop through the votes for the product
        for (var votes in e.data.votes){
            //parse the user who voted for the product
            let thisVote = e.data.votes[votes];
            //push their user uid to the votes array
            e.data.votesArray.push(thisVote);
          }
          //if users have voted for the product
          if (e.data.votesArray) {
            //take the votesarray, and quantifying it into a vote count
              //adding one to make up for the zero start of array's
          e.data.countVotes = (e.data.votesArray.length) + 1;
        }
        //return the project object
        return e.data;
      });//end of then
    },//end of getThisProduct()

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
        //assign return from firebase to a var
        let productList = e;
        //create an empty array to house the product links
        let allProductLinks = [];
        //loop through the products
        for (var key in productList) {
          //parse each product's link
          let myProductLink = productList[key].link;
          //push each product link to the array
          allProductLinks.push(myProductLink);
        }//end of for loop
        //return the array of links
        return allProductLinks;
      });//end of then
    }, //end of getAllProductLinks()

    getAllProductASINs : () => {
      //get all the products from firebase
      return $http
      .get('https://skb-capstone-frontend.firebaseio.com/products.json')
      //parse the return from firebase, just returning the data object
      .then((e)=>{
        return e.data;
      })//end of then
      //turn the data object into an array
      .then((e)=>{
        //assign return to a var
        let productList = e;
        //create an empty array to house amazon unique product numbers
        let allProductASIN = [];
        //loop through the products
        for (var key in productList) {
          //parse the ASIN
          let myProductASIN = productList[key].amazonUniqueId;
          //push that ASIN to the array of ASINs
          allProductASIN.push(myProductASIN);
        }//end of for loop
        //return the array of ASINs
        return allProductASIN;
      });//end of then
    }, //end of getAllProductsASIN()
  };//end of factory object
});//end of factory
