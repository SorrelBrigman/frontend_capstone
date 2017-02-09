app.controller('addProductCtrl', function($scope, addProductFactory, $location) {
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

    //test to make sure at least one american checkbox is true
    if ($scope.product.uscompany || $scope.product.usassembled || $scope.product.usmanufactured) {
     //if not in our category, error message
     if($scope.product.category === "other"){
        //alert the user product not in our wheelhouse
        // Materialize.toast(message, displayLength, className, completeCallback);
        Materialize.toast("That product sounds awesome, but it doesn't fit in with other items.", 4000, 'round right'); // 4000 is the duration of the toast
        //stop funtion
        return;
    }
    //parse the price from the string of the input into a number
    let thisPrice = parseInt($scope.product.price, 10);
    console.log("thisPrice", thisPrice);
    //test to make sure that the price inputted is a number
     if(isNaN(thisPrice)){
        //inform user to enter value in number format
        // Materialize.toast(message, displayLength, className, completeCallback);
        Materialize.toast("Please enter the item price as a number.", 4000, 'round right'); // 4000 is the duration of the toast
        return;
     }//if it has passed all of these tests, add the product to the database
        console.log("logging product");
        console.log($scope.product);
        addProductFactory.addProductToFirebase($scope.product)
        .then(()=>{
            //reset form
            resetForm();
            //thank them for entering a product
            Materialize.toast("Thanks for sharing your find with us!", 4000, 'round right'); // 4000 is the duration of the toast
            // $location.url("/");
        });
    //function to reset form
    //if the user did not select any of the us options in the checkbox
    //inform them their product doesn't fit in our collect
    } else {
    //alert the user product not in our wheelhouse
    // Materialize.toast(message, displayLength, className, completeCallback);
      Materialize.toast("That product sounds awesome, but it doesn't fit in with our American made collection.", 4000, 'round right'); // 4000 is the duration of the toast
    }



  };

const resetForm = () => {

        $scope.product.name = '';
        $scope.product.company = '';
        $scope.product.compWeb = '';
        $scope.product.link = '';
        $scope.product.image = '';
        $scope.product.descript = '';
        $scope.product.price = '';
        $scope.product.category = '';
        $scope.product.uscompany = false;
        $scope.product.usassembled = false;
        $scope.product.usmanufactured = false;

    };

});
