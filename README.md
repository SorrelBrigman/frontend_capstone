# frontend_capstone
App concept, a user curated site allowing users to showcase items made locally in their communities to a national audience of like minded shoppers.  Hopefully, this will help these products rise in national prominence.

Assuming Heroku isn't down for maintainence, you can see the live version of the site here: https://larger-local.herokuapp.com/#!/

Please note: The add by amazon feature is only functional if the connected Amazon affliate account is active.  This project was originally created for a school project, and the creator has chosen not to renew the affliate account upon its expiration at this time.

The currated site concept was inspired by: https://canopy.co

trello board link:
https://trello.com/b/y9tmf0Zk/front-end-capstone

github repo link:
https://github.com/SorrelBrigman/frontend_capstone

wireframe mockup hand written. See images in Mockup images folder.

Pages mocked up include:

landing page (with welcome banner)
home page (like landing page, without welcome banner)
basic product card
expanded product card
input form for user added product

angular views:
home/landing page
About Us
Expanded Project Card
Add Product Form
Login/Reg form
Flag Product view
Review Product view

#technology used:
* HTML, CSS, javascript
* Angular 1.6.1
* Angular-route 1.6.1
* jQuery 3.1.1
* Materialize 0.98.0
* firebase 3.6.8
* Amazon-product-api 0.4.3
* node-sass 4.5.0
* Grunt 1.0.1



# Current Product features include:

## User Curation:
* User able to like a product
* User able to flag a product (that does not fit in the collection)
* Most popular (liked) items at top of page

## Built-in logic for Curation:
* Product must receive 3 unique user likes before being officially added to the collection (prior to 3 likes the product is in review)
* If a user thinks a product does not fit in the collection, they can flag said product, stating the reason for their flag.  After 3 unique user flags, the product is removed from the collection.
* Products can also be flagged while they are in review


## User Added Products:
* User able to add product using a search feature utilizing the Amazon product API (if the associated Amazon Affliate account is currently active).
* User also able to add products using a long form (being not all local products are available for sale through Amazon)

## User Use Features:
* User able to search products by categories
* User able to search products by keywords
* Products sorted by popularity (the most popular products are at the top of the page)

## Informing the User:
* Detail view of product has product description, and add date.
* User able to click on product image, price or product name and they are redirected to a site where they can purchase that product
* User able to click on company name, they will then be redirected to that company's website in order to learn more about the company

## Quality Assurance Features:
* User can only like a product once
* User can only flag a product once

## Duplicate Products Prevented by two means:
* When a product is added via the Add by Amazon feature, the function tests the current product's unique amazon ID against all of the current products' amazon ID.   If it is already present, the product won't be allowed to be added a second time
* When a product is added via the Add Product long form, the functino tests the current product's purchase URL against all current product's purchase link.  If it is already present, the product won't be allowed to be added a second time

## LogIn Features:
* If user is already logged in and clicks the login menu tab, the user is redirected to the home page, and informed via Toast that they are already logged in
* If a user is not logged in, they are unable to like, flag or add products.  They are informed of this via Toast if they try to perform these actions, and in the case of adding a product, are redirected to the login page


#Contributor: Sorrel Brigman  https://github.com/SorrelBrigman
