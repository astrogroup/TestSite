  google.maps.event.addDomListener(
  window,
  'load',
  initialize);

	var marker_ary = new Array();
	var currentInfoWindow;
	var mapObj;

	function initialize() {
		var latlng = new google.maps.LatLng(34.985458, 135.757755);
		var myOptions = {
      	zoom: 8,
      	center: latlng,
      	mapTypeId: google.maps.MapTypeId.ROADMAP
      	};
    
    	mapObj = new google.maps.Map(
    	document.getElementById("map_canvas"),
    	myOptions);
    	
		var marker = new google.maps.Marker({
			position:latlng,
			map:mapObj});
		
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
		
		//XML�擾
		$.ajax({
			url:'sample.xml',
			type:'GET',
			dataType:'xml',
			timeout:1000,
			error: function(){
				alert("xml�ǂݍ��ݎ��s");
			},
			success:function(xml){
				//�A���Ă����n�_�̐��������[�v
				$(xml).find("Locate").each(function(){
					var LocateLat = $("lat",this).text();
					var LocateLng = $("lng",this).text();
                    var LocateName = $("name",this).text();
                    //�}�[�J�[���Z�b�g
                    MarkerSet(LocateLat,LocateLng,LocateName);
					//���X�g�\��
                    //���X�g�ɑΉ�����}�[�J�[�z��L�[���Z�b�g
                    var marker_num = marker_ary.length - 1;
					//li��a�^�O���Z�b�g
					loc = $('<li>').append($('<a href="javascript:void(0)"/>').text(LocateName));
					//�Z�b�g�����^�O�ɃC�x���g�u�}�[�J�[���N���b�N���ꂽ�v���Z�b�g
                    loc.bind('click', function(){
                        google.maps.event.trigger(marker_ary[marker_num], 'click');
                    });
					//���X�g�\��
					$('#pointlist > ul').append(loc);
				});
			}
		});
	}
	
	
