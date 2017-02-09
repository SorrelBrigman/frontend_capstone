app.controller('loginCtrl', function($scope, $location, $q){
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

});
