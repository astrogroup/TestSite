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

      //�}�[�J�[�폜
    function MarkerClear() {
        //�\�����̃}�[�J�[������΍폜
        if(marker_ary.length > 0){
            //�}�[�J�[�폜
            for (i = 0; i <  marker_ary.length; i++) {
                marker_ary[i].setMap();
            }
            //�z��폜
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
 
        //text���n����Ă�����ӂ��������Z�b�g
        if(text.length>0){
            var infoWndOpts = {
                content : text
            };
            var infoWnd = new google.maps.InfoWindow(infoWndOpts);
            google.maps.event.addListener(marker_ary[marker_num], "click", function(){
 
                //��ɊJ�������E�B���h�E������΁Aclose����
                if (currentInfoWindow) {
                    currentInfoWindow.close();
                }
 
                //���E�B���h�E���J��
                infoWnd.open(mapObj, marker_ary[marker_num]);
 
                //�J�������E�B���h�E���L�^���Ă���
                currentInfoWindow = infoWnd;
            });
        }
    }

	function setPointMarker() {
	    //���X�g�̓��e���폜
	    $('#pointlist > ul').empty();
		var root = getDir();
		
		//XML�擾
		$.ajax({			
			url:root+"sample003.xml",
			type:'GET',
			dataType:'xml',
			timeout:1000,
			error: function(){
				alert("xml�ǂݍ��ݎ��s");
			},
			success:function(xml){
				//�A���Ă����n�_�̐��������[�v
				$(xml).find("Region").each(function(){
					var myObj = this;
					var	aryRegionLatLng = new Array();
					$(myObj).find("Point").each(function(){
						var lat = $("lat",this).text();
						var lng = $("lng",this).text();
						aryRegionLatLng.push(new google.maps.LatLng(lat,lng));
					});
					
                    var LocateName = $("name_ja",this).text();
                    
                    //�|���S������
           			var Polygon = new google.maps.Polygon({
                		//�|���S���̃I�v�V�����ݒ�
                		paths: aryRegionLatLng,
                		strokeColor: "#0000ff",
               			strokeOpacity: 0.8,
                		strokeWeight: 2,
                		fillColor: "#0000ff",
                		fillOpacity: 0.35,
                		map: mapObj
                	});
            		//�|���S����n�}�ɒǉ�
            		Polygon.setMap(mapObj);
            	
				});
				
			}
		});
		
	}
	
	
	//����gmap003.js������t�@�C���f�B���N�g�����擾
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
			
