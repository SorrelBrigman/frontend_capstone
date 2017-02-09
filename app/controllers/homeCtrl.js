app.controller('homeCtrl',  function($scope, getProductFactory, $routeParams, $location){
   getProductFactory.getAllProducts()
   .then((e)=>{
    $scope.listAll =  e;
   });
  console.log("return from factory", $scope.listAll);

  $scope.limitCat = $routeParams.productCat;
  console.log("limitCat", $scope.limitCat);

  $scope.openModule = (value)=> {
    console.log("clicked");
    let whichProduct = value;
    $location.url(`/details/${whichProduct}`);
    // //initialize modals
    //   $('.modal').modal();
    //   //open the modal
    //  $("#modal1").modal('open');
  };

});
