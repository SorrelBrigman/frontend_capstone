app.factory('amazonFactory', function($http, addProductFactory, $location, getProductFactory){
  //beginning of factory object
  return {
    //take search object from controller
    getAmazon : (value) => {
      //send request to client serve to utilize npm amazon factory,
        //which will send request to amazon api
       return $http.post('/api/amazon',
        {params: value
                 })
       //then take the return from the search
      .then((things) => {
          //create an empty array to house parsed search result objects
          let searchResults = [];
          //loop through the search results
          for (var i = 0; i < things.data.length; i++) {
            //create an empty object to house parsed search results
            let searchProduct = {};
            //set the amazon search category to a largerlocal search category
            if (value.searchIndex === "ArtsAndCrafts" || value.searchIndex === "HomeGarden"){
              searchProduct.category = "Home";
            } else if (value.searchIndex === "Fashion") {
              searchProduct.category = "Clothing";
            } else if (value.searchIndex === "Grocery") {
              searchProduct.category = "Food";
            } else {
            searchProduct.category = value.searchIndex;
            }
            //parse the product name
            searchProduct.name = things.data[i].ItemAttributes[0].Title[0];

            //parse the company name
            if (things.data[i].ItemAttributes[0].Brand === undefined) {
              //if the company name isn't give, don't add the product
              continue;
            } else {
              searchProduct.company = things.data[i].ItemAttributes[0].Brand[0];
            }
            //parse the amazon purchase link
            searchProduct.link = things.data[i].DetailPageURL[0];
            //parse the amazon unique product id
            searchProduct.amazonUniqueId = things.data[i].ASIN[0];
            //stamp the search date on the product object for later use
            searchProduct.addDate = new Date();
            //if the product has images, gather one
            if(things.data[i].ImageSets) {
              searchProduct.image = things.data[i].ImageSets[0].ImageSet[0].LargeImage[0].URL[0];
            } else {
              //if it does not have an image, don't add the product
              continue;
            }
            //if the product has a listed price
            if(things.data[i].ItemAttributes[0].ListPrice) {
              //parse the price and makesure it has 2 decimal values
              searchProduct.price = (things.data[i].ItemAttributes[0].ListPrice[0].Amount[0] / 100).toFixed(2);

            } else {
              //if the product doesn't have a listed price, don't add it
              continue;
            }
            //create an empty string to house the description strings
            searchProduct.descript = "";
            //loop through the array of descriptions, adding them all to the
              //previously created empty strings
            for (var j = 0; j < things.data[i].ItemAttributes[0].Feature.length; j++) {
              searchProduct.descript += things.data[i].ItemAttributes[0].Feature[j] + ". ";
            }
            //take the newly created search Product object with all of it's
            //parsed info, and add it to the searchResults array
            searchResults.push(searchProduct);
          }
          //after all suitable search Products have been added to the searchResults array
          //return the array
          return searchResults;


      }) //end of then
      .catch((error)=> {
        //if an error
        //tell the user
        Materialize.toast("Something went wrong.  Please check your spelling and category choice.  If the problem continues, please add your product with our custom entry below.", 5000, 'round right'); // 4000 is the duration of the toast
      });//end of catch
    },//end of getAmazon()

    addAmazon : (value) => {
      //gather all the Amazon Unique identifiers (ASIN)
      getProductFactory.getAllProductASINs()
      //then take the array of ASINS for all currently listed products in our collection
      .then((e)=>{
        //assign them to a var
        let ASINs = e;
        //assign the newly added product to a var
        let newProduct = value;
        //test to see if that amazon product is already in our collection
        for (var i = 0; i < ASINs.length; i++) {
          //testing by ASIN
          if (newProduct.amazonUniqueId === ASINs[i]) {
            //if so, don't allow it to be added, and tell the user
            Materialize.toast("That product is so awesome, it's already in our collection!", 4000, 'round right'); // 4000 is the duration of the toast
            return;
            }//end of if statement
          } //end of forloop
          //if the user did not select us company
        if(newProduct.uscompany === undefined) {
          //set that value to false
          newProduct.uscompany = false;
        }
        //if the user did not select us assembled
        if (newProduct.usassembled === undefined) {
          //set that value to false
          newProduct.usassembled = false;
        }
        //if the user did not select us manufactured
        if (newProduct.usmanufactured === undefined) {
          //set that value to false
          newProduct.usmanufactured = false;
        }
          //if at least one of the above qualities is check
         if (newProduct.uscompany || newProduct.usassembled || newProduct.usmanufactured) {
          //add the product
          addProductFactory.addProductToFirebase(newProduct)
          //after a successful product add
          .then(()=>{
          //thank them for entering a product
          Materialize.toast("Thanks for sharing your find with us!", 4000, 'round right'); // 4000 is the duration of the toast
          //close the modal
          $('#modal2').modal('close');
          //redirect them to the home page
          $location.url("/");

        });//end of then
       } else {
          //if not any of the qualities are checked, error message
        // Materialize.toast(message, displayLength, className, completeCallback);
        Materialize.toast("That product sounds awesome, but it doesn't fit in with our American made collection.", 4000, 'round right'); // 4000 is the duration of the toast
        }//end of else
      }); //end of then from getFactory
    }//end of addAmazon()

  }; //end of factory object
});//end of factory
