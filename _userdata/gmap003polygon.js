  google.maps.event.addDomListener(
  window,
  'load',
  initialize);

	var marker_ary = new Array();
	var currentInfoWindow;
	var mapObj;

	function initialize() {
		var latlng = new google.maps.LatLng(39.010648,35.438232);
		//var latlng = new google.maps.LatLng(24.886436490787712, -70.2685546875);
		
		var myOptions = {
      		zoom: 5,
      		center: latlng,
      		mapTypeId: google.maps.MapTypeId.ROADMAP
      	};
    
    	mapObj = new google.maps.Map(
    		document.getElementById("map_canvas"),
    		myOptions);
    	setPointMarker();
	}

      //マーカー削除
    function MarkerClear() {
        //表示中のマーカーがあれば削除
        if(marker_ary.length > 0){
            //マーカー削除
            for (i = 0; i <  marker_ary.length; i++) {
                marker_ary[i].setMap();
            }
            //配列削除
            for (i = 0; i <=  marker_ary.length; i++) {
                marker_ary.shift();
            }
        }
    }

	function setPointMarker() {
	    //リストの内容を削除
	    $('#pointlist > ul').empty();
		var root = getDir();
		
		//XML取得
		$.ajax({			
			url:root+"sample003.xml",
			type:'GET',
			dataType:'xml',
			timeout:1000,
			error: function(){
				alert("xml読み込み失敗");
			},
			success:function(xml){
				//帰ってきた地点の数だけループ
				$(xml).find("Region").each(function(){
					var myObj = this;
					var	aryRegionLatLng = new Array();
					
					//<Region>データ読み込み
					$(myObj).find("Point").each(function(){
						var lat = $("lat",this).text();
						var lng = $("lng",this).text();
						aryRegionLatLng.push(new google.maps.LatLng(lat,lng));
					});
					lat = $("Center > lat", this).text();
					lng = $("Center > lng", this).text();
					var regionCenter = new google.maps.LatLng(lat, lng);
                    var regionName = $("name_ja",this).text();
                    var regionStrokeColor = $("strokeColor",this).text();
                    var regionStrokeOpacity = $("strokeOpacity",this).text();
                    var regionStrokeWeight = $("strokeWeight",this).text();
                    var regionFillColor = $("fillColor",this).text();
                    var regionFillOpacity = $("fillOpacity",this).text();
                    
                    //ポリゴン生成
           			var Polygon = new google.maps.Polygon({
                		//ポリゴンのオプション設定
                		paths: 			aryRegionLatLng,
                		strokeColor: 	regionStrokeColor,
               			strokeOpacity: 	regionStrokeOpacity,
                		strokeWeight: 	regionStrokeWeight,
                		fillColor: 		regionFillColor,
                		fillOpacity: 	regionFillOpacity,
                		map: 			mapObj
                	});
            		//ポリゴンを地図に追加
            		Polygon.setMap(mapObj);
            		
                    //clickイベント追加
					var infoWndOpts = { 
						content:regionName,
						position:regionCenter
					};
					var infoWnd = new google.maps.InfoWindow(infoWndOpts);
					google.maps.event.addListener(Polygon, "click", function(){
						//先に開いていたウィンドウがあれば閉じる
						if (currentInfoWindow) {
							currentInfoWindow.close();
						}
						//alert(regionName);
						//infoWnd.open(mapObj, Polygon);
						infoWnd.open(mapObj);
						
						currentInfoWindow = infoWnd;
                    });
                    
				});
				
			}
		});
		
	}
	
	
	//このgmap003.jsがあるファイルディレクトリを取得
	function getDir(){
		var scripts = document.getElementsByTagName("script");
		var i = scripts.length;
		while (i--) {			
		var match = scripts[i].src.match(/(^|.*\/)gmap003polygon\.js$/);
		if (match) {
			var root = match[1];
			break;
			}
		}
		return root;
	}
			
