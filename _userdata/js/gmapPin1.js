
	window.onload = function(){
		initialize();
	};

	//マップのコンテクストを保存
	var aryContext = new Array();
	
	//コンストラクタ
	function gmapPin1Data(id, xml){
		this.id = id;
		this.xml = xml;
		this.mapObj = null;
		this.currentInfoWindow = null;
		this.aryMarker = new Array();
		aryContext.push(this);
	}
	
	
	function initialize(){
		for (var aryIndex = 0; aryIndex < aryContext.length; aryIndex++) {
			makeMapBase(aryIndex);
			setPointMarker(aryIndex);
		}
	}
	
	
	function makeMapBase(aryIndex){
		$.ajax({
			url:aryContext[aryIndex].xml,
			type:'GET',
			dataType:'xml',
			timeout:1000,
			error: function(){ alert("xml read fail"); },
			success:function(xml){
				//帰ってきた地点の数だけループ
				$(xml).find("Map").each(function(){
					var LocateLat = $("lat",this).text();
					var LocateLng = $("lng",this).text();
                    var zoomVal = $("zoom",this).text();
                    
                    var latlng = new google.maps.LatLng(LocateLat,LocateLng);
					var myOptions = {
      					zoom: parseInt(zoomVal),
      					center: latlng,
			      		mapTypeId: google.maps.MapTypeId.ROADMAP
  			    	};
    
    				aryContext[aryIndex].mapObj = new google.maps.Map(
			    		document.getElementById(aryContext[aryIndex].id),
    					myOptions);
                    
                });
            }

        });
    }


    function MarkerSet(lat,lng,text,aryIndex){
        var marker_num = aryContext[aryIndex].aryMarker.length;
        var marker_position = new google.maps.LatLng(lat,lng);
        var markerOpts = {
            map: aryContext[aryIndex].mapObj,
            position: marker_position
        };
        aryContext[aryIndex].aryMarker[marker_num] = new google.maps.Marker(markerOpts);
 
        //textが渡されていたらふきだしをセット
        if(text.length>0){
            var infoWndOpts = {
                content : text
            };
            var infoWnd = new google.maps.InfoWindow(infoWndOpts);
            google.maps.event.addListener(aryContext[aryIndex].aryMarker[marker_num], "click", function(){
 
                //先に開いた情報ウィンドウがあれば、closeする
                if (aryContext[aryIndex].currentInfoWindow) {
                    aryContext[aryIndex].currentInfoWindow.close();
                }
 
                //情報ウィンドウを開く
                infoWnd.open(aryContext[aryIndex].mapObj, aryContext[aryIndex].aryMarker[marker_num]);
 
                //開いた情報ウィンドウを記録しておく
                aryContext[aryIndex].currentInfoWindow = infoWnd;
            });
        }
    }



	function setPointMarker(aryIndex) {
	    //リストの内容を削除
	    //$('#pointlist > ul').empty();

		//XML取得
		$.ajax({			
			url:aryContext[aryIndex].xml,
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
                    MarkerSet(LocateLat,LocateLng,LocateName,aryIndex);
					//リスト表示
                    //リストに対応するマーカー配列キーをセット
                    var marker_num = aryContext[aryIndex].aryMarker.length - 1;
					//liとaタグをセット
					//loc = $('<li>').append($('<a href="javascript:void(0)"/>').text(LocateName));
					//セットしたタグにイベント「マーカーがクリックされた」をセット
                    //loc.bind('click', function(){
                    //    google.maps.event.trigger(aryContext[aryIndex].aryMarker[marker_num], 'click');
                    //});
					//リスト表示
					//$('#pointlist > ul').append(loc);
				});
			}
		});
	}
	
