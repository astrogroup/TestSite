/*

$ajaxの実行が遅延しているのか
スコープが違うのか。。。
alert(abc)の値が思った通りにならない


*/
	window.onload = function(){
		initialize();
	};
	
	var marker_ary2 = new Array();
	var currentInfoWindow2;
	var mapObj2;
	
	var aryContext = new Array();

	function bb(){
		alert(a);
	}

	function initialize() {
		//alert(aryContext[0].id);
		alert(aryContext[0].xml);
		
		
		var abc = 5;
		
		var LocateLat;
		var LocateLng;
		var zoomVal;
		$.ajax({			
			url:aryContext[0].xml,
			type:'GET',
			dataType:'xml',
			timeout:1000,
			error: function(){ alert("xml read fail"); },
			success:function(xml){
				alert("abc1="+abc);
				abc = 10;
				alert("abc2="+abc);
				//帰ってきた地点の数だけループ
				$(xml).find("Map").each(function(){
					LocateLat = $("lat",this).text();
					LocateLng = $("lng",this).text();
                    zoomVal = $("zoom",this).text();
                    	alert(LocateLat);
                });
            }
            //alert("abc"+abc);
        });
		
		alert("abc3="+abc);

/*		n = function(){
			var a = 10;
			alert(a);
			f = function(){
				alert(a);
			}
			f();
		};
		
		n();
		bb();
*/		
		//alert(LocateLat);
		//alert(LocateLng);
		
		var latlng = new google.maps.LatLng(LocateLat,LocateLng);
		var myOptions = {
      		zoom: zoomVal,
      		center: latlng,
      		mapTypeId: google.maps.MapTypeId.ROADMAP
      	};
    
    	mapObj2 = new google.maps.Map(
    	document.getElementById("map_canvas2"),
    	myOptions);
		
		setPointMarker();
		
		
	}
	
	function gmapPin1Data(id, xml){
		this.id = id;
		this.xml = xml;
		aryContext.push(this);
	}
	
	
	

/*	gmapPin1.new = function(id, xml) {
		gmapPin1.savId = id;
		gmapPin1.savXML = xml;
	};
*/	


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
		var match = scripts[i].src.match(/(^|.*\/)gmapPin1\.js$/);
		if (match) {
			var root = match[1];
			break;
			}
		}
		return root;
	}
			
