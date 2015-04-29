///<reference path="../../../typings/tsd.d.ts" />

function initialize() {
    var map = new google.maps.Map(document.getElementById("map-canvas"), {
        zoom: 4,
        center: new google.maps.LatLng(-28, 137.883)
    });
}

google.maps.event.addDomListener(window, "load", initialize);
