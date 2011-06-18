/* Author: 
chrissy
*/

function cluster(newText) {
  /*cluster nests some functions.
  1. it uses shallac to generate the canvas
  2. it uses getTypeData to return the canvas pixel data
  3. it then uses this stuff to create the svg content*/

  function getTypeData(object) {
  
    width = object.width()
    height = object.height()
    
    function Shellac(object, canvasID){ 

    		  //split up the string into words
    		  var text = $(object).text()
    		  

    		  var wordArray = text.split(" ") 
    		  var phraseArray = new Array()
    		  var lastPhrase="";
    		  var measure=0;
    		  var font = $(object).css('font-family');
    		  var weight = $(object).css('font-weight');
    		  var size = $(object).css('font-size');
    		  var style = $(object).css('font-style');
    		  var color= $(object).css('color')  
    		  var leading = parseInt($(object).css('lineHeight')) 
    		  var intSize=parseInt(size) 
    		  var place = 0.39*intSize
    		  //create a canvas on top of the target element
    		  $('<canvas width="' + width + '" height="' + height + '" class= "shellac" id = "' + canvasID + '" ></canvas>').appendTo(object)
    		  var canvas = $(object).children('canvas')[0] 
    		  $(canvas).css({'top' : 0, 'left' : 0, 'position' : 'absolute'})
    		  context = canvas.getContext("2d");
    		  context.translate(canvas.width/2,0)

    		  //font styling
    		  context.fillStyle= color
    		  context.textBaseline = "middle";
    		  context.textAlign = "center"
    		  context.font = weight + " " + style + " " + size + " " + font

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
  	
    Shellac(object,'cluster_canvas')
  
    //get stuff
  
    var canvas = document.getElementById('cluster_canvas');
    var ctx = canvas.getContext('2d');
    totalPixels = width*height

    imageData = ctx.getImageData(0,0,width,height);
    $(canvas).remove()
    return imageData
  
  };

  imageData = getTypeData($('#cluster'))

  var nodes = new Array()
  dest = document.getElementById('destination')
  var paper = Raphael(dest,$(dest).width(),$(dest).height());
  paper.clear();
  var shapes = new Array()

    shapes[0] = paper.path("M10.317,0.955c-2.04,0.59-4.302,2.879-6.031,5.18 c-4.149,5.522-4.962,13.777-3.81,19.791c0.379,1.979,1.722,4.421,3.404,5.948c1.363,1.237,3.965,2.494,5.868,3.479 c2.167,1.12,6.335,1.302,8.987,0.868c2.08-0.341,5.188-1.938,6.658-3.066c2.015-1.547,3.108-3.835,3.486-6.503 c0.53-3.745,0.46-9.667-0.997-13.379c-0.503-1.279-1.294-2.54-1.92-3.846c-1.145-2.388-2.104-4.882-4.078-6.853 c-1.253-1.25-2.889-2.381-4.33-2.554c-0.738-0.088-1.78,0.142-2.662,0.206C13.404,0.333,12.093,0.297,10.317,0.955")
    shapes[0].attr('stroke',"none");
    
    shapes[1] = paper.path("M12.507,0.494c-2.072,1.538-3.603,2.443-5.786,3.977 C5.915,5.038,5.144,6.017,4.315,6.714c-0.54,0.455-2.333,2.202-2.775,2.579c-1.172,0.993-0.883,1.184-1.289,3.102 c-0.249,1.175-0.14,3.279-0.211,5.058c-0.077,1.896-0.037,4.077,0.046,6.223c0.051,1.323,0.143,2.755,0.34,3.801 c0.274,1.46,1.625,2.505,2.791,3.57c1.516,1.382,3.133,2.862,4.515,4.011c2.828,2.352,5.483,4.198,8.281,2.42 c0.33-0.211,0.599-0.572,0.921-0.814c0.849-0.641,1.843-1.12,2.743-1.77c2.704-1.951,5.089-3.568,7.334-6.376 c0.396-2.123,0.483-8.503,0.377-9.374c-0.222-1.782-0.211-4.042-0.39-5.733c-0.118-1.124-0.471-2.398-0.74-3.316 c-0.286-0.978-1.292-2.344-2.199-3.589c-0.78-1.069-2.357-2.308-3.211-3.079C18.835,1.611,14.872-1.127,12.507,0.494")
    shapes[1].attr('stroke',"none");

    shapes[2] = paper.path("M0.864,23.736c1.061,3.258,2.454,5.95,5.283,8.903 c0.695,0.726,1.405,1.558,2.186,2.078c1,0.668,2.4,1.27,3.629,1.784c3.672,1.539,7.162,2.271,10.935,2.419 c1.147,0.045,2.589,0.403,3.396-0.618c-0.071-6.965-0.755-14.166-0.121-21.017c0.196-2.124-0.229-4.732-0.123-7.178 c0.052-1.195,0.003-2.182-0.011-3.39c-0.019-1.524,0.449-2.951,0.503-4.443c0.026-0.704,0.125-1.413-0.509-2.095 c-2.094-0.393-4.068-0.055-6.416,0.21c-3.288,0.373-6.75,0.808-9.492,2.121C8.558,3.259,6.905,4.475,5.598,5.594 c-0.977,0.835-1.55,1.958-2.327,3.163C2.663,9.7,1.903,10.575,1.433,11.48c-0.932,1.79-1.345,4.271-1.424,6.32 C-0.065,19.704,0.347,21.701,0.864,23.736")
    shapes[2].attr('stroke',"none");

    shapes[3] = paper.path("M14.15,37.906c5.343,0.11,9.145-6.422,8.764-11.283 c-0.232-2.941-1.677-7.969-3.622-11.187c-0.277-0.458-0.651-0.848-0.985-1.319c-0.83-1.168-1.482-2.508-2.371-3.496 C13.23,7.612,9.766,3.211,6.733,0C5.777,0.283,5.312,1.225,4.862,2.03c-2,3.576-4.107,8.543-4.402,12.209 c-0.175,2.179-0.486,4.864-0.459,6.825c0.025,1.749,0.577,4.009,1.098,6.037c1.107,4.312,3.561,9.53,8.533,10.623 C11.026,38.031,12.402,38.038,14.15,37.906")
    shapes[3].attr('stroke',"none");

    var colors = new Array()

    colors[0] = "#FF9933"
    colors[1] = "#00ABC5"
    colors[2] = "#E10079"
    colors[3] = "#466473"
    
    var isEven = function(someNumber){
        return (someNumber%2 == 0) ? true : false;
    };

  for(var h=0;h<height;h++){
    for(var w=0;w<width;w++){   
       var pixel = imageData.data[((w+(h*width))*4)-1];
          if(pixel > 0) {
            var colorpicker = parseInt(Math.random()*4)
            var shapepicker = parseInt(Math.random()*4)
          
            nodes[w*h] = shapes[shapepicker].clone();
            randos = Math.random()*2 + 0.5
            nodes[w*h].scale(0.25*randos,0.25*randos) 
            nodes[w*h].attr('opacity',pixel/70);
            nodes[w*h].attr('fill',colors[colorpicker]);
            nodes[w*h].translate(w*10,h*10) 
            nodes[w*h].mouseover(function (event) {
                this.animate({translation:"0,-1000"}, 10000, "bounce");
            });
          };
    };
  };


}

function reInit(text) {
  $('#cluster').text(text)
  $('#destination svg').remove()
  cluster()
}

function go(){
  $(document).ready(function(){
    window.setTimeout(cluster,5)
  });
}






