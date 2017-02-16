

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
      templateUrl : "partials/home.html",
      resolve : {
        products(getProductFactory) {
          return getProductFactory.getAllProducts();
        }
      }
    })
    .when("/addproduct", {
      // use the add product ctrl
      controller: "addProductCtrl",
      //use the partial "addProduct"
      templateUrl: "partials/addProduct.html",
      resolve: {
        user: (authFactory, $location) => {
          return authFactory.getUser().catch(()=>{
            $location.url("/login");
          });
        }
      }
    })
    .when("/products/:productCat", {
      // use the add product ctrl
      controller: "homeCtrl",
      //use the partial "addProduct"
      templateUrl: "partials/home.html",
      resolve : {
        products(getProductFactory) {
          return getProductFactory.getAllProducts();
        }
      }
    })
    .when("/inReview/:productCat", {
      // use the add product ctrl
      controller: "inReviewCtrl",
      //use the partial "addProduct"
      templateUrl: "partials/inReview.html",
      resolve : {
        products(getProductFactory) {
          return getProductFactory.getAllProducts();
        }
      }
    })
    .when("/details/:productID", {
      // use the add product ctrl
      controller: "detailCtrl",
      //use the partial "addProduct"
      templateUrl: "partials/home.html"
    })
    .when("/inreview", {
      // use the add product ctrl
      controller: "inReviewCtrl",
      //use the partial "addProduct"
      templateUrl: "partials/inReview.html",
      resolve : {
        //get products from the productFactory
        products(getProductFactory) {
          return getProductFactory.getAllProducts();
        },
        //get user from authFactory, relocate if not logged in
        // user: (authFactory, $location) => {
        //   return authFactory.getUser().catch(()=>{
        //     $location.url("/login");
        //   });
        // }
      }
    })
    .when("/flag/:productKey", {
      // use the flag ctrl
      controller: "flagCtrl",
      //use the partial "home"
      templateUrl: "partials/home.html",
      resolve: {
        user: (authFactory, $location) => {
          return authFactory.getUser().catch(()=>{
            $location.url("/login");
          });
        }
      }
    })
    .when("/login", {
      // use the login ctrl
      controller: "loginCtrl",
      //use the partial "logint"
      templateUrl: "partials/login.html",
      //check to see if user logged in
      resolve: {
        user: (authFactory, $location) => {
            return authFactory.getUser()
            //if user
            .then(()=>{
              //go to home page
              $location.url("/");
            })
            //if no user
            .catch(()=>{
              //continue to login page
              $location.url("/login");
            });
          }
      }
    })
    .when("/about", {
      // use the about ctrl
      controller: "aboutCtrl",
      //use the partial "about"
      templateUrl: "partials/about.html"
    })
    .when("/addProductThroughAmazon", {
      //use the amazon product controller
      controller : "amazonSearchCtrl",
      // use the paritial "amazon search"
      templateUrl: "partials/addByAmazon.html",
      //if user not logged in, redirects to the login page
      resolve: {
        user: (authFactory, $location) => {
          return authFactory.getUser().catch(()=>{
            $location.url("/login");
          });
        }
      }
    });
});
