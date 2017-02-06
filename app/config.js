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
})
.controller('homeCtrl',  function(){

})
