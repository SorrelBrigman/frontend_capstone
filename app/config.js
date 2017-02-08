console.log("hello");

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDfUoz8OPRyS_8X-4oxAjkJ3SIMHgmKoRc",
  authDomain: "skb-capstone-frontend.firebaseapp.com",
  databaseURL: "https://skb-capstone-frontend.firebaseio.com",
  storageBucket: "skb-capstone-frontend.appspot.com",
  messagingSenderId: "1014795416567"
};
firebase.initializeApp(config);





//assign the angular module to the var app
var app = angular.module("forUsByUSApp", ['ngRoute']);

//configure "app" with routeProvider
app.config(($routeProvider)=> {
  $routeProvider
    //when at the base page
    .when("/", {
      //use the Home Ctrl
      controller: "homeCtrl",
      //use the partial "home"
      templateUrl : "partials/home.html"
    })
    .when("/addproduct", {
      // use the add product ctrl
      controller: "addProductCtrl",
      //use the partial "addProduct"
      templateUrl: "partials/addProduct.html"
    })
    .when("/products/:productCat", {
      // use the add product ctrl
      controller: "homeCtrl",
      //use the partial "addProduct"
      templateUrl: "partials/home.html"
    })
    .when("/details/:productID", {
      // use the add product ctrl
      controller: "detailCtrl",
      //use the partial "addProduct"
      templateUrl: "partials/home.html"
    })
    .when("/login", {
      // use the add product ctrl
      controller: "loginCtrl",
      //use the partial "addProduct"
      templateUrl: "partials/login.html"
    });
})
.controller('homeCtrl',  function($scope, getProductFactory, $routeParams, $location){
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

})
.controller('detailCtrl',  function($scope, getProductFactory, $routeParams){
  let currentProduct = $routeParams.productID;
    console.log("specific", currentProduct);
   getProductFactory.getThisProduct(currentProduct)
   .then((e)=>{
    $scope.thisProduct =  e;
    console.log("scope.thisProduct", $scope.thisProduct);
    return $scope.thisProduct;
   })
   .then(()=>{

      //activates the modal on the dynamically created content
      $('.modal').modal();
      //open the modal
      $("#modal1").modal('open');
   });




})
.controller('addProductCtrl', function($scope, addProductFactory) {

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

})
.controller('loginCtrl', function($scope){
  $scope.logIn = () => {
    Materialize.toast("logging in", 4000, 'round right');
    let email = $scope.email;
    let password = $scope.password;
    console.log("email password", email, password);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((e)=>{
        console.log("logging in");
        Materialize.toast(e.message, 4000, 'round right');
        //$location.url("/");
      })
      .catch((e)=>{
        console.log("login error", e)
        // Materialize.toast(message, displayLength, className, completeCallback);
      Materialize.toast(e.message, 4000, 'round right'); // 4000 is the duration of the toast

      });
  };
  $scope.regUser = () => {
    Materialize.toast("reg new user", 4000, 'round right');
    let email = $scope.email;
    let password = $scope.password;
    console.log("email password", email, password);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(()=>{
        console.log("new user!");
        $location.url("/");
      })
      .catch((e)=>{
        console.log("reg error", e)
        // Materialize.toast(message, displayLength, className, completeCallback);
      Materialize.toast(e.message, 4000); // 4000 is the duration of the toast

      });
  };
  $scope.forgot = () =>{
    Materialize.toast("Did you forget?", 4000, 'round right');
    let email = $scope.email;
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(()=>{
        console.log("You forgot! inside then");
        Materialize.toast(`An message has been sent to ${email}.`, 4000, 'round right');
      })
     .catch((e)=>{
      console.log("the error", e);
        // Materialize.toast(message, displayLength, className, completeCallback);
      Materialize.toast(e.message, 4000, 'round right'); // 4000 is the duration of the toast
    });
  };

})
.factory('addProductFactory', function($http){
  return {
    addProductToFirebase : (newProduct)=> {
      let myNewProduct = newProduct;
      return $http
        .post('https://skb-capstone-frontend.firebaseio.com/products.json', myNewProduct)
        .then((e)=>{
          console.log("e from send", e);
        });

    }
  };

})
.factory('getProductFactory', function($http){
  return {
    getAllProducts : () => {
      //get all the products from firebase
      return $http
      .get('https://skb-capstone-frontend.firebaseio.com/products.json')
      //parse the return from firebase, just returning the data object
      .then((e)=>{
        console.log("from get factory .data", e.data);
        return e.data;
      })
      //turn the data object into an array
      .then((e)=>{
        let productList = e;
        let allProducts = [];
        for (var key in productList) {
          let myProduct = productList[key];
          myProduct.key = key;
          allProducts.push(myProduct);
        }
        console.log("allProducts", allProducts);
        return allProducts;
      });
    }, //end of getAllProducts()
    getThisProduct : (value) => {
      console.log("value", value);
      let thisProduct = value;
      //get specific product from firebase
      return $http
      .get(`https://skb-capstone-frontend.firebaseio.com/products/${thisProduct}/.json`)
      //parse the return from firebase, just returning the data object
      .then((e)=>{
        console.log("specific product object", e.data);
        return e.data;
      });
    }
  };
});
