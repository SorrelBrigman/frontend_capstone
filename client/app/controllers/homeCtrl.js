app.controller('homeCtrl',  function($scope, products, getProductFactory, $routeParams, $location, authFactory, votingFactory){

  let allProducts = products;

  //sort products so only those with  3  or more votes show on this page
  let productsInCollection = [];
  for (let i = 0; i < allProducts.length; i++){
    if(allProducts[i].votesArray.length > 2) {
      let addThisProduct = allProducts[i];
      productsInCollection.push(addThisProduct);
    }
  }

  $scope.listAll = productsInCollection;




    // $scope.listAll =  products;



  $scope.limitCat = $routeParams.productCat;


  $scope.openModule = (value)=> {

    let whichProduct = value;
    $location.url(`/details/${whichProduct}`);

  };

  $scope.flagItem = (value)=> {
    authFactory.getUser()
    .then((e) => {
      let whichProduct = value;
      $location.url(`/flag/${whichProduct}`);
    })
    .catch(()=>{
       //if they are not logged in
        Materialize.toast("Please log in to flag an item!", 4000, 'round right'); // 4000 is the duration of the toast
          //don't allow them to flag

    });

  };


  $scope.upVote = (product, votes) => {
    authFactory.getUser()
    .then((e) => {
      let thisProduct = product;
      let whoVoted = votes;
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
      votingFactory.upVote(user, thisProduct)
      .then(()=>{
        $scope.openModule(thisProduct);
      });
    })
    .catch(()=>{
        //if they are not logged in
        Materialize.toast("Please log in to vote!", 4000, 'round right'); // 4000 is the duration of the toast
          //don't allow them to vote

      });
    };

});
