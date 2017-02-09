app.controller('addProductCtrl', function($scope, addProductFactory) {
    //initialize materialize select element
    // $('select').material_select();

  $scope.product = {
    name: '',
    company: '',
    compWeb: '',
    link: '',
    image: '',
    descript: '',
    price: '',
    category: '',
    uscompany: false,
    usassembled: false,
    usmanufactured: false
  };

 $scope.addProduct = ()=> {

    console.log("logging product");
    console.log($scope.product);
    addProductFactory.addProductToFirebase($scope.product);
    //function to reset form
  };

});
