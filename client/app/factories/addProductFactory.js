app.factory('addProductFactory', function($http){

  return {
    //take product object from controller
    addProductToFirebase : (newProduct)=> {
      //assign it to a var
      let myNewProduct = newProduct;
      //post that product to firebase
      return $http
        .post('https://skb-capstone-frontend.firebaseio.com/products.json', myNewProduct)
        .then((e)=>{
          //return the response from firebase
          return e;
        });//end of then

    }//end of addProduct to Firebase
  };//end of factory object

});//end of factory
