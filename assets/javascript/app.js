$(document).ready(function(){

var foodArray = [];
var drinksArray = [];
var eventsArray = [];

// document.getElementById("defaultOpen").click();
function food() {
	$(".food").on("click", function(){
		var selection = $(this).attr("data-name");
		foodArray.push(selection);

		$(this).css("border", "5px solid #FB7722");
	    console.log(foodArray);
	});
}

function drinks() {
	$(".drinks").on("click", function(){
		var selection = $(this).attr("data-name");
		drinksArray.push(selection);

		$(this).css("border", "5px solid #FB7722");
	    console.log(drinksArray);
	});
}

function events() {
	$(".events").on("click", function(){
		var selection = $(this).attr("data-name");
		eventsArray.push(selection);

		$(this).css("border", "5px solid #FB7722");
	    console.log(eventsArray);
	});
}

food();
drinks();
events();


});