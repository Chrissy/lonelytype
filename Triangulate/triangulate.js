//		Author: Chrissy Clark(fivefourths@gmail.com)
//		webtypographyforthelonely.com
//
//		Triangulate is a function that traps triangles inside of fragments of color.
//		It utilizes Html5 Canvas as well as heavy dom scripting. The way it works 
//		is simple: For every letter, create a canvas, and fill it with random 
//		colored triangles.
//
//		You can call it using: 
//                                     tri.init('idOfTargetedElement')
//
//      Triangulate uses shellac, so it pulls all of the styles from whatever text
//		element you are targeting. You can access all of the created nodes through
//		the tri.node prototype. for ex the canvas is at tri.Node[0].shellac.canvas
//		check the tri.Node function to understand how the object is mapped.


var tri = {
  	  t : document.getElementById('triangulate'),
  	  myInterval : 0,
	  colorArray : ["#008CD1","#CA5752","#FFED00","#E4066F"],
      compArray : ['lighter','darker','lighter','darker'],
	  nodes : [],


	  cram : function(location,colornum,divname) {

			var y = 1;	var x=0;
			divname = (!divname) ? "color" : divname
			colornum = (!colornum) ? 3 : colornum 
			var text = location.innerHTML
			var length = text.length - 1
			nodes = []   
			location.innerHTML = ""

			for (x;x<=length;x+=1) {
				var stringslice = text.slice(x,x+1);
				nodes[x] = document.createElement('span')
				nodes[x].innerHTML = stringslice
				if (stringslice == " ") {
					nodes[x].setAttribute('class',divname + "space")
				}
				else {	
					nodes[x].setAttribute('class',divname+y)
				}	
				location.appendChild(nodes[x])
				y = (y < colornum) ? y + 1 : 1
			}
			return nodes    

	},


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



   colorCube : function(canvas,predata) {
	   var rotation = 0, a = 0, p = 0, node = {}, that = this
	   var context = canvas.getContext("2d")
	   var anim = setInterval(makeCubes,10)
	   function getRandom(){ return Math.random()*canvas.offsetHeight }
	   var randos = [getRandom(),getRandom(),getRandom(),getRandom()]
	   function makeCubes() {
		   context.clearRect(0,0,canvas.width,canvas.height)
		   context.putImageData(predata,0,0)
		   function drawTriangle(x,y,length,height,type) {
		  	   context.beginPath() ;       	
			   context.moveTo(x, y); // give the (x,y) coordinates
			   context.lineTo(length, height);
			   context.lineTo(randos[type], p);
			   context.fillStyle = that.colorArray[type]
			   context.globalCompositeOperation = that.compArray[type]
			   context.lineTo(0, 0); 
		  	   context.fill();
		  	   context.closePath();
		   }

		   drawTriangle(0,0,p,0,0)
		   drawTriangle(p,0,p,p,1) 
		   drawTriangle(p,p,0,p,2) 
		   drawTriangle(0,p,p,p,3) 
		   if (p > canvas.height) { clearInterval(anim) } 
		   else { p = p + 40 }

	   }


       var goodies = {}
	   goodies.canvas = canvas
	   goodies.anim = anim
	   goodies.predata = predata
	   return goodies

	},


	eventFire : function(element) {
				this.colorCube(element.colorCube.canvas,element.colorCube.predata)
				element.colorCube.canvas.addEventListener("mouseout",function(){
					clearInterval(element.colorCube.anim)
					element.colorCube.canvas.removeEventListener("mouseout")
				 },false)

	},
	  
	
	getPreData : function(canvas) {
		var context = canvas.getContext('2d')
	    var imageData = context.getImageData(0,0,canvas.clientWidth - 1,canvas.clientHeight - 1)
	    return imageData
	},


	Node : function(shell,parent) {
		var that = this
		this.cram = shell
		this.canvas = parent.shellac(shell,true)
		this.preData = parent.getPreData(this.canvas)
	    this.colorCube = parent.colorCube(this.canvas,this.preData)
		this.colorCube.canvas.addEventListener("mouseover",function(){
			parent.eventFire(that)
		},false)
		return this	
	},


	init: function(target){
		var that = this
		if(target) { 
			this.t = document.getElementById(target) }
		this.t.className += " triangulated"
		var nodes = this.cram(this.t,1,'canv')
		var boot = function() {
			for(i in nodes) {
				if(nodes[i].innerHTML != " ") {
	        		that.nodes[i] = new that.Node(nodes[i],that)
				}
			}
            that.t.className += " active"
 		}
		window.setTimeout(boot,100)
	}


}


tri.init('to_tri') 