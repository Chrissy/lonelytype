//		Author: Chrissy Clark(fivefourths@gmail.com)
//		webtypographyforthelonely.com
//
//      Illuminate is a function for making ghost typography,
//      which everyone obviously needs. It currently requires
//      raphael.js because, quite frankly, scripting animations
//      with SVG is awful and I don't wanna do it. 
//
//      If you scroll to the bottom you can see all of the 
//      defaults for illuminate. That big honking chunk of string
//      is the shape paths. Clean, huh? 
//
//      call it with:
//                       ill.init('myTargetedDivId')



var ill = {
	 
	
	
	cram : function(location,colornum,divname) {

			var y = 1;	var x=0;
			divname = (!divname) ? "color" : divname
			colornum = (!colornum) ? 3 : colornum 
			location = (!location) ? 'no location!' : location
			var text = location.innerHTML
			var length = text.length -1
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
	  
	

	Node : function(node,parent) {
		var r = function() {
			var x = parseInt(Math.random()*4)
			return x	
		}
		var that = this
		this.shell = node
		this.illuminated = false
	    rotate = parseInt(Math.random()*5) + 2 
	    this.text = node.innerHTML
	    node.innerHTML = ""
		this.div = document.createElement('span')
		this.div.innerHTML = this.text
		this.div.setAttribute('class','letter')
	    this.color = parent.colors[r()]
	    this.div.style.color = this.color
		this.setFontSize = (25*rotate) 
		this.div.style.fontSize = this.setFontSize + "px"
		node.appendChild(this.div)
		node.style.marginRight = (rotate*-20) +"px"
		node.style.height = ((28*rotate)+5) + "px"
		node.style.width = (40*rotate) + "px"
	    this.paper = Raphael(node,(28*rotate)+5,40*rotate);
	    var four = parseInt(Math.random()*4) 
	    var conservative = four + 2
	    this.shape = this.paper.path(parent.shapes[r()]).attr({
	        fill:this.color,
	        "stroke-width":"0.5",
	        stroke: "transparent"
	    });
	    this.shape.scale(rotate,rotate,0,0);
	    this.shape.attr("opacity","0.6")
		this.currentScale = rotate
		this.shrinkSize = this.currentScale - 0.3 
		this.illuminate = function() {
				if(!that.illuminated) {
					that.shape.animate({fill:"#FFF"}, 300, "bounce");
					that.div.style.color = "white"
					that.illuminated = true
				} else {
					that.shape.animate({fill:that.color}, 300, "bounce");
					that.div.style.color = that.color
					that.illuminated = false
				}
		}
		this.shrink = function() {
				  	that.shape.animate({scale: that.shrinkSize }, 300, "swing");
					that.div.style.opacity = 0.4
		}
		this.grow = function() {
				  	that.shape.animate({scale: that.currentScale }, 300, "swing");
					that.div.style.opacity = 1
		}
		node.addEventListener('click',this.illuminate,false)
		node.addEventListener('mouseover',this.shrink,false)
		node.addEventListener('mouseout',this.grow,false)

		return this
	},  


	radiate : function(nodes) {
	  for(i in nodes) {
		if(nodes[i].innerHTML != " ") {
			nodes[i].el = new this.Node(nodes[i],this)
		}
	  }
	  return nodes
	}, 


	init : function(target) {
		if(target) {
			this.target = document.getElementById(target) }
		this.target.className += " illuminated"
		var nodes = this.cram(this.target,1,'element')
		this.nodes = this.radiate(nodes)
		this.target.className += " active"
	},   


	target : "illuminate",
    colors : ["#00B6B8","#ED5F4C","#F9A235","#2E3192"],
    textColors : ["#052D32","#3F1417","#A74E00","#000033"],
	timer : false,
	shapes : ["M10.317,0.955c-2.04,0.59-4.302,2.879-6.031,5.18 c-4.149,5.522-4.962,13.777-3.81,19.791c0.379,1.979,1.722,4.421,3.404,5.948c1.363,1.237,3.965,2.494,5.868,3.479 c2.167,1.12,6.335,1.302,8.987,0.868c2.08-0.341,5.188-1.938,6.658-3.066c2.015-1.547,3.108-3.835,3.486-6.503 c0.53-3.745,0.46-9.667-0.997-13.379c-0.503-1.279-1.294-2.54-1.92-3.846c-1.145-2.388-2.104-4.882-4.078-6.853 c-1.253-1.25-2.889-2.381-4.33-2.554c-0.738-0.088-1.78,0.142-2.662,0.206C13.404,0.333,12.093,0.297,10.317,0.955","M12.507,0.494c-2.072,1.538-3.603,2.443-5.786,3.977 C5.915,5.038,5.144,6.017,4.315,6.714c-0.54,0.455-2.333,2.202-2.775,2.579c-1.172,0.993-0.883,1.184-1.289,3.102 c-0.249,1.175-0.14,3.279-0.211,5.058c-0.077,1.896-0.037,4.077,0.046,6.223c0.051,1.323,0.143,2.755,0.34,3.801 c0.274,1.46,1.625,2.505,2.791,3.57c1.516,1.382,3.133,2.862,4.515,4.011c2.828,2.352,5.483,4.198,8.281,2.42 c0.33-0.211,0.599-0.572,0.921-0.814c0.849-0.641,1.843-1.12,2.743-1.77c2.704-1.951,5.089-3.568,7.334-6.376 c0.396-2.123,0.483-8.503,0.377-9.374c-0.222-1.782-0.211-4.042-0.39-5.733c-0.118-1.124-0.471-2.398-0.74-3.316 c-0.286-0.978-1.292-2.344-2.199-3.589c-0.78-1.069-2.357-2.308-3.211-3.079C18.835,1.611,14.872-1.127,12.507,0.494","M0.864,23.736c1.061,3.258,2.454,5.95,5.283,8.903 c0.695,0.726,1.405,1.558,2.186,2.078c1,0.668,2.4,1.27,3.629,1.784c3.672,1.539,7.162,2.271,10.935,2.419 c1.147,0.045,2.589,0.403,3.396-0.618c-0.071-6.965-0.755-14.166-0.121-21.017c0.196-2.124-0.229-4.732-0.123-7.178 c0.052-1.195,0.003-2.182-0.011-3.39c-0.019-1.524,0.449-2.951,0.503-4.443c0.026-0.704,0.125-1.413-0.509-2.095 c-2.094-0.393-4.068-0.055-6.416,0.21c-3.288,0.373-6.75,0.808-9.492,2.121C8.558,3.259,6.905,4.475,5.598,5.594 c-0.977,0.835-1.55,1.958-2.327,3.163C2.663,9.7,1.903,10.575,1.433,11.48c-0.932,1.79-1.345,4.271-1.424,6.32 C-0.065,19.704,0.347,21.701,0.864,23.736","M14.15,37.906c5.343,0.11,9.145-6.422,8.764-11.283 c-0.232-2.941-1.677-7.969-3.622-11.187c-0.277-0.458-0.651-0.848-0.985-1.319c-0.83-1.168-1.482-2.508-2.371-3.496 C13.23,7.612,9.766,3.211,6.733,0C5.777,0.283,5.312,1.225,4.862,2.03c-2,3.576-4.107,8.543-4.402,12.209 c-0.175,2.179-0.486,4.864-0.459,6.825c0.025,1.749,0.577,4.009,1.098,6.037c1.107,4.312,3.561,9.53,8.533,10.623 C11.026,38.031,12.402,38.038,14.15,37.906"]  
}       

ill.init('to_ill')