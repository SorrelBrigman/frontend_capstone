console.log("hello")

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
.controller('addProductCtrl', function() {

})
