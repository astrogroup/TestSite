	function wait(a,func){
		var check = 0;
		try{
			eval("check = " + a);
		} catch(e) {
		}
		if (check) {
			func();
		} else {
			var f = function(){ wait(a,func) };
			setTimeout(f,100);
		}
	}



	function include(src, check){
		var script = document.createElement('script');
		script.src = src;
		document.body.appendChild(script);
		
		if (!!(document.getElementById(check))) {
			wait(check, function(){
				google.maps.event.addDomListener(
				window,
				'load',
				initialize);
			});
		}
		
	
		
		
/*		check = new Function('return !!(document.getElementById(\'' + check + '\'))');
		if (!check()) {
			var script = document.createElement('script')
			script.src = src;
			document.body.appendChild(script);
			setTimeout(function(){
				if (!check()) {
					setTimeout(arguments.callee, 100);
					}
				}, 100);
		}
//		wait(1000);
//		alert("hoge");
		alert(window.google);
		alert(window.google.maps.event);
	*/
	}

	include('http://maps.google.com/maps/api/js?sensor=false',
		'window.google.maps');
//	include('jquery-1.8.0.min.js','window.jQuery');
	//window.jQueryオブジェクトはどこにあるの?

	//window.onload = function() {
	//	google.maps.event.addDomListener(
//		window,
//		'load',
//		initialize);
	//}

	var marker_ary2 = new Array();
	var currentInfoWindow2;
	var mapObj2;

	function initialize() {
		var latlng = new google.maps.LatLng(40.183775,29.061669);
		var myOptions = {
      	zoom: 12,
      	center: latlng,
      	mapTypeId: google.maps.MapTypeId.ROADMAP
      	};
    
    	mapObj2 = new google.maps.Map(
    	document.getElementById("map_canvas"),
    	myOptions);
		
		setPointMarker();
		
		
	}

      //マーカー削除
    function MarkerClear() {
        //表示中のマーカーがあれば削除
        if(marker_ary2.length > 0){
            //マーカー削除
            for (i = 0; i <  marker_ary2.length; i++) {
                marker_ary2[i].setMap();
            }
            //配列削除
            for (i = 0; i <=  marker_ary2.length; i++) {
                marker_ary2.shift();
            }
        }
    }


    function MarkerSet(lat,lng,text){
        var marker_num = marker_ary2.length;
        var marker_position = new google.maps.LatLng(lat,lng);
        var markerOpts = {
            map: mapObj2,
            position: marker_position
        };
        marker_ary2[marker_num] = new google.maps.Marker(markerOpts);
 
        //textが渡されていたらふきだしをセット
        if(text.length>0){
            var infoWndOpts = {
                content : text
            };
            var infoWnd = new google.maps.InfoWindow(infoWndOpts);
            google.maps.event.addListener(marker_ary2[marker_num], "click", function(){
 
                //先に開いた情報ウィンドウがあれば、closeする
                if (currentInfoWindow2) {
                    currentInfoWindow2.close();
                }
 
                //情報ウィンドウを開く
                infoWnd.open(mapObj2, marker_ary2[marker_num]);
 
                //開いた情報ウィンドウを記録しておく
                currentInfoWindow2 = infoWnd;
            });
        }
    }

	function setPointMarker() {
	    //リストの内容を削除
	    //$('#pointlist > ul').empty();
		var root = getDir();

		//XML取得
		$.ajax({			
			url:root+"sample007.xml",
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
                    var LocateName = $("name_ja",this).text();
                    //マーカーをセット
                    MarkerSet(LocateLat,LocateLng,LocateName);
					//リスト表示
                    //リストに対応するマーカー配列キーをセット
                    var marker_num = marker_ary2.length - 1;
					//liとaタグをセット
					//loc = $('<li>').append($('<a href="javascript:void(0)"/>').text(LocateName));
					//セットしたタグにイベント「マーカーがクリックされた」をセット
                    //loc.bind('click', function(){
                    //    google.maps.event.trigger(marker_ary2[marker_num], 'click');
                    //});
					//リスト表示
					//$('#pointlist > ul').append(loc);
				});
			}
		});
	}
	
	
	//このgmap007.jsがあるファイルディレクトリを取得
	function getDir(){
		var scripts = document.getElementsByTagName("script");
		var i = scripts.length;
		while (i--) {
		var match = scripts[i].src.match(/(^|.*\/)gmap007\.js$/);
		if (match) {
			var root = match[1];
			break;
			}
		}
		return root;
	}
			
