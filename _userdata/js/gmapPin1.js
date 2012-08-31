
	window.onload = function(){
		initialize();
	};

	//�}�b�v�̃R���e�N�X�g��ۑ�
	var aryContext = new Array();
	
	//�R���X�g���N�^
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
				//�A���Ă����n�_�̐��������[�v
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
 
        //text���n����Ă�����ӂ��������Z�b�g
        if(text.length>0){
            var infoWndOpts = {
                content : text
            };
            var infoWnd = new google.maps.InfoWindow(infoWndOpts);
            google.maps.event.addListener(aryContext[aryIndex].aryMarker[marker_num], "click", function(){
 
                //��ɊJ�������E�B���h�E������΁Aclose����
                if (aryContext[aryIndex].currentInfoWindow) {
                    aryContext[aryIndex].currentInfoWindow.close();
                }
 
                //���E�B���h�E���J��
                infoWnd.open(aryContext[aryIndex].mapObj, aryContext[aryIndex].aryMarker[marker_num]);
 
                //�J�������E�B���h�E���L�^���Ă���
                aryContext[aryIndex].currentInfoWindow = infoWnd;
            });
        }
    }



	function setPointMarker(aryIndex) {
	    //���X�g�̓��e���폜
	    //$('#pointlist > ul').empty();

		//XML�擾
		$.ajax({			
			url:aryContext[aryIndex].xml,
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
                    MarkerSet(LocateLat,LocateLng,LocateName,aryIndex);
					//���X�g�\��
                    //���X�g�ɑΉ�����}�[�J�[�z��L�[���Z�b�g
                    var marker_num = aryContext[aryIndex].aryMarker.length - 1;
					//li��a�^�O���Z�b�g
					//loc = $('<li>').append($('<a href="javascript:void(0)"/>').text(LocateName));
					//�Z�b�g�����^�O�ɃC�x���g�u�}�[�J�[���N���b�N���ꂽ�v���Z�b�g
                    //loc.bind('click', function(){
                    //    google.maps.event.trigger(aryContext[aryIndex].aryMarker[marker_num], 'click');
                    //});
					//���X�g�\��
					//$('#pointlist > ul').append(loc);
				});
			}
		});
	}
	
