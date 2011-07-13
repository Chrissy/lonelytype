//		Author: Chrissy Clark(fivefourths@gmail.com)
//		webtypographyforthelonely.com
//
//		Cluster is a smart little function that combines two web technologies:
//      html5 Canvas and SVG. Basically, it uses the awesome getImageData
//      function in canvas to pull the rendered pixel values for a given block
//      of type and then reconstruct that pixel by pixel. Pretty cool, eh?
//
//      call it: 
//
//               cluster.init()
//
//     cluster uses a lot of defaults. I'm not going to explain them to you
//     because I figure it you've made it this far you can figure it out.
//	   Anyways. They are at the bottom. 


var cluster = {   
    

 	shellac : function(object, styles){ 
	      //style getter for both standards based browsers and that other browser
	      function getStyle(styleProp) {
	      	if (object.currentStyle)
	      		var style = object.currentStyle[styleProp];
	      	else if (window.getComputedStyle)
	      		var style = document.defaultView.getComputedStyle(object,null).getPropertyValue(styleProp);
	      	return style;
	      }

			  //get styles
			  if (styles == null){
			  styles = new Object()
			  styles.font = getStyle("font-family");
	  		  styles.weight = getStyle("font-weight");
	  		  styles.size = parseInt(getStyle("font-size"));
	  		  styles.style = getStyle("font-style");
	  		  styles.color = getStyle("color"); 
	  		  styles.leading = parseInt(getStyle("line-height"))
			  }
			  //create a canvas
			  var canvas = document.createElement('canvas')
			  canvas.setAttribute('class','shellac')
			  canvas.width = object.clientWidth
			  canvas.height = object.clientHeight
			  object.parentNode.insertBefore(canvas,object.nextSibling)
			  context = canvas.getContext("2d");
			  context.fillStyle= styles.color
			  context.font = styles.weight + " " + styles.style + " " + styles.size + "px " + styles.font
			  //split up the string into words
			  var text = object.innerHTML;
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
			return canvas;
	}, 
	
	
	getTypeData : function(parent) {
	  this.width = this.canvas.clientWidth
	  this.height = this.canvas.clientHeight
	  var ctx = this.canvas.getContext('2d')
	  imageData = ctx.getImageData(0,0,this.width,this.height)
	  p = this.canvas.parentNode
	  p.removeChild(this.canvas)

	  return imageData

	},


	generateShapes : function() {
		  var nodes = []
		  for(var h=0;h<this.height;h+=this.density){
		    for(var w=0;w<this.width;w+=this.density){   
		       var pixel = this.imageData.data[((w+(h*this.width))*4)-1]
		          if(pixel > 0) {
		            nodes[w*h] = new this.Node(w,h,this)
		          }
		    }
		  }
		return nodes
	},

	Node : function(x,y,parent) {
		var t = this, op = parent.radius
		t.el = document.createElementNS("http://www.w3.org/2000/svg", parent.shape)
		t.el.setAttribute('opacity',0)
		var rando = parseInt(Math.random()*parent.speed)
		t.el.setAttribute('cx', 0)
		t.el.setAttribute('cx', x)
	    t.el.setAttribute('cy', y)
	    t.el.setAttribute('r', parent.radius)
	    t.el.setAttribute('fill', parent.colors[parseInt(Math.random()*4)])
		var changeOP = function(){
			op = op + 1
			parent.root.suspendRedraw(100)
			t.el.setAttribute('opacity',op)
			parent.root.unsuspendRedrawAll() 
		}
		var timer = window.setTimeout(changeOP,rando)
		parent.root.appendChild(t.el)
		t.grow = function(parent,evt) { 
			evt.target.Y = 0
			var r = parent.radius, that = this
		    this.loop = function() {
		    	parent.root.suspendRedraw(100)
				evt.target.Y = evt.target.Y - 6
		    	evt.target.setAttribute('transform', 
				'translate(' + 0 + ',' + evt.target.Y + ')')
		        r = r + 0.1
		        evt.target.setAttribute('r',r)
		    	parent.root.unsuspendRedrawAll()
		 		if(evt.target.Y < parent.timeout) {
			    	clearInterval(that.timer)
				}
		    }
			that.timer = window.setInterval(this.loop,30) 
		}
		this.el.addEventListener("mouseover",
			function(event){ 
				t.grow(parent,event)
			}
		,true)
		t.el.x = x
		t.el.y = y
		return this
	},
	
  

	init : function(target) {
		  var c = this
		  var target = document.getElementById(target)
		  target.className += " clustered" 
	      c.root = document.createElementNS("http://www.w3.org/2000/svg", 'svg')
	      c.root.setAttribute('width', target.clientWidth)
	      c.root.setAttribute('height', target.clientHeight)
		  c.root.setAttribute('id','clustered')
		
		  var boot = function() {
			  c.canvas = c.shellac(target)
			  c.imageData = c.getTypeData(target)
			  var allNodes = c.generateShapes()
		      target.appendChild(c.root)
			  target.className += " active"   
		 }
		 window.setTimeout(boot,100)
	},

	root : null,
	nodes : [],
	density: 8,
	radius: 3,
	target: 'cluster',
	shape: 'circle',
	speed: 1000,
	timeout: -700,
	colors : ["#00B6B8","#ED5F4C","#F9A235","#2E3192"] 


}

cluster.init('to_cluster')