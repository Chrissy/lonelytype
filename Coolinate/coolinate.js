//		Author: Chrissy Clark(fivefourths@gmail.com)
//		webtypographyforthelonely.com
//
//      Coolinate makes lines behind text using a function I made
//      called shellac, which is a helper function to seamlessly
//      convert an html text element into a canvas element.
//      
//      Like all functions that use shellac, loading order can be
//      an issue. You need to wrap the function is a font-loading
//      callback function (something like typekit.load). Even After
//      this there can still be some issues with loading if you are
//      putting all your js in the footer. wrapping in a very short
//		setInterval helps usually. 


var coolinate = {  
	
	
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
		  var canvas = this.shellac(object);
		  var context = canvas.getContext("2d");

		  width = canvas.width;
		  height = canvas.height;

		  //makes some lines
	 	  context.globalCompositeOperation = 'destination-out'
		  for(var j=(width/2)*-1;j<width/6;j++){
			context.strokeStyle = '#f00';
			context.lineWidth = 2;

			context.beginPath();
			context.moveTo(j*6, 0); // give the (x,y) coordinates
			context.lineTo((j*6)+(width/2), height);

			context.stroke();
			context.closePath();
		  }
		
		  object.className += " active"
		  canvas.className += " active"

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
	target : 'coolinate'  
}
                          

coolinate.init('to_cool') 