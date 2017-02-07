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
    });
})
.controller('homeCtrl',  function($scope, getProductFactory){
   getProductFactory.getAllProducts()
   .then((e)=>{
    $scope.listAll =  e;
   });
  console.log("return from factory", $scope.listAll);

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
    }
  };
});
