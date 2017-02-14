app.controller('amazonSearchCtrl',function($scope, $http, addProductFactory, amazonFactory){

  $scope.amazonSearchQuery = {
    searchIndex: "",
    Keywords: "",
    responseGroup: 'ItemAttributes,Offers,Images'
  };

  $scope.searchAmazon = () => {
    console.log("amazonSearchQuery", $scope.amazonSearchQuery);
    $scope.getAmazon();
  };

  $scope.getAmazon = () => {
    $scope.amazonSearchQuery = {
      searchIndex: $scope.amazonSearchQuery.searchIndex,
      Keywords: $scope.amazonSearchQuery.Keywords,
      responseGroup: 'ItemAttributes,Offers,Images'
     };
     amazonFactory.getAmazon($scope.amazonSearchQuery)
      .then((e)=>{
        $scope.searchResults = e;
      });

    // $http.post('/api/amazon',
    //   {params: $scope.amazonSearchQuery
    //     // { "searchIndex" : $scope.amazonSearchQuery.searchIndex,
    //     //          "Keywords" : $scope.amazonSearchQuery.Keywords,
    //     //          "responseGroup": "ItemAttributes,Offers,Images"}
    //            })
    // .then((things) => {
    //     console.log(things.data);
    //     let searchResults = [];
    //     for (var i = 0; i < things.data.length; i++) {
    //       let searchProduct = {};
    //       searchProduct.category = $scope.amazonSearchQuery.searchIndex;
    //       searchProduct.name = things.data[i].ItemAttributes[0].Title[0];
    //       console.log("title", searchProduct.name);
    //       searchProduct.company = things.data[i].ItemAttributes[0].Brand[0];
    //       console.log("company", searchProduct.company);

    //       if(things.data[i].ImageSets) {
    //         searchProduct.image = things.data[i].ImageSets[0].ImageSet[0].LargeImage[0].URL[0];
    //         console.log("productImage", searchProduct.image);
    //         if(things.data[i].ItemAttributes[0].ListPrice) {
    //           searchProduct.price = things.data[i].ItemAttributes[0].ListPrice[0].FormattedPrice[0];
    //         console.log("price", searchProduct.price);
    //         }
    //         searchProduct.descript = "";
    //       for (var j = 0; j < things.data[i].ItemAttributes[0].Feature.length; j++) {
    //         searchProduct.descript += things.data[i].ItemAttributes[0].Feature[j] + ". ";
    //         }
    //         console.log("description", searchProduct.descript);
    //       }
    //       searchProduct.link = things.data[i].DetailPageURL[0];
    //       console.log("link", searchProduct.link);
    //       searchProduct.amazonUniqueId = things.data[i].ASIN[0];
    //       console.log("ASIN", searchProduct.amazonUniqueId);
    //       searchProduct.addDate = new Date();
    //       console.log("date", searchProduct.addDate);
    //       searchResults.push(searchProduct);
    //     }
    //     console.log("searchResults", searchResults);
    //     $scope.searchResults = searchResults;

        $scope.addProduct = (product) => {
           //activates the modal on the dynamically created content
          $('.modal').modal();
           //open the modal
         $("#modal2").modal('open');
         $scope.thisProduct = product;


         $scope.amazonAdd = (value) =>{
            let newProduct = value;
            newProduct.compWeb = $scope.web;
            if($scope.uscompany === undefined) {
              newProduct.uscompany = false;
            } else {
              newProduct.uscompany = $scope.uscompany;
            }
            if ($scope.usassembled === undefined) {
              newProduct.usassembled = false;
            } else {
              newProduct.usassembled = $scope.usassembled;
            }
            if ($scope.usmanufactured === undefined) {
              newProduct.usmanufactured = false;
            } else {
              newProduct.usmanufactured = $scope.usmanufactured;
            }
             if (newProduct.uscompany || newProduct.usassembled || newProduct.usmanufactured) {
              addProductFactory.addProductToFirebase(newProduct)
              .then(()=>{
              //thank them for entering a product
              Materialize.toast("Thanks for sharing your find with us!", 4000, 'round right'); // 4000 is the duration of the toast
              // $location.url("/");
              });
            } else {
              //if not in our category, error message
            // Materialize.toast(message, displayLength, className, completeCallback);
            Materialize.toast("That product sounds awesome, but it doesn't fit in with our American made collection.", 4000, 'round right'); // 4000 is the duration of the toast
            }
            console.log("newProduct", newProduct);
        };
    };



      // $('select').material_select();

  // }); //END OF THEN
}; //END OF getAmazon

}); //end of controller
