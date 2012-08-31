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
					
					//<Region>�f�[�^�ǂݍ���
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
                    
                    //�|���S������
           			var Polygon = new google.maps.Polygon({
                		//�|���S���̃I�v�V�����ݒ�
                		paths: 			aryRegionLatLng,
                		strokeColor: 	regionStrokeColor,
               			strokeOpacity: 	regionStrokeOpacity,
                		strokeWeight: 	regionStrokeWeight,
                		fillColor: 		regionFillColor,
                		fillOpacity: 	regionFillOpacity,
                		map: 			mapObj
                	});
            		//�|���S����n�}�ɒǉ�
            		Polygon.setMap(mapObj);
            		
                    //click�C�x���g�ǉ�
					var infoWndOpts = { 
						content:regionName,
						position:regionCenter
					};
					var infoWnd = new google.maps.InfoWindow(infoWndOpts);
					google.maps.event.addListener(Polygon, "click", function(){
						//��ɊJ���Ă����E�B���h�E������Ε���
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
	
	
	//����gmap003.js������t�@�C���f�B���N�g�����擾
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
			
