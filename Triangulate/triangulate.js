/* plugin author: chrissy clark
   Quiltify is an early experiment in combining two previous functions: shellac and veil. It creates a defaults.patchwork canvas grid system on top of targeted text elements. Each defaults.patch can recieve color and compositing parameters. 
*/

$.fn.Quiltify = function(options) {
var myInterval  
var defaults = {
   patch: this.height(),
   colorArray : ["#008CD1","#CA5752","#FFED00","#E4066F"],
   compArray : ['destination-atop','lighter','lighter','darker']
} 

var options = $.extend({}, defaults, options);

return this.each(function(targetIndex) {   
var target = this


//learn some stuff about the target element
var width = $(target).width()
var height = $(target).height()
var text = $(target).text()
var position = $(target).offset()
var size = $(target).css('font-size')
var font = $(target).css('font-family')
var color = $(target).css('color')
var weight = $(target).css('font-weight')
var intSize=parseInt(size)  
var leading = parseInt($(target).css('lineHeight')) 
var place = 0.39*intSize


  function Gridder() {

  	 //math
  	 var intheight = parseInt(size) 
  	 var dotnum = 1
  	 var dotrows = 1	
  	 var textlines = 1	
  	 var picker = 0
  	 //cycle through each line in a given block of text
  	for(linescount=1;linescount<=textlines;linescount++) {	

  		//create the matrix
  		for(index=0;index<dotrows;index++) {

  			for (i=0;i<dotnum;i++) {
  						var top = 0
  						var left = 0

  						 context.fillStyle = defaults.colorArray[picker]
  					     context.globalCompositeOperation = defaults.compArray[picker]
  						 if (picker >= (defaults.colorArray.length-1)) {
  						   picker = 0
  						 } else {
  						   picker = picker + 1
  						 }

  	 						//draw it 
  	 						colorCube(0,0)
  			}	//end vertical
  		}	//end horizontal

  	}	//end lines of text  
  }   //end gridder      


	 function Shellac(){ 

		  //split up the string into words
		  var wordArray = text.split(" ") 
		  var phraseArray = new Array()
		  var lastPhrase="";
		  var measure=0;  

		  //create a canvas on top of the target element
		  $('<canvas width="' + width*5 + '" height="' + height*5 + '" class= "quiltinate" id = "quiltinate1" ></canvas>').appendTo(target)
		  var canvas = $(target).children('canvas')[0] 
		  $(canvas).css({'top' : 0, 'left' : 0, 'position' : 'absolute'})
		  context = canvas.getContext("2d");

		  //put the target in front and make it transparent
		  $(target).css({'position' : 'relative', 'z-index' : 99, 'color' : 'rgba(0, 0, 0, 0)'})

		  //font styling
		  context.fillStyle= color
		  context.textBaseline = "middle";
		  context.font = "bold " + size + " proxima-nova-extra-condensed-1,proxima-nova-extra-condensed-2";

		  //cycle through each word, and create a phrase 
		  //array for each line of text
		  for (var i=0;i<wordArray.length;i++) {
			      var word=wordArray[i];
			      measure=context.measureText(lastPhrase+word).width;
			   if (i == 0) { 
			          lastPhrase+=(word);
			      }
			   else if (measure<width) { 
			          lastPhrase+=(" " + word);
			      }
			   else {
			          phraseArray.push(lastPhrase);
			          lastPhrase=word;
			      }
			      if (i==wordArray.length-1) {
			          phraseArray.push(lastPhrase);
			          break;
			      }  
		  }

		  //cycle through the array, and place a line of 
		  //canvas text for each line of live text
		  for(var i=0;i<phraseArray.length;i++) {
			  var paddingTop = ((i*leading) + intSize)-place
			  context.fillText(phraseArray[i], 0, paddingTop);
		  }

	} //end shellac


  function colorCube(top,left) {
  	var rotation = 0
  	var a = 0
  	var b = defaults.patch

  	function drawTriangle(x,y,length,height) {

  		context.beginPath() ;       	
  			a = Math.floor(Math.random()*defaults.patch) 
  			context.moveTo(x + left, y + top); // give the (x,y) coordinates
  			context.lineTo(length + left, height + top);
  			context.lineTo(a + left, b + top);
  			context.fillStyle = defaults.colorArray[rotation]
  			context.globalCompositeOperation = defaults.compArray[rotation]
  			context.lineTo(0 + left, 0 + top);

  			context.fill();

  	   context.closePath();


  		rotation = rotation + 1
  		if (rotation == 3) {
  			rotation = 0
  		}



  	}

  	//for (var i=0;i<2;i++) {
  		p = defaults.patch
  		drawTriangle(0,0,p,0)
  		drawTriangle(p,0,p,p) 
  		drawTriangle(p,p,0,p) 
  		drawTriangle(0,p,p,p) 
  	//} 
} //end colorcube
 

  Shellac()
  Gridder()
	
 }); //end this.each
} //end quiltify
 

