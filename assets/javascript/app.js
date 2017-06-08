$(document).ready(function(){

 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDbb4OYFm4EDFMLBPUSvSib8xQ38x6CVKE",
    authDomain: "project-app-43963.firebaseapp.com",
    databaseURL: "https://project-app-43963.firebaseio.com",
    projectId: "project-app-43963",
    storageBucket: "project-app-43963.appspot.com",
    messagingSenderId: "416945318872"
  };
  firebase.initializeApp(config);

var database = firebase.database();
var ref = database.ref("preferences");
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


 	});
 }
  
 submit();






















































































































































































































































































































$(".devs").hover(function(){
   	$(this).attr("src", $(this).attr("data-animate"));
    }, function(){
    $(this).attr("src", $(this).attr("data-still"));

});

var ryanQueryURL = "https://api.seatgeek.com/2/events?venue.city=Austin&client_id=NzY1OTcwOHwxNDk1NjQ4MzM0Ljk0";

//var images = ['', 'images/music.jpg', 'images/sports.jpg', 'images/theater.jpg', 'images/comedy.jpg'];
var image = 0;



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
		        			var venueName = response.events[i].venue.extended_address;
		        			var venueAddress = response.events[i].venue.extended_address;
		        			var venueLat = response.events[i].venue.location.lat;
		        			var venueLon = response.events[i].venue.location.lon;
		        			var ticketLink = response.events[i].url;


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
										<p class="suggestion" data-name="alamo">'+dateTime+'</p>\
										<p><a class="btn btn-site btn-lg" href="#" id="infoBtn" role="button" data-toggle="modal" \
										data-target="#myModalInfo" data-lat="'+venueLat+'" data-lon="'+venueLon+'">More Info</a>\
										&nbsp; <a class="btn btn-site btn-lg" href="'+ticketLink+'" id="infoBtn" role="button" data-toggle="modal" \
										data-target="_blank" data-lat="'+venueLat+'" data-lon="'+venueLon+'">Buy Tickets</a></p>\
									</div>\
									</div>');
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
										<p class="suggestion" data-name="alamo">'+dateTime+'</p>\
										<p><a class="btn btn-site btn-lg" href="#" id="infoBtn" role="button" data-toggle="modal" \
										data-target="#myModalInfo" data-lat="'+venueLat+'" data-lon="'+venueLon+'">More Info</a>\
										&nbsp; <a class="btn btn-site btn-lg" href="'+ticketLink+'" id="infoBtn" role="button" data-toggle="modal" \
										data-target="_blank" data-lat="'+venueLat+'" data-lon="'+venueLon+'">Buy Tickets</a></p>\
									</div>\
								</div>');


		        			}
		        		}

		        		picker++;
		        	}


		        	
		        });

       
		}

console.log(eventsArray);
eventsFunction();
      
});



























