$(document).ready(function() {

	/**
	* Earthquake Object
	*	mag
	*	place
	*	time
	*	coordinates[]
	*/

	var earthquake_list = [];

	$.get( "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson").done(function(data)
	{
		// Building earthquakes list:
		$.each(data.features, function(key, value){
			var earthquake = {
				"mag": value.properties.mag,
				"place": value.properties.place,
				"time": value.properties.time,
				"coordinates": value.geometry.coordinates 
			}
			earthquake_list.push(earthquake);
		});
		console.log(earthquake_list);
	});
});
