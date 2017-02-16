app.controller('flagCtrl',  function($scope, getProductFactory, $routeParams, authFactory, flagFactory, $location){

  //initinalize the modal class per materialize
  $('.modal').modal();

  //take the product key from the url
  let currentProduct = $routeParams.productKey;
  //get that products' object from the get factory
   getProductFactory.getThisProduct(currentProduct)
   //the object is returned from the factory
   .then((e)=>{
    //load the product onto the page
    $scope.flaggedProduct =  e;
    //load in previous comments from previous flaggind
    $scope.flagComments = flagFactory.getFlags($scope.flaggedProduct);
      return $scope.flaggedProduct;
   })
   .then((e)=>{
      //open the modal
      $("#modal3").modal('open');
   });


//if the user clicks the flag the product button
  $scope.flagProduct = (flaggedProduct) => {
    //get the user id
    authFactory.getUser()
    .then((e) => {
      //take the flag objects for the item
      let theseFlags = $scope.flaggedProduct.flags;
      //create an empty arry to house the users who have previously
        //flagged the item
      let whoFlagged = [];
      //create an array of users from the collection of flag objects
      for(var flagKey in theseFlags) {
        let thatUser = theseFlags[flagKey].user;
        whoFlagged.push(thatUser);
        }
        //user from the auth factory is assigned a var
      let user = e;
      //if anyone has flagged the product already
      if (whoFlagged.length > 0) {
        //iterate though the array of previous users who has flagged the item
        for (var i = 0; i < whoFlagged.length; i++) {
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

      //otherwise add their flag to the product
      //take the user comment
      let comment = $scope.flagComment;
      //and the product key
      let thisProduct = $routeParams.productKey;
      //call the flag factory, passing the info to the factory
      flagFactory.flagProduct(user, thisProduct, comment)
        .then((e)=>{
              //let the user know the product has been successfully flagged
          Materialize.toast("Thank you for bringing this to our attention.", 4000, 'round right'); // 4000 is the duration of the toast
          // add one to the previous number of  flags on that item
          let currentFlagNumber = whoFlagged.length + 2;
          //count the number of flags
          // if the new # of flags is greater than or equal to 3
          if(currentFlagNumber >= 3) {
            //delete the item from the collection of products
            flagFactory.deleteFlagProduct(thisProduct)
            .then(()=>{
              //refirect the user back to the homepage
              $location.url("/");
            });//end of innerthen
          }//end of if
        })//end of outer then
        //if there is an issue with adding the flag
        .catch((error)=> {
          console.log("errror", error);
        });
        //close the flag modal
      $("#modal3").modal('close');
    }); //end of then after authFactory
  }; // end of flag Product function
}); // end of controller
