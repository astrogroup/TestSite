	function include(){
		var root = getDir();
		document.write('<script type="text/javascript"src="http://maps.google.com/maps/api/js?sensor=false"></script>');
		document.write('<script type="text/javascript"src="' + root + 'jquery-1.8.0.min.js"></script>');
		document.write('<script type="text/javascript"src="' + root + 'gmapPin1.js"></script>');
	}
	
	include();

	//このgmapPin1_h.jsがあるファイルディレクトリを取得
	function getDir(){
		var scripts = document.getElementsByTagName("script");
		var i = scripts.length;
		while (i--) {
		var match = scripts[i].src.match(/(^|.*\/)gmapPin1_h\.js$/);
		if (match) {
			var root = match[1];
			break;
			}
		}
		return root;
	}