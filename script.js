$(document).ready(function() {
  $.get( "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson").done(function(data){
  		console.log(data);
	});
});
