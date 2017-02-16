app.controller('loginCtrl', function($scope, $location, $q){
      //find any nav links with the active class
  $('a.active').removeClass("active");
    //remove active class
    //apply active class to in Review nav link
    $("a.logInPage").addClass("active");


  //when user clicks login button
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

      })//end of then
      .catch((e)=>{
        // Materialize.toast(message, displayLength, className, completeCallback);
      Materialize.toast(e.message, 4000, 'round right'); // 4000 is the duration of the toast

      });//end of catch
  };//end of login function

//when user clicks reg button
  $scope.regUser = () => {
    //take the values from the form
    let email = $scope.email;
    let password = $scope.password;
    //if there is no password, remind user to input one
    if (password === undefined) {
      Materialize.toast("A password is required", 4000);
    }
    //if there is no email, remind user to input one
    if (email === undefined) {
      Materialize.toast("A valid email is required", 4000);
    }
    //convert firebase.auth() into an angular promise
    return $q.resolve(firebase
      .auth()
      .createUserWithEmailAndPassword(email, password))
    //after successful reg of user
      .then(()=>{
        //after creating a user account (which automatically signs them in),
        //take the user to the home page
        $location.url("/");
      })//end of then
      //if there is an error
      .catch((e)=>{
        console.log("error", e);
        //inform the user of the error
        // Materialize.toast(message, displayLength, className, completeCallback);
        Materialize.toast(e.message, 4000); // 4000 is the duration of the toast
      });//end of catch
  };//end of the reg user function

  //if the user clicks the forgot password button
  $scope.forgot = () =>{
    //take the email from the form, removing any extra spaces
    let email = $scope.email;
    console.log(email);
    if(email === undefined || email.trim() === "") {
      //inform the user an email is needed
        Materialize.toast(`Please enter a valid email`, 4000, 'round right');
        return;

    }
    //convert firebase.auth() into an angular promise
    return $q.resolve(firebase
      .auth()
      .sendPasswordResetEmail(email))
      //after successfully sending an email to the user
      .then((e)=>{
        //inform the user an email has been send to them
        Materialize.toast(`An message has been sent to ${email}.`, 4000, 'round right');
      })//end of then
      //if there is an errory
     .catch((e)=> {
      //inform the user of the error
        // Materialize.toast(message, displayLength, className, completeCallback);
        Materialize.toast(e.message, 4000); // 4000 is the duration of the toast
    });//end of catch
  };//end of forgot()

});//end of controller
