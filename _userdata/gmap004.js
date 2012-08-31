	google.maps.event.addDomListener(
  		window,
		'load',
		initialize);

	var currentInfoWindow;
	var mapObj;

	function initialize() {
		var latlng = new google.maps.LatLng(39.010648,35.438232);
		var myOptions = {
    	  	zoom: 5,
      		center: latlng,
      		mapTypeId: google.maps.MapTypeId.ROADMAP
      	};
    
    	mapObj = new google.maps.Map(
    		document.getElementById("map_canvas"),
    		myOptions);
		
		var burusaPos = new google.maps.LatLng(40.268131,29.062586);
		var marker = new google.maps.Marker({map:mapObj, position:burusaPos});
		
        var infoWnd = new google.maps.InfoWindow({content:"Bursa"});
        google.maps.event.addListener(marker, "click", function(){
        	if (currentInfoWindow) {
            	currentInfoWindow.close();
            }
            //情報ウィンドウを開く
            infoWnd.open(mapObj, marker);
            //開いた情報ウィンドウを記録しておく
            currentInfoWindow = infoWnd;
        });
        	
	}
	
