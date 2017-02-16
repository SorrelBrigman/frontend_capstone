app.factory('authFactory', function($q) {
  return {
    //take email and password
    login: (e,p)=> {
      //run the signin firebase method
      return $q.resolve(firebase.auth().signInWithEmailAndPassword(e,p));
    },
    //gets the current user if there is one
    getUser: ()=> {
      return $q((resolve, reject)=>{
        //weird firebase thing to prevent multiple "event listeners" for onAuthStateChanged
        const unsubscribe = firebase.auth().onAuthStateChanged(user=>{
          unsubscribe();
          //if there is a current user
          if (user) {
            //return the current user
            resolve(user);
            //if ther is not a current user (not logged in)
          } else {
            //reject the request that requires a user
            reject();
          }//end of else
        });//end of $Q
      });//end of unscribe()
    }//end of getUser
  };//end of factory object
});//end of factory
