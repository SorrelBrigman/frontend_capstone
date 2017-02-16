app.controller('inReviewCtrl', function($scope, products, $location){


  //get all products from the resolve in the Angconfig for this view
  let allProducts = products;
  // $scope.listAll =  products;
  // console.log("products", products);
  //sort products so only those with less than 3 votes show on this page
  let productsInReview = [];
  for (let i = 0; i < allProducts.length; i++){
    if(allProducts[i].votesArray.length < 2) {
      let addThisProduct = allProducts[i];
      productsInReview.push(addThisProduct);
    }
  }

  $scope.listAll = productsInReview;

  $scope.openModule = (value)=> {

    let whichProduct = value;
    $location.url(`/details/${whichProduct}`);

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



});//end of controller
