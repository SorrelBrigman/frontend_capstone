app.controller('homeCtrl',  function($scope, getProductFactory, $routeParams, $location){
   getProductFactory.getAllProducts()
   .then((e)=>{
    $scope.listAll =  e;
   });


  $scope.limitCat = $routeParams.productCat;


  $scope.openModule = (value)=> {
    console.log("clicked");
    let whichProduct = value;
    $location.url(`/details/${whichProduct}`);

  };

});
