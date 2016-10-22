var map; 
function initMap() {
	var uluru = {lat: -25.363, lng: 131.044};
	map = new google.maps.Map(document.getElementById('map'), {
	  zoom: 1,
	  center: uluru
	});
}

$(document).ready(function() {

	/**
	* Earthquake Object
	*	mag
	*	place
	*	time
	*	coordinates[]
	*/

	var earthquake_list = [];


	$.ajax({
		url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson",
		type: "get",
		async: false,
		success: function(data){
			$.each(data.features, function(key, value){
				var earthquake = {
					"mag": value.properties.mag,
					"place": value.properties.place,
					"time": moment(value.properties.time).format("h:mm:ss a"),
					"coordinates": value.geometry.coordinates 
				}
				earthquake_list.push(earthquake);
			});
		}
	})

	console.log(earthquake_list);

	// Retrieve the template data from the HTML (jQuery is used here).
	var template = $('#earthquakes').html();

	// Compile the template data into a function
	var templateScript = Handlebars.compile(template);


	var html = templateScript(earthquake_list);

	// Insert the HTML code into the page
	$(document.body).append(html);

	// Append marker
	earthquake_list.forEach(function(obj){
		var coords = obj.coordinates;
		var latLng = new google.maps.LatLng(coords[1],coords[0]);
        var marker = new google.maps.Marker({
            position: latLng,
            map: map
        });
	});
	
});
