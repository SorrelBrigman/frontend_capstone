app.controller('inReviewCtrl', function($scope, products, $location, authFactory, votingFactory, $routeParams){


  //get all products from the resolve in the Angconfig for this view
  let allProducts = products;

  //sort products so only those with less than 3 votes show on this page
  let productsInReview = [];
  for (let i = 0; i < allProducts.length; i++){
    if(allProducts[i].votesArray.length <= 2) {
      let addThisProduct = allProducts[i];
      //convert the # of votes, into the number of votes needed
        // to add to the collection
      addThisProduct.votesNeeded = (3 - addThisProduct.votesArray.length);
      //push that product into the products in Review array
      productsInReview.push(addThisProduct);
    }
  }
  //add the products in Review array to the page
  $scope.listAll = productsInReview;

  $scope.limitCat = $routeParams.productCat;

  //opens the modal into the detail view of the product
  $scope.openModule = (value)=> {
    //takes the product key
    let whichProduct = value;
    //goes to the detail card view, which uses routeparams to get info for the product
    $location.url(`/details/${whichProduct}`);

  };


  //able to flag items in the in Review page
  $scope.flagItem = (value)=> {
    //check to see if the user is logged in
    authFactory.getUser()
    .then((e) => {
      //if so, redirect to the flag modal for that product
      let whichProduct = value;
      $location.url(`/flag/${whichProduct}`);
    }) // end of then
    .catch(()=>{
       //if they are not logged in
        Materialize.toast("Please log in to flag an item!", 4000, 'round right'); // 4000 is the duration of the toast
          //don't allow them to flag

    });//end of catch

  }; //end of flagItem


//user able to vote for the product by clicking the thumbs up
  $scope.upVote = (product, votes) => {
    //see if the user is logged in
    authFactory.getUser()
    //if so
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
        }//end of if statement
      }//end of for loop
      //otherwise add their vote to the product
      votingFactory.upVote(user, thisProduct)
      //after the vote has been added,
      .then(()=>{
        //open the detail view of the product
        $scope.openModule(thisProduct);
      });//end of inner then
    })//end of outer then (checking for user)
    .catch(()=>{
        //if they are not logged in
        Materialize.toast("Please log in to vote!", 4000, 'round right'); // 4000 is the duration of the toast
          //don't allow them to vote

      });//end of catch
    };//end of upVote()



});//end of controller
