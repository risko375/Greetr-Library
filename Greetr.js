;(function(global, $){

    // 'new' an object
    var Greetr = function(firstName, lastName, language){
    
        return new Greetr.init(firstName, lastName, language);
    
    }
    
    // hidden within the scope of the IIFE never directly accessible
    var supportedLangs = ['en', 'es'];
    
    //informal greetings
    var greetings = {
    
        en: 'Hello',
        es: 'Hola'

    };
    
    //formal greetings
    var formalGreetings = {
    
        en: 'Greetings',
        es: 'Saludos'
    
    };
     
    //logger messages
    var logMessages = {
    
        en: 'Logged in',
        es: 'Inicio sesion'
    
    };
    //prototype holds methods (to save memory space)
    Greetr.prototype = {
    
        //this refers to calling object at execution time
        fullName: function(){
        
            return this.firstName + ' ' + this.lastName;
            
        },
           
        
        validate: function() {
            // check that is a valid language
            //references the externally inaccessible 'supprtedLangs within the closure'
            if(supportedLangs.indexOf(this.language) === -1){
                throw "Invalid language";
            }
        
        },
        // retrieve messages from the object by referring to the
        //properties using [] syntax
        greeting: function(){
        
            return greetings[this.language] + ' ' + this.firstName + '!';
        
        },
        
        formalGreeting: function(){
        
        return formalGreetings[this.language] + ', ' + this.fullName();
        
        },
        
        // chainable methods return their own containing object
        greet: function(formal){
        
            var msg;
            
            // if undefined or null it will be coerced to 'false'
            
            if(formal){
            
                msg = this.formalGreeting();
            
            }
            else {
            
                msg = this.greeting();
            
            }
            
            if(console){
            
                console.log(msg);
            
            }
            
            // 'this' refers to the calling object at execution
            // time. Makes the method chainable
            return this;
        },
        
        log: function(){
        
            if(console){
            
                console.log(logMessages[this.language] + ': ' + this.fullName());
            }
        
            // make chainable 
            return this;
        },
        
        //set the language
        setLang: function(lang){
        
            this.language = lang;
            this.validate();
            return this;
        
        },
        
        HTMLGreeting: function(selector, formal){
        
            if(!$){
            
                throw 'jQuery not loaded';
            }
            if(!selector){
            
                throw 'missing jQuery selector';
            
            }
            //determine the message
            var msg;
            if(formal){
            
                msg = this.formalGreeting();
            }
            else {
            
                msg = this.greeting();
            }
            
            //inject the msg in chosen place in the DOM
            $(selector).html(msg);
            
            //make chainable
            return this;
        }

    
    };
    
    //the actual object is created here, allowing us to 'new'
    //an object without calling 'new'
    Greetr.init = function(firstName, lastName, language){
    
        var self = this;
        self.firstName = firstName || '';
        self.lastName = lastName || '';
        self.language = language || 'en';
        self.validate();
    
    
    }
    
    //trick borrowed from jQuery so we don't have to use the 'new' keyword
    Greetr.init.prototype = Greetr.prototype;
    
    //attach Greetr to global object and provide shorthand G$
    global.Greetr = global.G$ = Greetr;

}(window, jQuery));