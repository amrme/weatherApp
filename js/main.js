
$("document").ready(function() {

  var lat = '';
  var lon = '';
  var id = "";

  var url ="";

  // temp in f
  var tempF = '';
  var tempC = '';

  // get user's location
  getLocation();


  // example request
  // api.openweathermap.org/data/2.5/weather?lat=35&lon=139

  // the function gets the user's location
  function getLocation() {
    if (navigator.geolocation) {       navigator.geolocation.getCurrentPosition(getPosition);
    } else {
        $("#test-div").html("Geolocation is not supported by this browser.");
    }
}

  // appends the location to the DOM
function getPosition(position) {
 lat =  Math.round(position.coords.latitude);
 lon = Math.round(position.coords.longitude);
  url = "http://api.openweathermap.org/data/2.5/weather?"+"lat="+lat+"&"+"lon="+lon+"&APPID=463676098f60d13d2cdc8b6f166795d5";

  getWeather(url);
}

   function getWeather(myUrl)
  {
    //$("#debugger").html(myUrl);
    $.getJSON(myUrl, function(result){

tempF = Math.round(JSON.stringify(result.main.temp) * 9/5 - 459.67);

      // alert(tempF);
      tempC = Math.round((tempF - 32) / (9/5));
      var flag = false;
      $("#reading").html(tempC + " C");
      // get the id of the weather
      id = JSON.stringify(result.sys.id);
        $("#desc").html((JSON.stringify(result.weather[0].description)).replace(/['"]+/g, '').toUpperCase());
      // set the icon based on the id
      setIcon(id);
      $("#call-btn").click(function() {
        if (!flag)
          {
            $("#reading").html(tempF + " F");
            $("#call-btn").html("C");
            flag = true;
          }
        else
          {
            $("#reading").html(tempC + " C");
            $("#call-btn").html("F");
            flag = false;
          }

      });
    });
    //$("#test-div").html(myUrl);
  }

  function setIcon(id) {
    // check for the id
    // get the correct weather icon
    if (id >= 200 && id <= 232)
      {
        // weather is Thunderstorm
        // set the icon
        // remove the hidden class form the correct div
        $(".thunder-storm").removeClass("hidden");
      }
    else if (id >= 300 && id <= 321)
      {
        // weather is Drizzle
        // set the icon
        // remove the hidden class form the correct div
        $(".rainy").removeClass("hidden");
      }
    else if (id >= 300 && id <= 321)
      {
        // weather is Drizzle
        // set the icon
        // remove the hidden class form the correct div
        $(".sun-shower").removeClass("hidden");
      }
    else if (id >= 500 && id <= 531)
      {
        // weather is rainy
        // set the icon
        // remove the hidden class form the correct div
        $(".rainy").removeClass("hidden");
      }
    else if (id >= 600 && id <= 622)
      {
        // weather is Snow
        // set the icon
        // remove the hidden class form the correct div
        $(".flurries").removeClass("hidden");
      }
    else if (id >= 701 && id <= 781)
      {
        // weather is Atmosphere
        // set the icon
        // remove the hidden class form the correct div
        // we need to get a new icon for it
        $(".thunder-storm").removeClass("hidden");
      }
    else if (id > 701 && id < 801)
      {
        // weather is clear
        // set the icon
        // remove the hidden class form the correct div
        // we need to get a new icon for it
        $(".clear").removeClass("hidden");
      }
    else
      {
        // anything else is cloudy
        // we need to specify it more later
        $(".cloudy").removeClass("hidden");
      }
  }
});
