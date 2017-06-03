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
var eventsArray = [];

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
	});
}

submit();
});