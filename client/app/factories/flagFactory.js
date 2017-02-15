app.factory('flagFactory', function($http) {
  return {
    flagProduct : (user, flaggedProduct, comment) => {
      let thisUser = user.uid;
      let thisProduct = flaggedProduct;
      //require comment
      //take comment
      let flagComment = comment;
      console.log("user", thisUser);
      console.log("thisProduct", thisProduct);
      console.log("flagComment", flagComment);
      //add to flag object
      let thisFlag = {
        user : thisUser,
        comment : flagComment
      };
      console.log("thisFlag", thisFlag);
      //post to firebase
      return $http
      //an array of users, for each vote (limit by the users in the card)
        .post(`https://skb-capstone-frontend.firebaseio.com/products/${thisProduct}/flags/.json`, JSON.stringify(thisFlag));


    }, //end of flagProduct()
    getFlags : (product) => {
      let thisProduct = product;
      console.log("thisProduct");
      //create an empty array to hold any flag comments
        let flagComments = [];
      //if there are any flags on this product
      if (thisProduct.flags) {
        //parse the comments
        for(var key in thisProduct.flags) {
          let thisComment = thisProduct.flags[key].comment;
          flagComments.push(thisComment);
        }
      }
      console.log("flagComments", flagComments);
      return flagComments;
    }
  };//end of factory object
});//end of factory
