app.factory('flagFactory', function($http) {
  return {
    //take arguemnts from controller
    flagProduct : (user, flaggedProduct, comment) => {
      //assign them to vars
      //current user's uid:
      let thisUser = user.uid;
      //current products firebase key:
      let thisProduct = flaggedProduct;
      //take comment
      let flagComment = comment;

      //add user and comment to flag object
      let thisFlag = {
        user : thisUser,
        comment : flagComment
      };

      //post to firebase
      return $http
      //an array of users, for each vote (limit by the users in the card)
        .post(`https://skb-capstone-frontend.firebaseio.com/products/${thisProduct}/flags/.json`, JSON.stringify(thisFlag));
    }, //end of flagProduct()

    getFlags : (product) => {
      //take product object sent from controller
      let thisProduct = product;

      //create an empty array to hold any flag comments
        let flagComments = [];
      //if there are any flags on this product
      if (thisProduct.flags) {
        //parse the comments
        for(var key in thisProduct.flags) {
          let thisComment = thisProduct.flags[key].comment;
          //push to flagcomment array
          flagComments.push(thisComment);
        }//end of for in loop
      }//end of if statement
      //return flagComments array
      return flagComments;
    }, //end of getFlags()

    //take productkey
    deleteFlagProduct : (flaggedProduct) => {
      //assign to var
      let thisProduct = flaggedProduct;

      //delete from firebase
      return $http
      //an array of users, for each vote (limit by the users in the card)
        .delete(`https://skb-capstone-frontend.firebaseio.com/products/${thisProduct}/.json`);
    }//end of deleteFlagProduct()

  };//end of factory object
});//end of factory
