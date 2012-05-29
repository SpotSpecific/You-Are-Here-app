var lastLocation;
var zoomVal = 14;

function handlerMapGood(thisLocation) {
  lastLocation = thisLocation;
  var message = '';
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  var timeValue = "" + ((hours >12) ? hours -12 :hours)
  if (timeValue == "0") timeValue = 12;
  timeValue += ((minutes < 10) ? ":0" : ":") + minutes;
  timeValue += ((seconds < 10) ? ":0" : ":") + seconds;
  timeValue += (hours >= 12) ? " P.M." : " A.M.";
  message ="<img src='http://maps.google.com/maps/api/staticmap?markers=icon:http://maker.spotspecific.com/favicon.ico|" + thisLocation.coords.latitude + "," + thisLocation.coords.longitude + "&size=300x250&sensor=true&zoom=" + zoomVal +"&maptype=hybrid&key=YOURAPIKEY' />";
  document.getElementById("map").innerHTML = message;
  document.getElementById("data_x").innerHTML = thisLocation.coords.longitude;
  document.getElementById("data_y").innerHTML = thisLocation.coords.latitude;
  document.getElementById("data_accuracy").innerHTML = thisLocation.coords.accuracy;
  var date = new Date(thisLocation.timestamp/1000);
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  document.getElementById("data_date").innerHTML = hours + ':' + minutes + ':' + seconds;
}

function handlerMapFail()
{
  document.getElementById("map").innerHTML = "GPS Failure&hellip;";
}

function zoom(val)
{
  zoomVal = zoomVal+val;
  if(zoomVal<1)
    zoomVal=1;
  if(zoomVal>20)
    zoomVal=20;
  handlerMapGood(lastLocation);
}

document.addEventListener("deviceready", function() {
    SpotEngine.addConstructor(function() {
        navigator._ssgeolocation.watchPosition(handlerMapGood, handlerMapFail);
    });
}, false);
