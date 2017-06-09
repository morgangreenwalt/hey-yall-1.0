$(document).ready(function(){

var userHtml = $("#username");
var username;
//  Initialize Firebase
   var config = {
    apiKey: "AIzaSyCgQFFxv6-cd0vRQesrZUD447sO7AEYklo",
    authDomain: "clickevent-e44d0.firebaseapp.com",
    databaseURL: "https://clickevent-e44d0.firebaseio.com",
    projectId: "clickevent-e44d0",
    storageBucket: "clickevent-e44d0.appspot.com",
    messagingSenderId: "673662977249"
  };
  firebase.initializeApp(config);

var database = firebase.database();
var ref = database.ref("user");
var signedIn;


// LOGIN SECTION==================================================================================
 //instance of the goggle provider object
var google = new firebase.auth.GoogleAuthProvider();
var facebook = new firebase.auth.FacebookAuthProvider();

// Create an Account with email and pass 
function createAccountWithEmailandPassword() {
	var displayName = $("#nameInput").val().trim();
	var email = $("#emailInput").val().trim();
	var password = $("#createPasswordInput").val().trim();
	console.log(email, password)
	firebase.auth().createUserWithEmailAndPassword(email, password)
		.then(function(user) {
			user.updateProfile({displayName: displayName})
			console.log(displayName)
			loadMainPage()
		})

}

//Sign in with email and pass
function signInWithEmailAndPassword() {
	var email = $("#emailInput").val();
	var password = $("#PasswordInput").val();
	console.log("hello")
	console.log(email, password)
	firebase.auth().signInWithEmailAndPassword(email, password)
		.then(function(user) {
		// user.updateProfile({displayName: displayName})
		loadMainPage()
	})			 
}

//Sign in With Google
function googleSignIn() {
	firebase.auth().signInWithPopup(google).then(function(result) {
		// This gives you a Google Access Token. You can use it to access the Google API.
		var token = result.credential.accessToken;
		// The signed-in user info.
		var user = result.user;

		loadMainPage()
			
		}).catch(function(error) {
			  // Handle Errors here.
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  // The email of the user's account used.
			  var email = error.email;
			  // The firebase.auth.AuthCredential type that was used.
			  var credential = error.credential;
			  // ...
			});
  }
//Sign in With FB
function facebookSignIn() {
	firebase.auth().signInWithPopup(facebook).then(function(result) {
		  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
		  var token = result.credential.accessToken;
		  // The signed-in user info.
		  var user = result.user;
		
           
		  loadMainPage()
		
        }).catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			// The email of the user's account used.
			var email = error.email;
			// The firebase.auth.AuthCredential type that was used.
			var credential = error.credential;
			// ...
		});
  }

//Button click when new user signs up with email and pass
$("#newUser").on("click", function(event) {
	  event.preventDefault()
	  createAccountWithEmailandPassword()
})

//Button click when user signs in with email and pass
$("#loginin").on("click", function(event){
	event.preventDefault()
	signInWithEmailAndPassword()
})

// SIGNUP ON CLICK via Google or FB
$(".signin").on("click", function(event) {
    event.preventDefault()
	var method = $(this).attr("data")
	console.log("hello")
        if (method === "google") {
		googleSignIn();
		
        }
	else if(method === "facebook") {
		facebookSignIn();
		
    } 
})
// Button click to sign out
$("#logout").on("click", function() {
	firebase.auth().signOut().then(function() {
  	// Sign-out successful.
  	loadLoginPage();
	}).catch(function(error) {
  // An error happened.
	});
})
// Firebase on auth change. Saves user name
firebase.auth().onAuthStateChanged(function(firebaseUser){
	if(firebaseUser) {
       //USer is signed in
		console.log(firebaseUser)
		
		username = firebaseUser.displayName
		
		userHtml.html("Welcome "+ firebaseUser.displayName)
		
		$("#usernameSuggestions").html(firebaseUser.displayName+"'s Suggestions" )
		
		signedIn = ref.child(firebaseUser.displayName) 
        
		signedIn.update({
            name: firebaseUser.displayName,
            email: firebaseUser.email
	})
		// $(".name").html("<h2>Hi "+firebaseUser+"!</h2>")
	} else {

		console.log("not lgged In")
	}
})

