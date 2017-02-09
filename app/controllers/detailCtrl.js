app.controller('detailCtrl',  function($scope, getProductFactory, $routeParams, authFactory, votingFactory){
  let currentProduct = $routeParams.productID;
    console.log("specific", currentProduct);
   getProductFactory.getThisProduct(currentProduct)
   .then((e)=>{
    $scope.thisProduct =  e;
    console.log("scope.thisProduct", $scope.thisProduct);
    return $scope.thisProduct;
   })
   .then(()=>{

      //activates the modal on the dynamically created content
      $('.modal').modal();
      //open the modal
      $("#modal1").modal('open');
   });

   $scope.upVote = () => {
    authFactory.getUser()
    .then((e) => {
      console.log("I've been voted!");
      console.log("SCOPE", currentProduct);
      let whoVoted = $scope.thisProduct.votesArray;
      console.log("whoVoted", whoVoted);
      let user = e;
      for (var i = 0; i < whoVoted.length; i++) {
        console.log("whoVoted[i]", whoVoted[i]);
        console.log("user in functoin", user);
        if(user.uid === whoVoted[i]) {
          console.log("I'm true!!!!");
           // Materialize.toast(message, displayLength, className, completeCallback);
          Materialize.toast("You're already voted for this product!", 4000, 'round right'); // 4000 is the duration of the toast
          return;
        }
      }
      votingFactory.upVote(user, currentProduct);
      $(".upVotes").hide();
    });
  };

});