function Cram(location,colornum,divname) {
				//the knoll function breaks type up into div's to be colorized.
				//it is inspired by the beautiful knoll intl. poster by wim crouwel.
				//it takes five parameters: the text string, the number of colors, 
				//either "word" or "letter", for how it breaks things down,
				//the name of all the div's to be spat out (in case you want to
				//use it twice), and the location to spit it out in.
													//defaults
												

	$(location).each(function(index) {
	
													
													var y = 1;	var x=0;
													if (divname === null) 
													{divname = "color";}
													if (colornum === null) 
													{colornum = 3;}
													if (location === null)
													{location = $(":parent")};
													var text = $(this).text();
													var length = (text.length);

	
		$(this).html("")
		
			for (x;x<=text.length;x+=1) {
				var stringslice = text.slice(x,x+1);

				if (stringslice == " ") {
					$("<span class="+divname+"space"+">"+ stringslice +"</span>").appendTo(this);
				}
				else {	
					$("<span class="+divname+y+">"+ stringslice +"</span>").appendTo(this);
				}	
				if (y < colornum) {
					y = y+1; }
				else {
					y = 1; }
			}
  

    });		


}  //end cram

function init(){
	Cram('header h1',1,'canv')
	$('header h1 span').Quiltify()
}

function go(){
  setTimeout(init,1)
}

function reInit(){
  $('header').empty
  $('header').html("<h1>" + text + "</h1>")
  init()
}



var p = 0;
majorLength = 10000

function colorCubeAnim(letter,a,b) {
  var top = 0
	var left = 0
  var defaults = {
    colorArray : ["#008CD1","#CA5752","#FFED00","#E4066F"],
    compArray : ['lighter','darker','lighter','darker']
  }

	var rotation = 0

	function drawTriangle(x,y,length,height) {
    
		context.beginPath() ;       	
			context.moveTo(x + left, y + top); // give the (x,y) coordinates
			context.lineTo(length + left, height + top);
			context.lineTo(a[rotation] + left, b + top);
			context.fillStyle = defaults.colorArray[rotation]
			context.globalCompositeOperation = defaults.compArray[rotation]
			context.lineTo(0 + left, 0 + top);
      
			context.fill();
	    context.closePath();
      
      var size = $('h1').css('font-size')
      var intSize=parseInt(size)  
      var leading = parseInt($('h1').css('lineHeight')) 
      var place = 0.39*intSize
  		var paddingTop = (intSize)-place
  		
  		context.globalCompositeOperation = 'lighter'
  		context.fillText(letter, 0, paddingTop);

		rotation = rotation + 1
		if (rotation == 3) {
			rotation = 0
		}
	


	}

	//for (var i=0;i<2;i++) {
		
		context.clearRect(0,0,500,500)
		drawTriangle(0,0,p,0)
		drawTriangle(p,0,p,p) 
		drawTriangle(p,p,0,p) 
		drawTriangle(0,p,p,p) 
		
	//} 
	
	p = p + 30
	if(p > majorLength) { 
	  clearInterval(myInterval)
	}
} //end colorcube  

$('.canv1').live('mouseenter', function() {
  var canvas = $(this).children('canvas')[0] 
  $(canvas).css({'top' : 0, 'left' : 0, 'position' : 'absolute'})
  context = canvas.getContext("2d");
  var text = $(this).text()
  p = 0 
  b = 150
  a = new Array
  for(i=0;i<3;i++) {
    a[i] = Math.floor(Math.random()*b) 
  }
  myInterval = setInterval(function() { colorCubeAnim(text,a,b); }, 20);
  majorLength = 10000
});

$('.canv1').live('mouseleave', function() {
  clearInterval(myInterval)
});



