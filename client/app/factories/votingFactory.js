app.factory('votingFactory', function($http) {
  return {
    upVote : (user, product) => {
      let thisProduct = product;
      let myVote = user.uid;
      console.log("product", thisProduct);
      console.log("user", myVote);
      return $http
      //an array of users, for each vote (limit by the users in the card)
        .post(`https://skb-capstone-frontend.firebaseio.com/products/${thisProduct}/votes/.json`, JSON.stringify(myVote));
    }
  };
});
