console.log("hello")

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
var app = angular.module("forUsByUSApp", ['ngRoute'])

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
})
.controller('homeCtrl',  function(){

})
.controller('addProductCtrl', function($scope) {

  $scope.product = {
    name: '',
    company: '',
    compWeb: '',
    link: '',
    image: '',
    descript: '',
    price: '',
  }
 $scope.addProduct = ()=> {
    console.log("logging product")
    console.log($scope.product)
  }

})
.factory('addProductFactory', function(){
  return {}

})
