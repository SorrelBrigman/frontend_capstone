app.controller('detailCtrl',  function($scope, getProductFactory, $routeParams, authFactory, votingFactory, $location){
  let currentProduct = $routeParams.productID;
    console.log("specific", currentProduct);
   getProductFactory.getThisProduct(currentProduct)
   .then((e)=>{
    $scope.thisProduct =  e;
    return $scope.thisProduct;
   })
   .then(()=>{

      //activates the modal on the dynamically created content
      $('.modal').modal();
      //open the modal
      $("#modal1").modal('open');
   });

$scope.flagItem = ()=> {


    $location.url(`/flag/${currentProduct}`);

  };



   $scope.upVote = () => {
    authFactory.getUser()
    .then((e) => {
      let whoVoted = $scope.thisProduct.votesArray;
      let user = e;
      for (var i = 0; i < whoVoted.length; i++) {
        //if the user id matches one of the user.uid's who has already voted
        if(user.uid === whoVoted[i]) {
          //tell them they have already votes
           // Materialize.toast(message, displayLength, className, completeCallback);
          Materialize.toast("You're already voted for this product!", 4000, 'round right'); // 4000 is the duration of the toast
          //don't allow them to vote
          return;
        }
      }
      //otherwise add their vote to the product
      votingFactory.upVote(user, currentProduct);
      $(".upVotes").hide();
    });
  };

});
