$(document).ready(function(){

var suggestionsRef = firebase.database().ref("suggestions")

function displayInfo(){
$(".suggestion").on("click", function(){
	suggestionsRef.child($(this).data("name")).once("value").then(function(snapshot) {
		var address = snapshot.val().address;
		var image = snapshot.val().image;
		var date = snapshot.val().date;
		var title = snapshot.val().title;
		var time = snapshot.val().time;
		var venue = snapshot.val().venue;
		var details = snapshot.val().details;

		var newURL = new URL(window.location.href.split("suggestions.html")[0] + "event.html");

		newURL.searchParams.set("address", address)
		newURL.searchParams.set("image", image)
		newURL.searchParams.set("date", date)
		newURL.searchParams.set("title", title)
		newURL.searchParams.set("time", time)
		newURL.searchParams.set("venue", venue)
		newURL.searchParams.set("details", details)

		window.location = newURL;
	})
})
}

$("#infoBtn").on("click", function(){
	displayInfo();
})

});