//Loading different pages
function loadMainPage() {
     window.location.href = 'preferences.html';
	 
 }

  function loadLoginPage() {
     window.location.href = 'index.html';
	
 }

  function loadReturnUser() {
     window.location.href = 'user.html';

	 
 }
   function loadSuggestionPage() {
     window.location.href = 'suggestions.html';	 
 }

//  $("#usernameSuggestions").html(JSON.parse(localStorage['name'])+"'s Suggestions" )






var foodArray = [];
var drinksArray = [];
var eventsArray = ['Rock','Country','Sports'];

$(".drinks-section").hide();
$(".events-section").hide();

$("#drinks-question").on("click", function(){
	$(".drinks-section").show();
	$(".food-section").hide();
	$(".events-section").hide();
	$(".section-title").html("<h2> Select the type of drinks(s) you are thirsty for: </h2> <p style='font-size: 16px;''>Select up to two (2) drinks only.</p>");
});

$("#events-question").on("click", function(){

	$(".events-section").show();
	$(".food-section").hide();
	$(".drinks-section").hide();
	$(".section-title").html("<h2> Select the type of event(s) you are interested in: </h2>");
});

$("#food-question").on("click", function(){
	$(".food-section").show();
	$(".events-section").hide();
	$(".drinks-section").hide();
	$(".section-title").html("<h2> Select the type of food(s) you are craving: </h2>");
});

function food() {
	$(".food").on("click", function(){
		if($(this).attr("data-state")=="unclicked"){
			var selection = $(this).attr("data-name");
			foodArray.push(selection);
			if($(this).attr("data-type")!="caption"){
				$(this).addClass("clicked");
				$("#caption"+$(this).attr("data-name")).attr("data-state","clicked");
			}
			else if($(this).attr("data-type")=="caption"){
				$("#"+$(this).attr("data-name")).addClass("clicked");
				$("#"+$(this).attr("data-name")).attr("data-state","clicked");
			}
			$(this).attr("data-state","clicked");
		}
		else if ($(this).attr("data-state")=="clicked"){
			var selection = $(this).attr("data-name");
			var index = foodArray.indexOf(selection);
			foodArray.splice(index, 1);

			if($(this).attr("data-type")!="caption"){
				$(this).removeClass("clicked");
				$("#caption"+$(this).attr("data-name")).attr("data-state","unclicked");
			}
			else if($(this).attr("data-type")=="caption"){
				$("#"+$(this).attr("data-name")).removeClass("clicked");
				$("#"+$(this).attr("data-name")).attr("data-state","unclicked");
			}
			$(this).attr("data-state","unclicked");
		}
		console.log(foodArray);

	});
}

function drinks() {
	$(".drinks").on("click", function(){
		if($(this).attr("data-state")=="unclicked"){
			if(drinksArray.length<2){
				var selection = $(this).attr("data-name");
				drinksArray.push(selection);

				if($(this).attr("data-type")!="caption"){
					$(this).addClass("clicked");
					$("#caption"+$(this).attr("data-name")).attr("data-state","clicked");
				}
				else if($(this).attr("data-type")=="caption"){
					$("#"+$(this).attr("data-name")).addClass("clicked");
					$("#"+$(this).attr("data-name")).attr("data-state","clicked");
				}
				$(this).attr("data-state","clicked");
			}
		}
		else if ($(this).attr("data-state")=="clicked"){
			var selection = $(this).attr("data-name");
			var index = drinksArray.indexOf(selection);
			drinksArray.splice(index, 1);
			
			if($(this).attr("data-type")!="caption"){
				$(this).removeClass("clicked");
				$("#caption"+$(this).attr("data-name")).attr("data-state","unclicked");
			}
			else if($(this).attr("data-type")=="caption"){
				$("#"+$(this).attr("data-name")).removeClass("clicked");
				$("#"+$(this).attr("data-name")).attr("data-state","unclicked");
			}
			$(this).attr("data-state","unclicked");
		}
	    console.log(drinksArray);
	});
}

