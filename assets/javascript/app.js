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


$(".food").on("click", function(){
	var selection = $(this).attr("data-name");
	foodArray.push(selection);

	$(this).css("border", "5px solid #FB7722");
    // console.log(foodArray);
});

$(".drinks").on("click", function(){
	var selection = $(this).attr("data-name");
	drinksArray.push(selection);

	$(this).css("border", "5px solid #FB7722");
    // console.log(drinksArray);
});


$(".events").on("click", function(){
	var selection = $(this).attr("data-name");
	eventsArray.push(selection);

	$(this).css("border", "5px solid #FB7722");
    // console.log(eventsArray);
});

console.log(drinksArray);
console.log(eventsArray);
console.log(foodArray);


});