$(document).ready(function(){

var foodArray = [];
var drinksArray = [];
var eventsArray = [];

// document.getElementById("defaultOpen").click();
function food() {
	$(".food").on("click", function(){
		if($(this).attr("data-state")=="unclicked"){
			var selection = $(this).attr("data-name");
			foodArray.push(selection);

			$(this).addClass("clicked");
			$(this).attr("data-state","clicked");
		}
		else if ($(this).attr("data-state")=="clicked"){
			var selection = $(this).attr("data-name");
			var index = foodArray.indexOf(selection);
			foodArray.splice(index, 1);

			$(this).removeClass("clicked");
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

				$(this).addClass("clicked");
				$(this).attr("data-state","clicked");
			}
		}
		else if ($(this).attr("data-state")=="clicked"){
			var selection = $(this).attr("data-name");
			var index = foodArray.indexOf(selection);
			drinksArray.splice(index, 1);
			
			$(this).removeClass("clicked");
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

			$(this).addClass("clicked");
			$(this).attr("data-state","clicked");
		}
		else if ($(this).attr("data-state")=="clicked"){
			var selection = $(this).attr("data-name");
			var index = foodArray.indexOf(selection);
			eventsArray.splice(index, 1);
			
			$(this).removeClass("clicked");
			$(this).attr("data-state","unclicked");
		}
	    console.log(eventsArray);
	});
}

food();
drinks();
events();


});








