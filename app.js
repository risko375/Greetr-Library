// gets a new object (architecture prevents having to use 'new' keyword here)
var g = G$('John', 'Doe');

//use the chainable methods
g.greet().setLang('es').greet(true).log();

//use the object on the click of the login button
$('#login').click(function(){

// create a new 'Greetr' object (pretending name is from login)
    var loginGrtr = G$('John', 'Doe');
    
// hide the login on the screen    
    $('#logindiv').hide();
    
    
 // fire off an HTML greeting, passing the '#greeting' as the selector and the chosen language and log welcome   
    loginGrtr.setLang($('#lang').val()).HTMLGreeting('#greeting', true).log();

});
