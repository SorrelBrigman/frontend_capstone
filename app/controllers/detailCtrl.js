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
      let user = e;
      votingFactory.upVote(user, currentProduct);
      $(".upVotes").hide();
    });
  };

});
