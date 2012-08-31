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
	//window.jQuery�I�u�W�F�N�g�͂ǂ��ɂ����?

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

      //�}�[�J�[�폜
    function MarkerClear() {
        //�\�����̃}�[�J�[������΍폜
        if(marker_ary2.length > 0){
            //�}�[�J�[�폜
            for (i = 0; i <  marker_ary2.length; i++) {
                marker_ary2[i].setMap();
            }
            //�z��폜
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
 
        //text���n����Ă�����ӂ��������Z�b�g
        if(text.length>0){
            var infoWndOpts = {
                content : text
            };
            var infoWnd = new google.maps.InfoWindow(infoWndOpts);
            google.maps.event.addListener(marker_ary2[marker_num], "click", function(){
 
                //��ɊJ�������E�B���h�E������΁Aclose����
                if (currentInfoWindow2) {
                    currentInfoWindow2.close();
                }
 
                //���E�B���h�E���J��
                infoWnd.open(mapObj2, marker_ary2[marker_num]);
 
                //�J�������E�B���h�E���L�^���Ă���
                currentInfoWindow2 = infoWnd;
            });
        }
    }

	function setPointMarker() {
	    //���X�g�̓��e���폜
	    //$('#pointlist > ul').empty();
		var root = getDir();

		//XML�擾
		$.ajax({			
			url:root+"sample007.xml",
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
                    var LocateName = $("name_ja",this).text();
                    //�}�[�J�[���Z�b�g
                    MarkerSet(LocateLat,LocateLng,LocateName);
					//���X�g�\��
                    //���X�g�ɑΉ�����}�[�J�[�z��L�[���Z�b�g
                    var marker_num = marker_ary2.length - 1;
					//li��a�^�O���Z�b�g
					//loc = $('<li>').append($('<a href="javascript:void(0)"/>').text(LocateName));
					//�Z�b�g�����^�O�ɃC�x���g�u�}�[�J�[���N���b�N���ꂽ�v���Z�b�g
                    //loc.bind('click', function(){
                    //    google.maps.event.trigger(marker_ary2[marker_num], 'click');
                    //});
					//���X�g�\��
					//$('#pointlist > ul').append(loc);
				});
			}
		});
	}
	
	
	//����gmap007.js������t�@�C���f�B���N�g�����擾
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
			
