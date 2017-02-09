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
.controller('detailCtrl',  function($scope, getProductFactory, $routeParams, authFactory, votingFactory){
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

   $scope.upVote = () => {
    authFactory.getUser()
    .then((e) => {
      console.log("I've been voted!");
      console.log("SCOPE", currentProduct);
      let user = e;
      votingFactory.upVote(user, currentProduct);
      $(".upVotes").hide();
    });
  };

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
.controller('loginCtrl', function($scope, $location, $q){
  $scope.logIn = () => {
    //take the values from the form
    let email = $scope.email;
    let password = $scope.password;
    //turn the firebase call into an angular promise
    return $q.resolve(firebase
        .auth()
        .signInWithEmailAndPassword(email, password))
      .then((e)=>{
        //after logging in, take them to the home page
        $location.url("/");
        // $scope.$apply();
      })
      .catch((e)=>{
        // Materialize.toast(message, displayLength, className, completeCallback);
      Materialize.toast(e.message, 4000, 'round right'); // 4000 is the duration of the toast

      });
  };
  $scope.regUser = () => {
    //take the values from the form
    let email = $scope.email;
    let password = $scope.password;
    //if there is no password, remind user to input one
    if (password === undefined) {
      Materialize.toast("A password is required", 4000);
    }
    //convert firebase.auth() into an angular promise
    return $q.resolve(firebase
      .auth()
      .createUserWithEmailAndPassword(email, password))
      .then(()=>{
        //after creating a user account (which automatically signs them in),
        //take the user to the home page
        $location.url("/");
      })
      .catch((e)=>{
        console.log("reg error", e);
        // Materialize.toast(message, displayLength, className, completeCallback);
        Materialize.toast(e.message, 4000); // 4000 is the duration of the toast

      });
  };
  $scope.forgot = () =>{
    let email = $scope.email;
    //convert firebase.auth() into an angular promise
    return $q.resolve(firebase
      .auth()
      .sendPasswordResetEmail(email))
      .then((e)=>{
        console.log(e);
        Materialize.toast(`An message has been sent to ${email}.`, 4000, 'round right');
      })
     .catch((e)=> {
      console.log(e);
        // Materialize.toast(message, displayLength, className, completeCallback);
        Materialize.toast(e.message, 4000); // 4000 is the duration of the toast
    });
  };

})
