app.controller('amazonSearchCtrl',function($scope, $http, addProductFactory, amazonFactory){

  $scope.amazonSearchQuery = {
    searchIndex: "",
    Keywords: "",
    responseGroup: 'ItemAttributes,Offers,Images'
  };

  // $scope.searchAmazon = () => {
  //   console.log("amazonSearchQuery", $scope.amazonSearchQuery);
  //   $scope.getAmazon();
  // };

  $scope.getAmazon = () => {
    //convert search query into an object
    $scope.amazonSearchQuery = {
      searchIndex: $scope.amazonSearchQuery.searchIndex,
      Keywords: $scope.amazonSearchQuery.Keywords,
      responseGroup: 'ItemAttributes,Offers,Images'
     };
     amazonFactory.getAmazon($scope.amazonSearchQuery)
      .then((e)=>{
        //get the returned researchs and load them to the page
        $scope.searchResults = e;
      });//end of then
    };



  $scope.addProduct = (product) => {
     //activates the modal on the dynamically created content
    $('.modal').modal();
     //open the modal
    $("#modal2").modal('open');
    $scope.thisProduct = product;
  };

   $scope.amazonAdd = (value) =>{
    console.log("I've been clicked");
      let newProduct = value;
      newProduct.compWeb = $scope.web;
      newProduct.uscompany = $scope.uscompany;
      newProduct.usassembled = false;
      newProduct.usmanufactured = false;
      amazonFactory.addAmazon(newProduct)
      // if($scope.uscompany === undefined) {
      //   newProduct.uscompany = false;
      // } else {
      //   newProduct.uscompany = $scope.uscompany;
      // }
      // if ($scope.usassembled === undefined) {
      //   newProduct.usassembled = false;
      // } else {
      //   newProduct.usassembled = $scope.usassembled;
      // }
      // if ($scope.usmanufactured === undefined) {
      //   newProduct.usmanufactured = false;
      // } else {
      //   newProduct.usmanufactured = $scope.usmanufactured;
      // }
      //  if (newProduct.uscompany || newProduct.usassembled || newProduct.usmanufactured) {
      //   addProductFactory.addProductToFirebase(newProduct)
        .then((e)=>{
        //thank them for entering a product
        Materialize.toast("Thanks for sharing your find with us!", 4000, 'round right'); // 4000 is the duration of the toast
        // $location.url("/");
      //   });
      // } else {
      //   //if not in our category, error message
      // // Materialize.toast(message, displayLength, className, completeCallback);
      // Materialize.toast("That product sounds awesome, but it doesn't fit in with our American made collection.", 4000, 'round right'); // 4000 is the duration of the toast
      // }
      // console.log("newProduct", newProduct);
  }); //end of then
};//end of amazonAdd



      // $('select').material_select();

  // }); //END OF THEN
// }; //END OF getAmazon

}); //end of controller
