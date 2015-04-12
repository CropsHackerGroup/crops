function updateValues(position) {
    $("#x").val(position.lat());
    $("#y").val(position.lng());
}
function initialize() {
    var latLng = new google.maps.LatLng(12.13639, -86.25139);

    var mapOptions = {
        center: latLng,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

    var marker = new google.maps.Marker({
        position: latLng,
        title: 'Marker',
        map: map,
        draggable: true
    });

    var circle = {ref: null};

    function drawCircle() {
        if(circle.ref)
            circle.ref.setMap(null);

        var populationOptions = {
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.35,
          map: map,
          center: marker.getPosition(),
          radius: isNaN($("#radius").val())?500:parseInt($("#radius").val())
        };

        circle.ref = new google.maps.Circle(populationOptions);
    }


    google.maps.event.addListener(marker, 'drag', function() {
        updateValues(marker.getPosition());
    });

    google.maps.event.addListener(marker, 'dragend', function() {
        updateValues(marker.getPosition());
        drawCircle();
    });

    updateValues(marker.getPosition());
    drawCircle();

    $("#map input").change(function() {
         map.panTo(new google.maps.LatLng($("#x").val(), $("#y").val()));
         drawCircle();
    });
}
$(function () {
    initialize();
});
