/* Author: 
  chrissy
*/

function knoll(colornum,kind,divname,location) {
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
													if (kind === null) 
													{kind = "letter";}
													if (colornum === null) 
													{colornum = 3;}
													if (location === null)
													{location = $(":parent")};
													var text = $(this).text();
													var length = (text.length);

		
		$(this).html("")
		if (kind == "letter") {
			
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
		}
		
		else if (kind == "word") {
		var bookmark = 0; var bookmarkend = 0; var z = 0; var p = 1;
		var wordstringslice = text.slice(0, text.indexOf(" "));
		$("<span class="+divname+p+">"+ wordstringslice +"</span>").appendTo(this);
		p = 2;
		var end = text.lastIndexOf(" ");
			for (bookmark;bookmark<end;bookmark=bookmark) {
				bookmark = text.indexOf(" ", bookmark + 1);
				bookmarkend = text.indexOf(" ", bookmark + 1);
				if (bookmarkend < bookmark) {
					bookmarkend = length
				}
				wordstringslice = text.slice(bookmark, bookmarkend);
				$("<span class="+divname+p+">"+ wordstringslice + "</span>").appendTo(this);	
					if (p < colornum) {
						p = p+1; }
					else {
						p = 1; }
			}
		}
		
		
		else {}
    

    });		


}


var shapeRef = new Array()
var colorMemory = new Array()

function Radiate(object) {

 knoll(1,'letter','element',object) 
  
  var i
  var shapes = new Array()

  shapes[0] = ""

  shapes[0] = "M10.317,0.955c-2.04,0.59-4.302,2.879-6.031,5.18 c-4.149,5.522-4.962,13.777-3.81,19.791c0.379,1.979,1.722,4.421,3.404,5.948c1.363,1.237,3.965,2.494,5.868,3.479 c2.167,1.12,6.335,1.302,8.987,0.868c2.08-0.341,5.188-1.938,6.658-3.066c2.015-1.547,3.108-3.835,3.486-6.503 c0.53-3.745,0.46-9.667-0.997-13.379c-0.503-1.279-1.294-2.54-1.92-3.846c-1.145-2.388-2.104-4.882-4.078-6.853 c-1.253-1.25-2.889-2.381-4.33-2.554c-0.738-0.088-1.78,0.142-2.662,0.206C13.404,0.333,12.093,0.297,10.317,0.955"

  shapes[1] = "M12.507,0.494c-2.072,1.538-3.603,2.443-5.786,3.977 C5.915,5.038,5.144,6.017,4.315,6.714c-0.54,0.455-2.333,2.202-2.775,2.579c-1.172,0.993-0.883,1.184-1.289,3.102 c-0.249,1.175-0.14,3.279-0.211,5.058c-0.077,1.896-0.037,4.077,0.046,6.223c0.051,1.323,0.143,2.755,0.34,3.801 c0.274,1.46,1.625,2.505,2.791,3.57c1.516,1.382,3.133,2.862,4.515,4.011c2.828,2.352,5.483,4.198,8.281,2.42 c0.33-0.211,0.599-0.572,0.921-0.814c0.849-0.641,1.843-1.12,2.743-1.77c2.704-1.951,5.089-3.568,7.334-6.376 c0.396-2.123,0.483-8.503,0.377-9.374c-0.222-1.782-0.211-4.042-0.39-5.733c-0.118-1.124-0.471-2.398-0.74-3.316 c-0.286-0.978-1.292-2.344-2.199-3.589c-0.78-1.069-2.357-2.308-3.211-3.079C18.835,1.611,14.872-1.127,12.507,0.494"

  shapes[2] = "M0.864,23.736c1.061,3.258,2.454,5.95,5.283,8.903 c0.695,0.726,1.405,1.558,2.186,2.078c1,0.668,2.4,1.27,3.629,1.784c3.672,1.539,7.162,2.271,10.935,2.419 c1.147,0.045,2.589,0.403,3.396-0.618c-0.071-6.965-0.755-14.166-0.121-21.017c0.196-2.124-0.229-4.732-0.123-7.178 c0.052-1.195,0.003-2.182-0.011-3.39c-0.019-1.524,0.449-2.951,0.503-4.443c0.026-0.704,0.125-1.413-0.509-2.095 c-2.094-0.393-4.068-0.055-6.416,0.21c-3.288,0.373-6.75,0.808-9.492,2.121C8.558,3.259,6.905,4.475,5.598,5.594 c-0.977,0.835-1.55,1.958-2.327,3.163C2.663,9.7,1.903,10.575,1.433,11.48c-0.932,1.79-1.345,4.271-1.424,6.32 C-0.065,19.704,0.347,21.701,0.864,23.736"

  shapes[3] = "M14.15,37.906c5.343,0.11,9.145-6.422,8.764-11.283 c-0.232-2.941-1.677-7.969-3.622-11.187c-0.277-0.458-0.651-0.848-0.985-1.319c-0.83-1.168-1.482-2.508-2.371-3.496 C13.23,7.612,9.766,3.211,6.733,0C5.777,0.283,5.312,1.225,4.862,2.03c-2,3.576-4.107,8.543-4.402,12.209 c-0.175,2.179-0.486,4.864-0.459,6.825c0.025,1.749,0.577,4.009,1.098,6.037c1.107,4.312,3.561,9.53,8.533,10.623 C11.026,38.031,12.402,38.038,14.15,37.906"

  var colors = new Array()
  var textColors = new Array()

  colors[0] = "#00B6B8"
  colors[1] = "#ED5F4C"
  colors[2] = "#F9A235"
  colors[3] = "#2E3192"
  
  textColors[0] = "#052D32"
  textColors[1] = "#3F1417"
  textColors[2] = "#A74E00"
  textColors[3] = "#000033"



  $('.element1').each(function(i) {
  
    divname = "element" + i
    rotate = parseInt(Math.random()*5) + 2 
    text = $(this).text()
    $(this).text('')
    $(this).attr('id', divname);
    $(this).append('<div class="letter">' + text + '</div>')
    $(this).css({'margin-right':rotate*-20})
    //alert(20*rotate)
    var paper = Raphael(this,(28*rotate)+5,40*rotate);
    $(this).css({'height':(28*rotate)+5,'width':40*rotate})
    var four = parseInt(Math.random()*4) 
    var colorpicker = parseInt(Math.random()*4)
    colorMemory[i] = colors[colorpicker]
    $(this).children('.letter').css({'color':textColors[colorpicker]})
    $()
    var shapepicker = parseInt(Math.random()*4) 
    var conservative = four + 2
    shapeRef[i] = paper.path(shapes[shapepicker]).attr({
        fill:colors[colorpicker],
        "stroke-width":"0.5",
        stroke: "transparent"
    });
    /*other = paper.path(shapes[shapepicker]).attr({
        fill:colors[shapepicker],
        "stroke-width":"0.5",
        stroke: "transparent"
    });
    other.translate(50*four,50*four)
    other.scale(0.5*four,0.5*four)
    
    other2 = paper.path(shapes[shapepicker]).attr({
        fill:colors[rotate],
        "stroke-width":"0.5",
        stroke: "transparent"
    });
    other2.translate(10*four*-1,10*four*-1)
    other2.scale(1*four,1*four)*/
    //path1.rotate(60*rotate)
    shapeRef[i].scale(rotate,rotate,0,0);
    //path1.translate(((rotate*28)/2)-12,(rotate*17)-12);
    //alert(conservative)
    //path1.attr('opacity',0.8);
    $("#" + divname).children('.letter').css({
      'font-size':25*rotate
    })
    //$("#" + divname).css({
      //'-moz-transform':'rotate('+rotate*60+'deg)',
      //'-webkit-transform':'rotate('+rotate*60+'deg)',
      //'transform':'rotate('+rotate*60+'deg)'
    //})
  
    
  });
  //end radiate
}

