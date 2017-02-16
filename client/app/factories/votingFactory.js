app.factory('votingFactory', function($http) {
  return {
    //take user and product key from the controller
    upVote : (user, product) => {
      //assign them to vars
      let thisProduct = product;
      //parsing the current user's uid to post as a vote
      let myVote = user.uid;
      //post the vote to firebase
      return $http
      //an array of users, for each vote (limit by the users in the card)
        .post(`https://skb-capstone-frontend.firebaseio.com/products/${thisProduct}/votes/.json`, JSON.stringify(myVote));
    }//end upVote()
  };//end of the factory object
});//end of the factory
