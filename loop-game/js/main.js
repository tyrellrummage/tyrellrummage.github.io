$(document).ready(function(){

	function randomInt(min,max){
		return Math.floor(Math.random()*(max-min+1)+min);
	}

	function equal(array1, array2) {
		if (!Array.isArray(array1) && !Array.isArray(array2)) {
			return array1 === array2;
		}
		if (array1.length !== array2.length) {
			return false;
		}
		for (var i = 0, len = array1.length; i < len; i++) {
			if (!equal(array1[i], array2[i])) {
				return false;
			}
		}
		return true;
	}

	var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

	var Game = {
		gameString: '',
		bgColor: undefined,
		color: undefined,
		hue: undefined,
		won: false,
		tileSize: 48,
		gridSize: [7, 9],
		loopIcons: [],
		selected: undefined
	}

	function generateColorScheme(){
		var hue = randomInt(0, 360);
		Game.bgColor = 'hsl('+hue+', 80%, 94%)';
		Game.color = 'hsl('+hue+', 30%, 50%)';
		Game.hue = hue;
		$('h2').css('color', Game.color);
		$('.viewport, .design').css('background', Game.bgColor);
		$('.grow-circle').css('background', Game.color);
	}

	function init(){
		generateColorScheme();

		$('.grid, .creator-grid').css({ width: Game.tileSize*Game.gridSize[0]+'px', height: Game.tileSize*Game.gridSize[1]+'px'})
		$('.loop').css({ width: Game.tileSize*0.6+'px', height: Game.tileSize*0.6+'px'})
		$('.delete').css({ width: Game.tileSize*0.6+'px', height: Game.tileSize*0.6+'px'})
		$('.elements').css({ width: Game.tileSize*Game.gridSize[0]+'px', height: Game.tileSize+'px'})

		Game.loopIcons[0] = '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 67 67" style="enable-background:new 0 0 67 67;" xml:space="preserve"><rect x="-9" y="30" width="89" height="7" fill="'+Game.color+'"></svg>';
		Game.loopIcons[1] = '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 67 67" style="enable-background:new 0 0 67 67;" xml:space="preserve"><circle id="XMLID_1_" fill-opacity="0" cx="33.5" cy="33.5" r="15.5" stroke-width="7" stroke="'+Game.color+'"/><rect id="XMLID_2_" x="0" y="30" width="15" height="7" fill="'+Game.color+'"/></svg>';
		Game.loopIcons[2] = '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 67 67" style="enable-background:new 0 0 67 67;" xml:space="preserve"><circle id="XMLID_1_" class="st0" cx="0" cy="0" r="33.5" fill-opacity="0" stroke-width="7" stroke="'+Game.color+'"/></svg>';
		Game.loopIcons[3] = '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 67 67" style="enable-background:new 0 0 67 67;" xml:space="preserve"><circle id="XMLID_1_" class="st0" cx="0" cy="0" r="33.5" fill-opacity="0" stroke="'+Game.color+'" stroke-width="7"/><g id="XMLID_2_"><circle id="XMLID_12_" class="st1 hoverFix" cx="0" cy="67" r="33.5" fill-opacity="0" stroke="'+Game.bgColor+'" stroke-width="10"/><circle id="XMLID_11_" class="st0" cx="0" cy="67" r="33.5" fill-opacity="0" stroke="'+Game.color+'" stroke-width="7"/></g></svg>';
		Game.loopIcons[4] = '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 67 67" style="enable-background:new 0 0 67 67;" xml:space="preserve"><circle id="XMLID_1_" class="st0" cx="0" cy="0" r="33.5" fill-opacity="0" stroke="'+Game.color+'" stroke-width="7"/><g id="XMLID_2_"><circle id="XMLID_12_" class="st1 hoverFix" cx="0" cy="67" r="33.5" fill-opacity="0" stroke="'+Game.bgColor+'" stroke-width="10"/><circle id="XMLID_11_" class="st0" cx="0" cy="67" r="33.5" fill-opacity="0" stroke="'+Game.color+'" stroke-width="7"></g><g id="XMLID_3_"><circle id="XMLID_16_" class="st1 hoverFix" cx="67" cy="0" r="33.5" fill-opacity="0" stroke="'+Game.bgColor+'" stroke-width="10"/><circle id="XMLID_15_" class="st0" cx="67" cy="0" r="33.5" fill-opacity="0" stroke="'+Game.color+'" stroke-width="7"/></g><g id="XMLID_4_"><circle id="XMLID_20_" class="st1 hoverFix" cx="67" cy="67" r="33.5" fill-opacity="0" stroke="'+Game.bgColor+'" stroke-width="10"/><circle id="XMLID_19_" class="st0" cx="67" cy="67" r="33.5" fill-opacity="0" stroke="'+Game.color+'" stroke-width="7"/></g></svg>';
	}

	init();

	function gup(name, url) {
		if (!url) url = location.href;
		name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
		var regexS = "[\\?&]"+name+"=([^&#]*)";
		var regex = new RegExp( regexS );
		var results = regex.exec( url );
		return results == null ? null : results[1];
	}

	function checkUrl(){
		var query = gup('game',document.location.search);
		if(query){
			Game.gameString = query;
			decodeString();
			$('.viewport').css('transform', 'translate3d(0, 0, 0)');
		}	
	}

	checkUrl();

	/* ============== PLAY ============== */

	var correctArray, shuffledArray;

	function decodeString(){
		var decodedString = Base64.decode(Game.gameString);
		var decodedArrays = decodedString.split('!!');

		correctArray = JSON.parse(decodedArrays[0]);
		shuffledArray = JSON.parse(decodedArrays[1]);

		generateGameGrid();
	}

	function generateGameGrid(){
		for(var i = 0; i < Game.gridSize[0]*Game.gridSize[1]; i++){
			var group = shuffledArray[i];
			if(group[0]==0){
				$('.grid').append('<div class="grid-item" data-rotation="0" data-id="0" style="width: '+Game.tileSize+'px; height: '+Game.tileSize+'px"></div>');
			}else{

				var id = group[0];
				var state = group[1];
				var rotation = state*90;

				$('.grid').append('<div class="grid-item" data-rotation="'+rotation+'" data-id="'+id+'" style="width: '+Game.tileSize+'px; height: '+Game.tileSize+'px; transform: rotate('+rotation+'deg)">\
					'+Game.loopIcons[id-1]+'\
					</div>');
			}
		}
	}


	$(document).on('click', '.grid-item', function(){
		var $this = $(this);
		var rotation = parseInt($this.attr('data-rotation'));
		var newRotation = rotation+90;

		$this.attr('data-rotation', newRotation);
		$this.css('transform', 'rotate('+newRotation+'deg)');

		if(!Game.won){
			checkWin();
		}
	});

	function checkWin(){
		var levelCurrentArray = [];

		$('.grid-item').each(function(){
			var $this = $(this);
			var rotation = $this.attr('data-rotation');
			var id = parseInt($this.attr('data-id'));
			var state = (rotation/90)%4;

			if(id==0){
				levelCurrentArray.push([0]);
			}else{
				if(id==1){
					if(state==0 || state==2){
						levelCurrentArray.push([id, 0]);	
					}else{
						levelCurrentArray.push([id, 1]);
					}
				}else if(id==5){
					levelCurrentArray.push([id, 0]);
				}else{
					levelCurrentArray.push([id, state]);
				}
			}
		});

		if(equal(correctArray, levelCurrentArray)){
			Game.won = true;
			winGame();
		}
	}

	function winGame(){
		$('.grow-circle').addClass('won');
		setTimeout(function(){
			$('.grow-circle p').addClass('won');
			$('.grow-circle div').addClass('won');
		}, 600);
	}

	/* ============== CREATE GAME ============== */

	var createLevelArray = [];
	var shuffleLevelArray = [];

	function generateLoopCreatorElements(){
		var count = 0;

		$('.loop').each(function(){
			$(this).append(Game.loopIcons[count])
			count++;
		});
	}

	function generateGrid(){
		for(var i = 0; i < Game.gridSize[0]*Game.gridSize[1]; i++){
			$('.creator-grid').append('<div class="creator-grid-item" data-rotation="0" data-id="0" style="width: '+Game.tileSize+'px; height: '+Game.tileSize+'px"></div>');
		}
	}

	$(document).on('click', '.elements-container div', function(){
		var $this = $(this);
		var id = parseInt($this.attr('data-id'));
		$this.addClass('selected');
		$('.elements-container div').not($this).removeClass('selected');
		Game.selected = id;
	});

	$(document).on('contextmenu', '.creator-grid-item', function(e){
		var $this = $(this);
		if(!$this.is(':empty')){

			var rotation = parseInt($this.attr('data-rotation'));
			var newRotation = rotation+90;
			var state = (rotation/90)%4;

			$this.attr('data-rotation', newRotation);
			$this.css('transform', 'rotate('+newRotation+'deg)');	
		}	
		return false;
	});

	$(document).on('click', '.creator-grid-item', function(e){
		var $this = $(this);
		if($this.is(':empty') && Game.selected!=0){
			$this.append(Game.loopIcons[Game.selected-1]);
			$this.attr('data-id', Game.selected);	
		}else if (Game.selected!=0){
			$this.empty().append(Game.loopIcons[Game.selected-1]);
			$this.attr('data-id', Game.selected);
		}else{
			$this.empty();
			$this.attr('data-id', 0);
		}
	});

	$('.creator button').on('click', function(e){
		//state one
		if($(this).attr('data-state') == "first"){
			createLevelArray = [];

			$('.creator-grid-item').each(function(){
				var $this = $(this);
				var rotation = $this.attr('data-rotation');
				var id = parseInt($this.attr('data-id'));
				var state = (rotation/90)%4;

				if(id==0){
					createLevelArray.push([0]);
				}else if(id==1){
					if(state==0 || state==2){
						createLevelArray.push([id, 0]);	
					}else{
						createLevelArray.push([id, state]);
					}
				}else if(id==5){
					createLevelArray.push([id, 0]);
				}else{
					createLevelArray.push([id, state]);
				}
			});

			$('.delete').addClass('disabled');
			$(this).attr('data-state', 'second');
			$(this).html('CREATE LEVEL');
		}else if($(this).attr('data-state') == "second"){
			shuffleLevelArray = [];

			$('.creator-grid-item').each(function(){
				var $this = $(this);
				var rotation = $this.attr('data-rotation');
				var id = parseInt($this.attr('data-id'));
				var state = (rotation/90)%4;

				if(id==0){
					shuffleLevelArray.push([0]);
				}else if(id==1){
					if(state==0 || state==2){
						shuffleLevelArray.push([id, 0]);	
					}else{
						shuffleLevelArray.push([id, 1]);
					}
				}else if(id==5){
					shuffleLevelArray.push([id, 0]);
				}else{
					shuffleLevelArray.push([id, state]);
				}
			});

			var string = JSON.stringify(createLevelArray) + "!!" + JSON.stringify(shuffleLevelArray);
			var encodedString = Base64.encode(string);

			$('.modal').html('<h2>This is your level</h2><h3>Level link (you can share this link):</h3><textarea>https://tyrellrummage.github.io/loop-game/index.html?game='+encodedString+'</textarea><h3>Level raw code</h3><textarea>'+encodedString+'</textarea>');
			$('.overlay').css('display', 'flex').hide().fadeIn(400);

			$(this).attr('data-state', 'done');
			$(this).html('DONE').addClass('disabled');
		}
	});

	generateLoopCreatorElements();
	generateGrid();

	/* ============== EVENT HANDLING ============= */


	$('.play').on('click', function(){
		var gameString = prompt('Please insert your game string: ', '');
		if(gameString){
			Game.gameString = gameString;
			decodeString();
			$('.viewport').css('transform', 'translate3d(0, 0, 0)');
		}
	});

	$('.create').on('click', function(){
		$('.design').css('transform', 'translate3d(0, 0, 0)');
	});

	$('.design-instructions').on('click', function(){
		$('.modal').html("<h2>Instructions</h2><h3>First you have to build your level:</h3><p>Click on the items below the grid to select the type of item you want.</p><p>Click on the grid to place it.</p><p>Right-click on the grid to rotate an item.</p><h3>Once your level is built:</h3><p>Click on the black button below.</p><p>Rotate your items randomly to make the level hard to solve.</p><h3>Once you have shuffled your level:</h3><p>Click once again in the black button.</p><p>Copy the link and share it to play or copy the raw code, head back to the main menu and choose play.</p><p>Paste your code there.</p>");
		$('.overlay').css('display', 'flex').hide().fadeIn(400);
	});

	$('.overlay').click(function (e){
		var container = $('.modal');
		if (!container.is(e.target) && container.has(e.target).length === 0){
			$('.overlay').fadeOut(400);
		}
	});

	$('.back').on('click', function(){
		$('.design').css('transform', 'translate3d(0, -120%, 0)');
	});

	$(document).on('click', 'textarea', function(e){
		$(this).select();
	});

});