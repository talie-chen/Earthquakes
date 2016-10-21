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
		url: "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson",
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
	
});