function events() {


	$(".events").on("click", function(){

		if($(this).attr("data-state")=="unclicked"){
			var selection = $(this).attr("data-name");
			eventsArray.push(selection);

			if($(this).attr("data-type")!="caption"){
				$(this).addClass("clicked");
				$("#caption"+$(this).attr("data-name")).attr("data-state","clicked");
			}
			else if($(this).attr("data-type")=="caption"){
				$("#"+$(this).attr("data-name")).addClass("clicked");
				$("#"+$(this).attr("data-name")).attr("data-state","clicked");
			}
			$(this).attr("data-state","clicked");
		}
		else if ($(this).attr("data-state")=="clicked"){
			var selection = $(this).attr("data-name");
			var index = eventsArray.indexOf(selection);
			eventsArray.splice(index, 1);
			
			if($(this).attr("data-type")!="caption"){
				$(this).removeClass("clicked");
				$("#caption"+$(this).attr("data-name")).attr("data-state","unclicked");
			}
			else if($(this).attr("data-type")=="caption"){
				$("#"+$(this).attr("data-name")).removeClass("clicked");
				$("#"+$(this).attr("data-name")).attr("data-state","unclicked");
			}
			$(this).attr("data-state","unclicked");
		}
	    console.log(eventsArray);
	});
}

food();
drinks();
events();




function submit(){
 	$("#submitBtn").on("click", function(event){
 		event.preventDefault();
 	    console.log(eventsArray);
 	    console.log(foodArray);
 	    console.log(drinksArray);

 	   	ref.update({
 	   		food : foodArray,
 	   		drinks : drinksArray,
 	   		events : eventsArray
 	   	});	

 	   	//sets events ajax query url with events array and prints to suggestions page
 	   	eventsFunction();
 	   	loadSuggestionPage();


 	});
 }
  
 submit();

















// Food Suggestions Part

var zomatoAPIkey = "4b4047ebe163df7deee6b42dd7828188"//"142b97a736485a30ff5b9a92ddbb8fde";
var foodArray=["American", "Italian", "Chinese", "Mexican", "Japanese", "Thai", "BBQ", "Indian"];
var foodPickedArray=[];
var foodCode=[];
var foodType="";


$.ajax({
    url:"https://developers.zomato.com/api/v2.1/cuisines?city_id=278&apikey="+zomatoAPIkey,
    method:"GET"
}).done(function(response){
    foodCode=response.cuisines;
    if(foodPickedArray.length>0){
        foodType="";
        for(var i=0; i<foodCode.length;i++){
            if(foodPickedArray.indexOf(foodCode[i].cuisine.cuisine_name.toUpperCase())>-1){
                if(foodType!=""){
                    foodType=foodType+"%2C"+foodCode[i].cuisine.cuisine_id.toString();
                }
                else{
                    foodType=foodCode[i].cuisine.cuisine_id.toString();
                };
            }
        }
        console.log(foodType);
        $.ajax({
        url:"https://developers.zomato.com/api/v2.1/search?entity_id=278&entity_type=city&apikey="+zomatoAPIkey+"&count=4&sort=rating&order=desc&cuisines="+foodType,
        method:"GET"
        }).done(function(response){
            var restaurants=response.restaurants;
            for(var i=0; i<restaurants.length;i++){
                $("#foodRow"+Math.floor(i/2)).append(
                "<div class='col-md-6 suggestions-list-items'><div class='col-md-6'><a href='#'><img class='thumbnail-suggestions' width='200px' height='200px' src='"+restaurants[i].restaurant.thumb+"' alt='test'></a></div><div class='col-md-6'><h2 class='suggestions-h2'>"+restaurants[i].restaurant.name+"</h2><h4>"+restaurants[i].restaurant.location.address+"</h4><br/><p><br/><a class='btn btn-site btn-lg' href='#' id='infoBtn' role='button' data-toggle='modal' data-target='#myModalInfo' data-lat="+restaurants[i].restaurant.location.latitude+" data-long="+restaurants[i].restaurant.location.longitude+">More Info</a></p></div></div>")
            }
        });
    }
    else{
        $.ajax({
        url:"https://developers.zomato.com/api/v2.1/search?entity_id=278&entity_type=city&apikey="+zomatoAPIkey+"&count=4&sort=rating&order=desc&collection_id=1",
        method:"GET"
        }).done(function(response){
            var restaurants=response.restaurants;
            for(var i=0; i<restaurants.length & i<4; i++){
                $("#foodRow"+Math.floor(i/2)).append(
                "<div class='col-md-6 suggestions-list-items'><div class='col-md-6'><a href='#'><img class='thumbnail-suggestions' width='200px' height='200px' src='"+restaurants[i].restaurant.thumb+"' alt='test'></a></div><div class='col-md-6'><h2 class='suggestions-h2'>"+restaurants[i].restaurant.name+"</h2><h4>"+restaurants[i].restaurant.location.address+"</h4><br/><p><br/><a class='btn btn-site btn-lg' href='#' id='infoBtn' role='button' data-toggle='modal' data-target='#myModalInfo' data-lat="+restaurants[i].restaurant.location.latitude+" data-long="+restaurants[i].restaurant.location.longitude+">More Info</a></p></div></div>")
            }
        });
    }

})


