$(document).ready(function(){

// 48c20a29b24ad9e41687aa187b365e80 << API for beer mapping
// 966de8eba0a47cbb7dc4edba95834768 << API for breweryDB
console.log("test");

$("#searchBtn").on("click", function(){
	event.preventDefault();
	
	var location = $("#beer-venue").val().trim();
	var zipCode = $("#venue-zip").val().trim();
	var queryURL = "http://api.brewerydb.com/v2/locations?locality=austin&locationType="+location+"&postalCode="+zipCode+"&key=966de8eba0a47cbb7dc4edba95834768";

	$.ajax ({
		url: queryURL,
		method: "GET"
	}).done(function(results){

		var beerVenue = results.data;

		for (var i = 0; i < beerVenue.length; i++) {

			var bName = beerVenue[i].brewery.name;
			var bLocation = beerVenue[i].brewery.location;
			var bLogo = beerVenue[i].brewery.images.icon;
			var bWebsite = beerVenue[i].brewery.website;

			console.log(bName);
			console.log(bLocation);
			console.log(bLogo);
			console.log(bWebsite);
		}
	})
});

});