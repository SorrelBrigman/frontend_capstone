app.controller('amazonSearchCtrl',function($scope, $http, addProductFactory, amazonFactory){

  //find any nav links with the active class
  $('a.active').removeClass("active");
    //remove active class
    //apply active class to in Review nav link
    $("a.addProduct").addClass("active");


  //initialize tooltips
  $('.tooltipped').tooltip({delay: 50});
  //initialize select
  // $('select').material_select();

  //an object to hold the search query info, with values currently blank
    //asside for the response group info which is constant for
    //every request
  $scope.amazonSearchQuery = {
    searchIndex: "",
    Keywords: "",
    responseGroup: 'ItemAttributes,Offers,Images'
  };


//function to get results from user search to the page
  $scope.getAmazon = () => {
    //convert search query into an object
    $scope.amazonSearchQuery = {
      searchIndex: $scope.amazonSearchQuery.searchIndex,
      Keywords: $scope.amazonSearchQuery.Keywords,
      responseGroup: 'ItemAttributes,Offers,Images'
     };
     //send that object to the get amazon factor
       console.log("amazon form once called", $scope.amazonSearchQuery)
     amazonFactory.getAmazon($scope.amazonSearchQuery)
      .then((e)=>{
        console.log("searchResults", e)
        //get the returned researchs and load them to the page
        $scope.searchResults = e;
      });//end of then
    };//end of getAmazon()


//when the user clicks the addProduct button
  $scope.addProduct = (product) => {
     //activates the modal on the dynamically created content
    $('.modal').modal();
     //open the modal
    $("#modal2").modal('open');
    $scope.thisProduct = product;
  }; //end of addProduct


  // from inside the modal, the user can offically add the product to collection
   $scope.amazonAdd = (value) =>{
      //takes values from user form and turn product into an object
      let newProduct = value;
      newProduct.compWeb = $scope.web;
      newProduct.uscompany = $scope.uscompany;
      newProduct.usassembled = false;
      newProduct.usmanufactured = false;
      //send product object to amazon factory
      amazonFactory.addAmazon(newProduct);
  };//end of amazonAdd


}); //end of controller