// Drink Suggestions Part

var drinkArray=["Bar", "Coffee shop", "Wine Bar","Juice Bar", "Beer Garden", "Brewery", "Lounge"]
var drinkPickedArray= [];
var drinkCode=[];
var drinkType="";

$.ajax({
    url:"https://developers.zomato.com/api/v2.1/establishments?city_id=278&apikey="+zomatoAPIkey,
    method:"GET"
}).done(function(response){
    drinkCode=response.establishments;
    drinkType="";
    var drinkTypeArray=[];

    for(var i=0; i<drinkCode.length;i++){
        if(drinkPickedArray.indexOf(drinkCode[i].establishment.name.toUpperCase())>-1){
            drinkTypeArray.push(drinkCode[i].establishment.id);
        }
        console.log(drinkTypeArray);
    }

    if(drinkTypeArray.length==1){
       $.ajax({
        url:"https://developers.zomato.com/api/v2.1/search?entity_id=278&entity_type=city&apikey="+zomatoAPIkey+"&sort=rating&count=4&order=des&establishment_type="+drinkTypeArray[0],
        method:"GET"
        }).done(function(response){
            drink=response.restaurants;
            var drinkList = $("<div>");
            for(var i=0; i<drink.length;i++){
                $("#drinkRow"+Math.floor(i/2)).append(
                "<div class='col-md-6 suggestions-list-items'><div class='col-md-6'><a href='#'><img class='thumbnail-suggestions' width='200px' height='200px' src='"+drink[i].restaurant.thumb+"' alt='test'></a></div><div class='col-md-6'><h2 class='suggestions-h2'>"+drink[i].restaurant.name+"</h2><h4>"+drink[i].restaurant.location.address+"</h4><br/><p><br/><a class='btn btn-site btn-lg' href='#' id='infoBtn' role='button' data-toggle='modal' data-target='#myModalInfo' data-lat="+drink[i].restaurant.location.latitude+" data-long="+drink[i].restaurant.location.longitude+">More Info</a></p></div></div>")
    //              $("#event-name").html("<h2 class='suggestions-h2'>"+drink[i].restaurant.name+"</h2>");
				// $("#event-address").html("<h4>'"+drink[i].restaurant.location.address+"'</h4>");
            }
        }); 
    }
    else if (drinkTypeArray.length==2){
        var counter=0;
        for(var j =0; j < drinkTypeArray.length; j++){
            drinkType=drinkTypeArray[j];
            $.ajax({
            url:"https://developers.zomato.com/api/v2.1/search?entity_id=278&entity_type=city&apikey="+zomatoAPIkey+"&sort=rating&count=2&order=des&establishment_type="+drinkType,
            method:"GET"
            }).done(function(response){
                drink=response.restaurants;
                var drinkList = $("<div>");
                for(var i=0; i<drink.length;i++){
                    $("#drinkRow"+Math.floor(counter/2)).append(
                    "<div class='col-md-6 suggestions-list-items'><div class='col-md-6'><a href='#'><img class='thumbnail-suggestions' width='200px' height='200px' src='"+drink[i].restaurant.thumb+"' alt='test'></a></div><div class='col-md-6'><h2 class='suggestions-h2'>"+drink[i].restaurant.name+"</h2><h4>"+drink[i].restaurant.location.address+"</h4><br/><p><br/><a class='btn btn-site btn-lg' href='#' id='infoBtn' role='button' data-toggle='modal' data-target='#myModalInfo' data-lat="+drink[i].restaurant.location.latitude+" data-long="+drink[i].restaurant.location.longitude+">More Info</a></p></div></div>")
    //                  $("#event-name").html("<h2 class='suggestions-h2'>"+drink[i].restaurant.name+"</h2>");
				// $("#event-address").html("<h4>'"+drink[i].restaurant.location.address+"'</h4>");
                    counter++;
                }
            });
        }
    }
    else if (drinkTypeArray.length==0){
        $.ajax({
        url:"https://developers.zomato.com/api/v2.1/search?entity_id=278&entity_type=city&apikey="+zomatoAPIkey+"&sort=rating&count=4&order=des&cuisines=268",
        method:"GET"
        }).done(function(response){
            drink=response.restaurants;
            var drinkList = $("<div>");
            for(var i=0; i<drink.length;i++){
                $("#drinkRow"+Math.floor(i/2)).append(
                "<div class='col-md-6 suggestions-list-items'><div class='col-md-6'><a href='#'><img class='thumbnail-suggestions' width='200px' height='200px' src='"+drink[i].restaurant.thumb+"' alt='test'></a></div><div class='col-md-6'><h2 class='suggestions-h2'>"+drink[i].restaurant.name+"</h2><h4>"+drink[i].restaurant.location.address+"</h4><br/><p><br/><a class='btn btn-site btn-lg' href='#' id='infoBtn' role='button' data-toggle='modal' data-target='#myModalInfo' data-lat="+drink[i].restaurant.location.latitude+" data-long="+drink[i].restaurant.location.longitude+">More Info</a></p></div></div>");
    //             $("#event-name").html("<h2 class='suggestions-h2'>"+drink[i].restaurant.name+"</h2>");
				// $("#event-address").html("<h4>'"+drink[i].restaurant.location.address+"'</h4>");
            }
        }); 
    }
});





































































































































































































































































































