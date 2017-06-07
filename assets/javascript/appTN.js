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
                "<div class='col-md-6 suggestions-list-items'><div class='col-md-6'><a href='#'><img class='thumbnail-suggestions' width='200px' height='200px' src='"+restaurants[i].restaurant.thumb+"' alt='test'></a></div><div class='col-md-6'><h2 class='suggestions-h2'>"+restaurants[i].restaurant.name+"</h2><h4>"+restaurants[i].restaurant.location.address+"</h4><br/><p><a class='btn btn-site btn-lg' href='#' id='infoBtn' role='button' data-toggle='modal' data-target='#myModalInfo' data-lat="+restaurants[i].restaurant.location.latitude+" data-long="+restaurants[i].restaurant.location.longitude+">More Info</a></p></div></div>")
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
                "<div class='col-md-6 suggestions-list-items'><div class='col-md-6'><a href='#'><img class='thumbnail-suggestions' width='200px' height='200px' src='"+restaurants[i].restaurant.thumb+"' alt='test'></a></div><div class='col-md-6'><h2 class='suggestions-h2'>"+restaurants[i].restaurant.name+"</h2><h4>"+restaurants[i].restaurant.location.address+"</h4><br/><p><a class='btn btn-site btn-lg' href='#' id='infoBtn' role='button' data-toggle='modal' data-target='#myModalInfo' data-lat="+restaurants[i].restaurant.location.latitude+" data-long="+restaurants[i].restaurant.location.longitude+">More Info</a></p></div></div>")
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
                "<div class='col-md-6 suggestions-list-items'><div class='col-md-6'><a href='#'><img class='thumbnail-suggestions' width='200px' height='200px' src='"+drink[i].restaurant.thumb+"' alt='test'></a></div><div class='col-md-6'><h2 class='suggestions-h2'>"+drink[i].restaurant.name+"</h2><h4>"+drink[i].restaurant.location.address+"</h4><br/><p><a class='btn btn-site btn-lg' href='#' id='infoBtn' role='button' data-toggle='modal' data-target='#myModalInfo' data-lat="+drink[i].restaurant.location.latitude+" data-long="+drink[i].restaurant.location.longitude+">More Info</a></p></div></div>")
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
                    "<div class='col-md-6 suggestions-list-items'><div class='col-md-6'><a href='#'><img class='thumbnail-suggestions' width='200px' height='200px' src='"+drink[i].restaurant.thumb+"' alt='test'></a></div><div class='col-md-6'><h2 class='suggestions-h2'>"+drink[i].restaurant.name+"</h2><h4>"+drink[i].restaurant.location.address+"</h4><br/><p><a class='btn btn-site btn-lg' href='#' id='infoBtn' role='button' data-toggle='modal' data-target='#myModalInfo' data-lat="+drink[i].restaurant.location.latitude+" data-long="+drink[i].restaurant.location.longitude+">More Info</a></p></div></div>")
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
                "<div class='col-md-6 suggestions-list-items'><div class='col-md-6'><a href='#'><img class='thumbnail-suggestions' width='200px' height='200px' src='"+drink[i].restaurant.thumb+"' alt='test'></a></div><div class='col-md-6'><h2 class='suggestions-h2'>"+drink[i].restaurant.name+"</h2><h4>"+drink[i].restaurant.location.address+"</h4><br/><p><a class='btn btn-site btn-lg' href='#' id='infoBtn' role='button' data-toggle='modal' data-target='#myModalInfo' data-lat="+drink[i].restaurant.location.latitude+" data-long="+drink[i].restaurant.location.longitude+">More Info</a></p></div></div>")
            }
        }); 
    }
});


