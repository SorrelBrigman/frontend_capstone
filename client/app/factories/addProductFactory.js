app.factory('addProductFactory', function($http){
  return {
    addProductToFirebase : (newProduct)=> {
      let myNewProduct = newProduct;
      return $http
        .post('https://skb-capstone-frontend.firebaseio.com/products.json', myNewProduct)
        .then((e)=>{
          console.log("e from send", e);
          return e;
        });

    }
  };

});
