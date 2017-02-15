app.factory('amazonFactory', function($http, addProductFactory, $location, getProductFactory){
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
            console.log("title", searchProduct.name);
            //parse the company name
            if (things.data[i].ItemAttributes[0].Brand === undefined) {
              continue;
            } else {
              searchProduct.company = things.data[i].ItemAttributes[0].Brand[0];
              console.log("company", searchProduct.company);
            }
            //parse the amazon purchase link
            searchProduct.link = things.data[i].DetailPageURL[0];
            console.log("link", searchProduct.link);
            //parse the amazon unique product id
            searchProduct.amazonUniqueId = things.data[i].ASIN[0];
            console.log("ASIN", searchProduct.amazonUniqueId);
            //stamp the search date on the product object for later use
            searchProduct.addDate = new Date();
            console.log("date", searchProduct.addDate);
            //if the product has images, gather one
            if(things.data[i].ImageSets) {
              searchProduct.image = things.data[i].ImageSets[0].ImageSet[0].LargeImage[0].URL[0];
              console.log("productImage", searchProduct.image);
            } else {
              continue;
            }
            if(things.data[i].ItemAttributes[0].ListPrice) {
              searchProduct.price = (things.data[i].ItemAttributes[0].ListPrice[0].Amount[0] / 100);
              console.log("price", searchProduct.price);
            } else {
                continue;
            }
            searchProduct.descript = "";
            for (var j = 0; j < things.data[i].ItemAttributes[0].Feature.length; j++) {
              searchProduct.descript += things.data[i].ItemAttributes[0].Feature[j] + ". ";
            }
            console.log("description", searchProduct.descript);

            // searchProduct.link = things.data[i].DetailPageURL[0];
            // console.log("link", searchProduct.link);
            // searchProduct.amazonUniqueId = things.data[i].ASIN[0];
            // console.log("ASIN", searchProduct.amazonUniqueId);
            // searchProduct.addDate = new Date();
            // console.log("date", searchProduct.addDate);
            searchResults.push(searchProduct);
          }
          console.log("searchResults", searchResults);
          return searchResults;


      }) //end of then
      .catch((error)=> {
        //if an error
        //tell the user
        Materialize.toast("Something went wrong.  Please check your spelling and category choice.  If the problem continues, please add your product with our custom entry below.", 5000, 'round right'); // 4000 is the duration of the toast
      });//end of catch
    },//end of getAmazon()
    addAmazon : (value) => {
      getProductFactory.getAllProductASINs()
      .then((e)=>{
        let ASINs = e;
        console.log("ASINs", ASINs);
        let newProduct = value;
        //test to see if that amazon product is already in our collection
        for (var i = 0; i < ASINs.length; i++) {
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
          .then(()=>{
          //thank them for entering a product
          Materialize.toast("Thanks for sharing your find with us!", 4000, 'round right'); // 4000 is the duration of the toast
          $('#modal2').modal('close');
          //wait 3 second, then return to homepage
          setTimeout(()=> {
            $location.url("/addProductThroughAmazon");
            }, 3000);

        });//end of then
       } else {
          //if not any of the qualities are checked, error message
        // Materialize.toast(message, displayLength, className, completeCallback);
        Materialize.toast("That product sounds awesome, but it doesn't fit in with our American made collection.", 4000, 'round right'); // 4000 is the duration of the toast
        }
        console.log("newProduct", newProduct);
      }); //end of then from getFactory
    }//end of addAmazon()

  }; //end of factory object
});//end of factory
