app.controller('flagCtrl',  function($scope, getProductFactory, $routeParams, authFactory, flagFactory, $location){
      $('.modal').modal();
  let currentProduct = $routeParams.productKey;
    console.log("specific", currentProduct);
   getProductFactory.getThisProduct(currentProduct)
   .then((e)=>{
    $scope.flaggedProduct =  e;
    console.log("flaggedProduct", $scope.flaggedProduct);
    //load in previous comments from previous flaggind
    $scope.flagComments = flagFactory.getFlags($scope.flaggedProduct);
      return $scope.flaggedProduct;

   })
   .then((e)=>{
      console.log("trying to open modal");
      //activates the modal on the dynamically created content

      //open the modal
      $("#modal3").modal('open');

   });



  $scope.flagProduct = (flaggedProduct) => {
    authFactory.getUser()
    .then((e) => {
      //need to turn it to whoFlagged into an array
      let theseFlags = $scope.flaggedProduct.flags;
      console.log("theseFlags", theseFlags);
      let whoFlagged = [];
      for(var flagKey in theseFlags) {
        let thatUser = theseFlags[flagKey].user;
        whoFlagged.push(thatUser);
        }
        console.log("whoFlagged", whoFlagged);
      let user = e;
      //if anyone has flagged the product already
      if (whoFlagged.length > 0) {
        console.log("inside if");
        for (var i = 0; i < whoFlagged.length; i++) {
                  console.log("inside for loop");
          //if the user id matches one of the user.uid's who has already voted
          if(user.uid === whoFlagged[i]) {
                    console.log("inside if user");
            //tell them they have already flagged
             // Materialize.toast(message, displayLength, className, completeCallback);
            Materialize.toast("You've already flagged this product!", 4000, 'round right'); // 4000 is the duration of the toast
            //don't allow them to flag the product
            return;
          }//end of if
        }//end of for loop
      }//end of if
          let comment = $scope.flagComment;
          let thisProduct = $routeParams.productKey;
      //otherwise add their flag to the product
      flagFactory.flagProduct(user, thisProduct, comment)
        .then((e)=>{

          console.log("whatever cameback from flagging", e);

      Materialize.toast("Thank you for bringing this to our attention.", 4000, 'round right'); // 4000 is the duration of the toast
      // add one to the previous number of  flags on that item
      let currentFlagNumber = whoFlagged.length + 2;
      console.log("currentFlagNumber", currentFlagNumber);
      // if the new # of flags is greater than or equal to 3
      if(currentFlagNumber >= 3) {
        //delete the item from the collection of products
        flagFactory.deleteFlagProduct(thisProduct)
        .then(()=>{
          //refirect the user back to the homepage
          $location.url("/");
        });
      }

      //count the number of flags
      //if flag # = 3, remove product
        })
        .catch((error)=>{
          console.log("errror", error);
        });
      $("#modal3").modal('close');
    });



  };
});