$(".devs").hover(function(){
   	$(this).attr("src", $(this).attr("data-animate"));
    }, function(){
    $(this).attr("src", $(this).attr("data-still"));

});



var ryanQueryURL = "https://api.seatgeek.com/2/events?venue.city=Austin&client_id=NzY1OTcwOHwxNDk1NjQ4MzM0Ljk0";


//seat geek client id: NzY1OTcwOHwxNDk1NjQ4MzM0Ljk0

//seat geek app secret: a44eefef28620b890494943cf09df0f1cee710ab733dd772d47b947311f5be58

console.log('yes');
//category buttons, adds taxonomies to search ryanQueryURL
function eventsFunction(){

		for (var z = 0; z < eventsArray.length ; z++)

		{

			if (eventsArray[z] === 'Rock')
			{
				console.log(ryanQueryURL);

				ryanQueryURL += "&taxonomies.name=concert";
								                        
				ryanQueryURL += "&genres.slug=rock";
			}

			if (eventsArray[z] === 'Rap')
			{
				ryanQueryURL += "&taxonomies.name=concert";
								                        
				ryanQueryURL += "&genres.slug=rap&genres.slug=hip-hop";
			}

			if (eventsArray[z] === 'EDM')
			{
				ryanQueryURL += "&taxonomies.name=concert";
		                            
		        ryanQueryURL += "&genres.slug=electronic";

			}

			if (eventsArray[z] === 'Country')
			{
				ryanQueryURL += "&taxonomies.name=concert";
		                        
		        ryanQueryURL += "&genres.slug=country";

			}

			if (eventsArray[z] === 'Pop')
			{
				ryanQueryURL += "&taxonomies.name=concert";
		                            
		        ryanQueryURL += "&genres.slug=pop";

			}

			if (eventsArray[z] === 'Theater')
			{
			    ryanQueryURL += "&taxonomies.name=theater"; 	
			}

			if (eventsArray[z] === 'Comedy')
			{
				ryanQueryURL += "&taxonomies.name=comedy";

			}

			if (eventsArray[z] === 'Sports')
			{
				ryanQueryURL += "&taxonomies.name=sports";

			}

		}



		 $.ajax({
		          url: ryanQueryURL,
		          method: "GET"
		        }).done(function(response) {

		        	console.log(response);
		        	
		        	var picker = 0;
		        	var rowAssign = 0;

		        	for (var i=0;i<6;i++)
		        	{
		        		for (var j=0;j<response.events[i].performers.length;j++)
		        		{
		        			var performerImage = response.events[i].performers[j].image;
		        			var performerName = response.events[i].performers[j].name;
		        			var eventType = response.events[i].type;
		        			var dateTime = response.events[i].datetime_local;
		        			var momentTime = moment(dateTime).format('LT');
		        			var momentDate = moment(dateTime).format('LL');
		        			var venueName = response.events[i].venue.name;

		        			var venueStreetName = response.events[i].venue.address;

		        			var venueAddress = response.events[i].venue.extended_address;
		        			var venueLat = response.events[i].venue.location.lat;
		        			var venueLon = response.events[i].venue.location.lon;
		        			var ticketLink = response.events[i].url;
		        			console.log(momentTime);
		        			console.log(momentDate);


		        			if (picker === 0 || picker === 2 || picker === 4)
		        			{
		        				rowAssign = 1;
		        			}
		        			if (picker === 1 || picker === 3 || picker === 5)
		        			{
		        				rowAssign = 2;
		        			}

				//checks if the event performer has a saved image,
				//if it doesn't, print a default pic

		        			if (response.events[i].performers[j].image===null)
		        			{
		        				

							$('#eventsSuggestions'+rowAssign).append('<div class="row suggestions-list-items" >\
									<div class="col-md-6">\
											<a href="#"><img class="thumbnail-suggestions" src="https://placehold.it/250x200" alt="test">\
											</a>\
										</div>\
										<div class="col-md-6">\
										<h2 class="suggestions-h2">'+performerName+'</h2>\
										<h4>'+venueName+' '+venueAddress+'</h4>\
										<h5 class="suggestion" data-name="alamo">Date: &nbsp; '+momentDate+'</h5>\
										<h5 class="suggestion" data-name="alamo">Time: &nbsp; '+momentTime+'</h5><br/>\
										<p><a class="btn btn-site btn-lg" href="#" id="infoBtn" role="button" data-toggle="modal" \
										data-target="#myModalInfo" data-lat="'+venueLat+'" data-long="'+venueLon+'">More Info</a></p>\
									</div>\
									</div>');

        //     					$("#buy-tickets").html("<a class='btn btn-site btn-lg' href='"+ ticketLink +"' role='button' target='_blank' data-lat='"+venueLat+"' data-lon='"+venueLon+"'> Buy Tickets </a>");
        //     					$("#event-name").html("<h2 class='suggestions-h2'>"+performerName+"</h2>");
								// $("#event-address").html("<h4>'"+venueName+"' '"+venueAddress+"'</h4>");
								// $("#event-date").html("<h5 class='suggestion' data-name='alamo'>Date: &nbsp; '"+momentDate+"'</h5>");
								// $("#event-time").html("<h5 class='suggestion' data-name='alamo'>Time: &nbsp; '"+momentTime+"'</h5>");
								console.log(ticketLink);



								
		        			}
		        			


		        			else
		        			{

	    					$('#eventsSuggestions'+rowAssign).append('<div class="row suggestions-list-items" >\
								<div class="col-md-6">\
										<a href="#"><img class="thumbnail-suggestions" width="250" src="'+performerImage+'" alt="test">\
										</a>\
									</div>\
									<div class="col-md-6">\
										<h2 class="suggestions-h2">'+performerName+'</h2>\
										<h4>'+venueName+' '+venueAddress+'</h4>\
										<h5 class="suggestion" data-name="alamo">Date: &nbsp; '+momentDate+'</h5>\
										<h5 class="suggestion" data-name="alamo">Time: &nbsp; '+momentTime+'</h5><br/>\
										<p><a class="btn btn-site btn-lg" href="#" id="infoBtn" role="button" data-toggle="modal" \
										data-target="#myModalInfo" data-lat="'+venueLat+'" data-long="'+venueLon+'">More Info</a></p>\
									</div>\
								</div>');

	    			// 			$("#buy-tickets").html("<a class='btn btn-site btn-lg' href='"+ ticketLink +"' role='button' target='_blank' data-lat='"+venueLat+"' data-lon='"+venueLon+"'> Buy Tickets </a>");
	    			// 			$("#event-name").html("<h2 class='suggestions-h2'>"+performerName+"</h2>");
								// $("#event-address").html("<h4>'"+venueName+"' '"+venueAddress+"'</h4>");
								// $("#event-date").html("<h5 class='suggestion' data-name='alamo'>Date: &nbsp; '"+momentDate+"'</h5>");
								// $("#event-time").html("<h5 class='suggestion' data-name='alamo'>Time: &nbsp; '"+momentTime+"'</h5>");
								console.log(ticketLink);

		        			}
		        		}

		        		picker++;
		        	}


		        	
		        });

       
		}

console.log(eventsArray);
eventsFunction();
      
});



























