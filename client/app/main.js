// Basic JS required for CSS framework to function as designed -->


//allows the navbar to be collapsible, per materialize
$('.collapsible').collapsible();
// Initialize collapse button for navbar, per materialize
$(".button-collapse").sideNav();
//initialize parrallax
$('.parallax').parallax();
//initialize select
$('select').material_select();


// Add mobile navbar functionality
$(".button-collapse").sideNav({
  closeOnClick: true, // Closes side-nav on <a> clicks, useful for
  draggable: true // Choose whether you can drag to open on touch screens
});



//logout function
//in main js so available in all views
logOut = () => {
  firebase
    .auth()
    .signOut()
    .then(()=>{
      console.log("logged out");
      location.href="/#!/login";
    })
    .catch((e)=>{
      // Materialize.toast(message, displayLength, className, completeCallback);
      Materialize.toast(e.message, 4000); // 4000 is the duration of the toast
    });
};
