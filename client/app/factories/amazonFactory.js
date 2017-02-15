app.factory('amazonFactory', function($http, addProductFactory, $location){
  return {
    getAmazon : (value) => {
      console.log("value from Factory", value);
       return $http.post('/api/amazon',
        {params: value
                 })
      .then((things) => {
          console.log(things.data);
          let searchResults = [];
          for (var i = 0; i < things.data.length; i++) {
            let searchProduct = {};
            searchProduct.category = value.searchIndex;
            searchProduct.name = things.data[i].ItemAttributes[0].Title[0];
            console.log("title", searchProduct.name);
            searchProduct.company = things.data[i].ItemAttributes[0].Brand[0];
            console.log("company", searchProduct.company);

            if(things.data[i].ImageSets) {
              searchProduct.image = things.data[i].ImageSets[0].ImageSet[0].LargeImage[0].URL[0];
              console.log("productImage", searchProduct.image);
              if(things.data[i].ItemAttributes[0].ListPrice) {
                searchProduct.price = things.data[i].ItemAttributes[0].ListPrice[0].FormattedPrice[0];
              console.log("price", searchProduct.price);
              }
              searchProduct.descript = "";
            for (var j = 0; j < things.data[i].ItemAttributes[0].Feature.length; j++) {
              searchProduct.descript += things.data[i].ItemAttributes[0].Feature[j] + ". ";
              }
              console.log("description", searchProduct.descript);
            }
            searchProduct.link = things.data[i].DetailPageURL[0];
            console.log("link", searchProduct.link);
            searchProduct.amazonUniqueId = things.data[i].ASIN[0];
            console.log("ASIN", searchProduct.amazonUniqueId);
            searchProduct.addDate = new Date();
            console.log("date", searchProduct.addDate);
            searchResults.push(searchProduct);
          }
          console.log("searchResults", searchResults);
          return searchResults;


      });//end of then
    },//end of getAmazon()
    addAmazon : (value) => {
      let newProduct = value;

      if(newProduct.uscompany === undefined) {
        newProduct.uscompany = false;
      }
      if (newProduct.usassembled === undefined) {
        newProduct.usassembled = false;
      }
      if (newProduct.usmanufactured === undefined) {
        newProduct.usmanufactured = false;
      }
       if (newProduct.uscompany || newProduct.usassembled || newProduct.usmanufactured) {
        addProductFactory.addProductToFirebase(newProduct)
        .then(()=>{
        //thank them for entering a product
        Materialize.toast("Thanks for sharing your find with us!", 4000, 'round right'); // 4000 is the duration of the toast
        //wait 3 second, then return to homepage
        setTimeout(()=> {
          $location.url("/addProductThroughAmazon");
          }, 3000);

      });//end of then
     } else {
        //if not in our category, error message
      // Materialize.toast(message, displayLength, className, completeCallback);
      Materialize.toast("That product sounds awesome, but it doesn't fit in with our American made collection.", 4000, 'round right'); // 4000 is the duration of the toast
      }
      console.log("newProduct", newProduct);
    }//end of addAmazon()

  }; //end of factory object
});//end of factory
