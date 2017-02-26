app.controller('addProductCtrl', function($scope, addProductFactory, $location, getProductFactory) {

  let currentProducts;
  //get all of the product links from all products in firebase
    getProductFactory.getAllProductLinks()
  .then((e)=>{
    //assign the array of links to the var current Products
    currentProducts = e;
    //add materialize styles to select
     $('select').material_select();
  });


//a $scope object that can take the all the user inputted values
    //as key value pairs

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





//function to add products
 $scope.addProduct = ()=> {
    let categoryVal = $("select.longFormCat").val();
    $scope.product.category = categoryVal;
     console.log("category", $scope.product.category);
    //test to make sure at least one american checkbox is true
    if ($scope.product.uscompany || $scope.product.usassembled || $scope.product.usmanufactured) {
     //if not in our category, error message
     if($scope.product.category === "Other") {
        //alert the user product not in our wheelhouse
        // Materialize.toast(message, displayLength, className, completeCallback);
        Materialize.toast("That product sounds awesome, but it doesn't fit in with other items.", 4000, 'round right'); // 4000 is the duration of the toast
        //stop funtion
        return;
    } else {
        //test the product being added against the products that have already been added

        for(var i = 0; i < currentProducts.length; i++){
            //if there is a match with another product
            if(currentProducts[i]=== $scope.product.link){
                //inform the user of this
                // Materialize.toast(message, displayLength, className, completeCallback);
                Materialize.toast("That product is so awesome, it's already been added", 4000, 'round right'); // 4000 is the duration of the toast
                //clear the form
                resetForm();
                //and prevent submit of new product
                return;
            }
        }
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
     }
     //stamp the search date on the product object for later use
        $scope.product.addDate = new Date().toDateString();
        console.log("date", $scope.product.addDate);
     //if it has passed all of these tests, add the product to the database
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


//reset the form to blank
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
