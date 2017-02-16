app.controller('detailCtrl',  function($scope, getProductFactory, $routeParams, authFactory, votingFactory, $location){
  //identify the product from the productID in the url
  let currentProduct = $routeParams.productID;


    //use the product ID to get that specific product from the
      //get product factory
   getProductFactory.getThisProduct(currentProduct)
   //then return that product object
   .then((e)=>{
    //load the modal with that product information
    $scope.thisProduct =  e;
    return $scope.thisProduct;
   })
   .then(()=>{

      //activates the modal on the dynamically created content
      $('.modal').modal();
      //open the modal
      $("#modal1").modal('open');
   });


   //if user clicks the flag item link
  $scope.flagItem = ()=> {
    //redirect them to the flag item page for that product
    $location.url(`/flag/${currentProduct}`);
  };


  //if user clicks the like button
   $scope.upVote = () => {
    //see if the user is logged in
    authFactory.getUser()
    //if the user is logged in
    .then((e) => {
      //get the array of who has voted for the product
      let whoVoted = $scope.thisProduct.votesArray;
      let user = e;
      //compare the user to the list of users who have already voted
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
      //update the # of votes in the detail view to reflect the users'
      //most recent vote
      let updatedVotes = ($scope.thisProduct.votesArray.length) + 1;
      $("p.numberOfVotes").text(`${updatedVotes} people like this`);
      //hide the vote button
      $(".upVotes").hide();
    })//end of then
    //if the user is not logged in
    .catch(()=>{
      //if they are not logged in
       Materialize.toast("Please log in to vote!", 4000, 'round right'); // 4000 is the duration of the toast
      //don't allow them to vote
    });
  };

});
