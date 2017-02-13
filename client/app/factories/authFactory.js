app.factory('authFactory', function($q) {
  return {
    login: (e,p)=> {
      return $q.resolve(firebase.auth().signInWithEmailAndPassword(e,p));
    },
    getUser: ()=> {
      return $q((resolve, reject)=>{
        const unsubscribe = firebase.auth().onAuthStateChanged(user=>{
          unsubscribe();
          if (user) {
            resolve(user);
          } else {
            reject();
          }
        });
      });
    }
  };
});
