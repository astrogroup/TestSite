  google.maps.event.addDomListener(
  window,
  'load',
  initialize);

	var marker_ary = new Array();
	var currentInfoWindow;
	var mapObj;
	var bermudaTriangle;

	function initialize() {
		//var latlng = new google.maps.LatLng(39.010648,35.438232);
		var latlng = new google.maps.LatLng(24.886436490787712, -70.2685546875);
		
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


    function MarkerSet(lat,lng,text){
        var marker_num = marker_ary.length;
        var marker_position = new google.maps.LatLng(lat,lng);
        var markerOpts = {
            map: mapObj,
            position: marker_position
        };
        marker_ary[marker_num] = new google.maps.Marker(markerOpts);
 
        //textが渡されていたらふきだしをセット
        if(text.length>0){
            var infoWndOpts = {
                content : text
            };
            var infoWnd = new google.maps.InfoWindow(infoWndOpts);
            google.maps.event.addListener(marker_ary[marker_num], "click", function(){
 
                //先に開いた情報ウィンドウがあれば、closeする
                if (currentInfoWindow) {
                    currentInfoWindow.close();
                }
 
                //情報ウィンドウを開く
                infoWnd.open(mapObj, marker_ary[marker_num]);
 
                //開いた情報ウィンドウを記録しておく
                currentInfoWindow = infoWnd;
            });
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
					$(myObj).find("Point").each(function(){
						var lat = $("lat",this).text();
						var lng = $("lng",this).text();
						aryRegionLatLng.push(new google.maps.LatLng(lat,lng));
					});
					
                    var LocateName = $("name_ja",this).text();
                    
                    //ポリゴン生成
           			var Polygon = new google.maps.Polygon({
                		//ポリゴンのオプション設定
                		paths: aryRegionLatLng,
                		strokeColor: "#0000ff",
               			strokeOpacity: 0.8,
                		strokeWeight: 2,
                		fillColor: "#0000ff",
                		fillOpacity: 0.35,
                		map: mapObj
                	});
            		//ポリゴンを地図に追加
            		Polygon.setMap(mapObj);
            	
				});
				
			}
		});
		
	}
	
	
	//このgmap003.jsがあるファイルディレクトリを取得
	function getDir(){
		var scripts = document.getElementsByTagName("script");
		var i = scripts.length;
		while (i--) {
//			alert(i+scripts[i].src);
			
		var match = scripts[i].src.match(/(^|.*\/)gmap003polygon\.js$/);
		if (match) {
			var root = match[1];
			break;
			}
		}
//		alert(root);
//		alert(typeof(root));
		return root;
	}
			
