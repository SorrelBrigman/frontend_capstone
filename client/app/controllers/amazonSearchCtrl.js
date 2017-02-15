app.controller('amazonSearchCtrl',function($scope, $http, addProductFactory, amazonFactory){

  $scope.amazonSearchQuery = {
    searchIndex: "",
    Keywords: "",
    responseGroup: 'ItemAttributes,Offers,Images'
  };

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
    };//end of getAmazon()



  $scope.addProduct = (product) => {
     //activates the modal on the dynamically created content
    $('.modal').modal();
     //open the modal
    $("#modal2").modal('open');
    $scope.thisProduct = product;
  }; //end of addProduct

   $scope.amazonAdd = (value) =>{
    console.log("I've been clicked");
      let newProduct = value;
      newProduct.compWeb = $scope.web;
      newProduct.uscompany = $scope.uscompany;
      newProduct.usassembled = false;
      newProduct.usmanufactured = false;
      amazonFactory.addAmazon(newProduct);
  };//end of amazonAdd


}); //end of controller
