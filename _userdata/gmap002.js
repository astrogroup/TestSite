  google.maps.event.addDomListener(
  window,
  'load',
  initialize);

	var marker_ary = new Array();
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
			url:root+"sample002.xml",
			type:'GET',
			dataType:'xml',
			timeout:1000,
			error: function(){
				alert("xml読み込み失敗");
			},
			success:function(xml){
				//帰ってきた地点の数だけループ
				$(xml).find("Locate").each(function(){
					var LocateLat = $("lat",this).text();
					var LocateLng = $("lng",this).text();
                    var LocateName = $("name",this).text();
                    //マーカーをセット
                    MarkerSet(LocateLat,LocateLng,LocateName);
					//リスト表示
                    //リストに対応するマーカー配列キーをセット
                    var marker_num = marker_ary.length - 1;
					//liとaタグをセット
					loc = $('<li>').append($('<a href="javascript:void(0)"/>').text(LocateName));
					//セットしたタグにイベント「マーカーがクリックされた」をセット
                    loc.bind('click', function(){
                        google.maps.event.trigger(marker_ary[marker_num], 'click');
                    });
					//リスト表示
					$('#pointlist > ul').append(loc);
				});
			}
		});
	}
	
	
	//このgmap002.jsがあるファイルディレクトリを取得
	function getDir(){
		var scripts = document.getElementsByTagName("script");
		var i = scripts.length;
		while (i--) {
		var match = scripts[i].src.match(/(^|.*\/)gmap002\.js$/);
		if (match) {
			root = match[1];
			break;
			}
		}
		return root;
	}
			
