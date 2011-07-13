//		Author: Chrissy Clark(fivefourths@gmail.com)
//		webtypographyforthelonely.com
//
//		shellac is a flexible little function for gracefully transferring
//		designed type into canvas. unlike more robust solutions like cufon
//		and typeface.js, which have little application in a post @font-face
//		world, shellac finds purpose in performing a simple task flexibly
//		and by easily being integrating into projects that require canvas to
//		perform more complex operations (i.e. everything on web typography 
//		for the lonely). It can't field everything yet, most notably the
//		text-align property.
		
		

var shellac = function(object, clean){ 

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
}