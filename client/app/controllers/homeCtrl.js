app.controller('homeCtrl',  function($scope, products, getProductFactory, $routeParams, $location, authFactory, votingFactory){

  //find any nav links with the active class
$('a.active').removeClass("active");
//remove active class
//apply active class to home nav link
$("a.home").addClass("active");


  //load in product from the resolve
  let allProducts = products;

  //sort products so only those with  3  or more votes show on this page
  let productsInCollection = [];
  for (let i = 0; i < allProducts.length; i++){
    if(allProducts[i].votesArray.length > 2) {
      let addThisProduct = allProducts[i];
      productsInCollection.push(addThisProduct);
    }
  }
//load products with 3 or more likes to the page
  $scope.listAll = productsInCollection;

  //can take category from url to sort products, utilizing route params
  $scope.limitCat = $routeParams.productCat;
  console.log("limitCat", $scope.limitCat);

  //find any Categorynav links with the active class
  //remove active class
  $('a.activeCat').removeClass("activeCat");
  //if on the product category page
  if($scope.limitCat) {
    let currentCat = $scope.limitCat;
    $(`a.${currentCat}`).addClass("activeCat");
  } else {
    $(`a.allCat`).addClass("activeCat");
  }
  //apply active class to home nav link
  $("a.home").addClass("active");



  //if user clicks on product, will open detail modal
  $scope.openModule = (value)=> {
    //takes the product key, and uses that as a param to itentify which product
    let whichProduct = value;
    //redirects the user to that detail page
    $location.url(`/details/${whichProduct}`);
  };

  //if user clicks to flag an item
  $scope.flagItem = (value)=> {
    //makes sure the user is logged in
    authFactory.getUser()
    //if so
    .then((e) => {
      //redirect user to the flag modal for that product, taking the productID
      //and using it as a routeparam in next controller
      let whichProduct = value;
      $location.url(`/flag/${whichProduct}`);
    })
    .catch(()=>{
       //if they are not logged in
        Materialize.toast("Please log in to flag an item!", 4000, 'round right'); // 4000 is the duration of the toast
          //don't allow them to flag

    });

  };

    //if user clicks to like/upvote a product
  $scope.upVote = (product, votes) => {
    //check to see if the user is logged in
    authFactory.getUser()
    //if so
    .then((e) => {
      //take the product key
      let thisProduct = product;
      //look at list of users who have already voted
      let whoVoted = votes;
      //assign the user uid to a var
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
      //then
      .then(()=>{
        //open up the detail modal for the product
        $scope.openModule(thisProduct);
      });//end of inner then
    }) //end of outter then (checking for user)
    .catch(()=>{
        //if they are not logged in
        Materialize.toast("Please log in to vote!", 4000, 'round right'); // 4000 is the duration of the toast
          //don't allow them to vote

      });//end of catch
    };//end of upVote()

});// end of controller
