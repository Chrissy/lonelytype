//		Author: Chrissy Clark(fivefourths@gmail.com)
//		webtypographyforthelonely.com
//
//      Punchout puts an image behind text using html5 canvas.
//      This version animates it in by pulling it down. I might
//      support more animations in the future as, unlike a lot
//      of my work, I could forsee this one actually being 
//      useful to people who are not totally crazy like myself.
//
//      the big trick with this guy is in how you call it. you
//      need to double rap it in a font-load event and a document
//      load event. Otherwise you can be missing assets on draw. 
//
//		like this:
//
//      Typekit.load(
//			{ active : function() {
//	 			$(document).ready(function(){
//             		punchout.image = "/images/mushroom-cloud2.jpg"
//			 		punchout.init('intro')
//
//				})   
//			}}
//		)

		

var punchout = {
	

    //&&& SHELLAC &&//  

    shellac : function(object, clean){ 
		      //style getter for both standards based browsers and that other browser
		      function getStyle(styleProp) {
		      	if (object.currentStyle)
		      		var style = object.currentStyle[styleProp];
		      	else if (window.getComputedStyle)
		      		var style = document.defaultView.getComputedStyle(object,null).getPropertyValue(styleProp);
		      	return style;
		      }    

			  //get styles
			  styles = new Object()
			  styles.font = getStyle("font-family");
	  		  styles.weight = getStyle("font-weight");
	  		  styles.size = parseInt(getStyle("font-size"));
	  		  styles.style = getStyle("font-style");
	  		  styles.color = getStyle("color");
	  		  styles.leading = parseInt(getStyle("line-height"))

			  //create a canvas
			  var canvas = document.createElement('canvas')
			  canvas.setAttribute('class','shellac')
			  canvas.width = object.offsetWidth
			  canvas.height = object.offsetHeight
			  context = canvas.getContext("2d");
			  context.fillStyle= styles.color
			  context.font = styles.weight + " " + styles.style + " " + styles.size + "px " + styles.font
			  //split up the string into words
			  var text = object.innerHTML;
			  if(clean) {
			  	object.innerHTML = "" }
			  var wordArray = text.split(" "); 
			  var phraseArray = new Array();
			  var lastPhrase = ""



			  //break ups
			  for (var i=0;i<wordArray.length;i++) {
				   var word = wordArray[i];
				   var measure = context.measureText(lastPhrase + " " + word).width;
				   if(i == 0) { lastPhrase = word }
	         else if(measure < object.clientWidth) { lastPhrase+=(" " + word); }
				   else {
				     phraseArray.push(lastPhrase);
				     lastPhrase = word;
				   }
			  }
			  phraseArray.push(lastPhrase);

			  //draw text
			  for(var i=0;i<phraseArray.length;i++) {
				  context.fillText(phraseArray[i], 0, (i * styles.leading) + styles.size);
			  }

			object.appendChild(canvas)
			return canvas;
	},
	
	
	draw : function(object){
		 //shellac some
		  var canvas = this.shellac(object)
		  var context = canvas.getContext("2d")
		  var down = this.down, anim, interval = this.interval, that = this
		  var imgData = context.getImageData(0,0,canvas.clientWidth - 1,canvas.clientHeight - 1)

		  function animate() {
			  //clear canvas
			  context.clearRect(0,0,canvas.width,canvas.height)
			
			  //put type image
		      context.putImageData(imgData,0,0)
		
			  //move image down and set composite type
			  down = down + 50
			  context.globalCompositeOperation = 'source-atop'
		      context.drawImage(img,0,down)
		
			  //timeout
			  if(down < 0) {
				setTimeout(animate,interval)
				interval = interval + 0.2
			  }
    	  }

		    var img = new Image();
		    img.src = this.image
		    img.onload = function() {
			  if(that.animate == true) {
		      	window.setTimeout(animate,interval)
			  } else {
			    context.drawImage(img,0,down)      
			  }
		    }

		  object.className += " active"

	},


	init : function(target){
		var that = this
		if(target){
			this.target = target
		}
		object = document.getElementById(this.target)
		//push rendering back to avoid blank canvas bug
		window.setTimeout(start,100)
		function start(){
			that.draw(object)
		}
	},
	target : 'punchout',
	image : 'nothing.png',
	interval : 1,
	down : -750,
	animate : true     
	
}

punchout.image = "halftone.jpg"
punchout.init('to_punch')    