Radiate('#main')



var guy = 9999
var prevguy
var first = 0
z=99
function illuminate(color,indx) {
  for(i=0;i<5;i++) {
    shapeRef[guy+i].animate({fill:"#FFF"}, 300, "bounce");
  }
  for(i=0;i<5;i++) {
    shapeRef[guy-i].animate({fill:"#FFF"}, 300, "bounce");
  }
  z = z + 1
  prevguy = guy
}

function deluminate(color,indx) {
  for(i=0;i<5;i++) {
    shapeRef[prevguy+i].animate({fill:colorMemory[guy+i]}, 300, "bounce");
  }
  for(i=0;i<5;i++) {
    shapeRef[prevguy-i].animate({fill:colorMemory[guy+i]}, 300, "bounce");
  }
  z = z + 1
  prevguy = guy
}

$('.element1').mouseenter(function() {
  guy = $(this).index('.element1')
  //illuminate(0.8,guy)
  currentScale = shapeRef[guy].attr('scale').x
  shapeRef[guy].animate({scale:currentScale - 0.3}, 200, "swing");
  currentFontSize = parseInt($(this).children('.letter').css('fontSize'))
  newFontSize = currentFontSize*0.9
  $(this).children('.letter').animate({fontSize:newFontSize},200,'swing',function(){})
});
$('.element1').mouseleave(function() {
  guy = $(this).index('.element1')
  //illuminate(0.6,guy)
  shapeRef[guy].animate({scale:currentScale}, 200, "swing");
  currentFontSize = parseInt($(this).children('.letter').css('fontSize'))
  newFontSize = currentFontSize*1.1
  $(this).children('.letter').animate({fontSize:newFontSize},200,'swing',function(){})
});
$('.element1').click(function() {
  if (first == 1) {
  deluminate(0,prevguy)
  }
  guy = $(this).index('.element1')
  illuminate(1,guy)
  first = 1
});

function go(){}






