app.controller('addProductCtrl', function($scope, addProductFactory) {

  $scope.product = {
    name: '',
    company: '',
    compWeb: '',
    link: '',
    image: '',
    descript: '',
    price: '',
    category: '',
    uscompany: '',
    usassembled: '',
    usmanufactured: ''
  };

 $scope.addProduct = ()=> {
    console.log("logging product");
    console.log($scope.product);
    addProductFactory.addProductToFirebase($scope.product);
    //function to reset form
  };

});
