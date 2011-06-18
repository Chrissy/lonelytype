/* Author: 

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
			
			for (x;x<text.length;x+=1) {
				var stringslice = text.slice(x,x+1);

				if (stringslice == " ") {
					//$("<span class="+divname+"space"+">"+ stringslice +"</span>").appendTo(this);
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


function blend(object,fixed) {
  
  /*blend takes an object with a single letter in it, and 
  breaks it down into four clones, which are given their
  own clone classes. it returns these as an array of objects.
  it has default styles, which you can override*/
  
      //***BEGIN FUNCTIONS***//

      function getTextCoordinates(object,node,fixed) {

        //gets text coordinates and passes them on to getStyle, 
        //then returns style object

      	var posCouple = new Array()
      	var position = $(object).position()
	
      	posCouple[0] = position.left
      	posCouple[1] = position.top
	
      	var style = getStyle(object,posCouple,node,fixed)
	
      	return style;
	 
      }

      function getStyle(object,position,node,fixed) {

        /*gets information about each letter, takes a param called 'node'
          which determines the elements position in the grid -->
           --------
          | 0 | 1 |
          | 2 | 3 |
          --------
        */
        
        /*this is sort of a funny situation: blend passes a series of 
        imaginary html objects, so you cannot get the optical width of them.
        but the elements are all clones of the first, so to get things
        started, we need to translate our optical width into css width*/
        
        if(node == null) {
          opticalWidth = $(object).width()
          $(object).css({'width':opticalWidth})
        }
        
        //OK now let's go!
  
        //get stuff make stuff
      	var width = $(object).css('width')
      	var height = parseInt($(object).css('font-size'));

	
      	//create style object
      	var style = {
      		'width':width,
      		'height':height/2,
      		'left':position[0],
      		'top':position[1],
      		'text-indent':0,
      	}
	
      	//override defaults with a dash of logic
      	if(node == 1) {
        		style.left = position[0] + width
        		style.textIndent = (width)*-1
      	} else if(node == 2) {
        		style.top = position[1] + height/2
      	} else if(node == 3) {
      			style.left = position[0] + width
      			style.top = position[1] + height/2
      			style.textIndent = (width)*-1 
      	} else {
      		  style.width = width/2
      	}

      	//normalize cube size via padding if fixed param is used
      	if(fixed != null) {
      		style.left = 0;
      		style.top = 0;
      	}

      	return style;	
	
      }

      //apply the styles

      function applyStyle(object,node,fixed) {
	
      	style = getTextCoordinates(object,node,fixed);
      	$(object).css(style);
	
      }
    
    
  //****CORE****// 
  applyStyle(object)
  $(object).addClass('node')
	
	//clone array keeps track of clone elements 
	var clones = new Array()
	
  /*for each instance, duplicate it and reset styles for nodes 1-3*/
		for(var i = 0;i<=3;i++) {
  		clones[i] = $(object).clone();
  		clones[i].addClass('clone' + i);
  		applyStyle(clones[i],i,fixed);
  		$(clones[i]).addClass('node')
		}
		return clones;
	  
}

function createTypeCarriages(object) {
  var width = $(window).width();
  var num = $(object).children().length;
  blockNum = Math.ceil(width/178);
  carraigeNum = Math.ceil(num/blockNum) 
  for(var i=1;i<=carraigeNum;i++) {
    $(object).append('<div class="upper-carriage carriage" />')
    $(object).append('<div class="lower-carriage carriage" />')
  }
  
  return blockNum;
}

function setTypeInCarriages(object) {
  
  var num = createTypeCarriages(object)
  var stupidArray = [".upper-carriage",".lower-carriage"];
  
  $(object).children('span').each(function(i){
      var clones = blend(this,200)
      var carriagenum = Math.floor(i/num)
      if($(this).hasClass('letterspace') == true) {
        var extra = "space-wrapper"
      } else {
        var extra = "letter-wrapper"
      }
      for (var i=1;i<=4;i++) {
        spot = $(stupidArray[(Math.ceil(i/2))-1]).eq(carriagenum)
        spot.append(clones[i-1]);
        $(clones[i-1]).wrap('<div class="letter_wrapper ' + extra + i + '" />');
        
        var copy2 = $(clones[i-1]).clone();
        copy2.addClass('copy2')
        $(clones[i-1]).parents('.letter_wrapper').append(copy2)
        
        var copy3 = $(clones[i-1]).clone();
        copy3.addClass('copy3')
        $(clones[i-1]).parents('.letter_wrapper').append(copy3)
        
        var copy4 = $(clones[i-1]).clone();
        copy4.addClass('copy4')
        $(clones[i-1]).parents('.letter_wrapper').append(copy4)
        
        var copy5 = $(clones[i-1]).clone();
        copy3.addClass('copy5')
        $(clones[i-1]).parents('.letter_wrapper').append(copy5)
      }
      $(this).detach()
  });
}

var z = 999

function init(){
  //apply knoll to all letters, which splits them up into spans
	var object = $('#mosaic')
	knoll(1,'letter','letter',object);
	setTypeInCarriages(object);
}

function reInit(){
	var object = $('#mosaic')
  $(object).empty();
  $(object).text(text)
  init()
}

function go(){}

$(document).ready(function(){
  init()
	$('.letter_wrapper').mousedown(function(ev){
	   var helper = this.cloneNode(true)
	   helper.className += " helper";
	   var vacancy = $(this)
	   document.body.appendChild(helper)
	   var nodeWidth = $(this).width()
	   var nodeHeight = $(this).height()

     function moveHelper(eventX,eventY){
			  //move the helper to the right place
			  helper.style.left = eventX - nodeWidth/2 + "px"
			  helper.style.top = eventY - nodeHeight/2 + "px";
			  return false
     }
      //initially trigger move to event position
		  moveHelper(ev.clientX,ev.clientY)
		  
		  $(document).mousemove(function(e){
        moveHelper(e.clientX,e.clientY)
		  });
		  
		  $(document).bind('mouseup',function(eve){
			dropX = eve.pageX
			dropY = eve.pageY  	
		  var obj
			
			 	//find the block that's being hovered over
			  	$('.letter_wrapper').not(helper).each(function(){
  					letterPos = $(this).offset()
  					if(dropX > letterPos.left && dropX < letterPos.left + nodeWidth && dropY > letterPos.top && dropY < letterPos.top + nodeHeight) {
  					obj = this
  					return false;  
  					}
		   		});  
		
		  //store colors and contents
          var color = $(helper).css('backgroundColor');
          var color2 = $(obj).css('backgroundColor');
          var contents = $(obj).contents()
          
          //empty 'em
		  $(obj).empty();
          $(vacancy).empty();

		  //fill 'em
          $(vacancy).append(contents)
          $(obj).append($(helper).contents());

		  //swap colors
  		  $(obj).css({'backgroundColor':color});
  		  $(vacancy).css({'backgroundColor':color2});

		  //animate & kill helper
		      $(helper).remove()
		
		
          //clean up
		  $(document).unbind('mouseup');
		  $(document).unbind('mousemove');
		  document.removeEventListener("touchmove");
		  document.removeEventListener("touchend");
		});
		//add touch listeners for mousemove and mouseup
		document.addEventListener("touchend", touchHandler, true);
		document.addEventListener("touchmove", touchHandler, true); 
		return false;
	});
	//add touch listener for click
    document.addEventListener("touchstart", touchHandler, true);	
	
	function touchHandler(event) {
	    var touches = event.changedTouches,
	        first = touches[0],
	        type = "";
	         switch(event.type)
	    {
	        case "touchstart": type = "mousedown"; break;
	        case "touchmove":  type="mousemove"; break;        
	        case "touchend":   type="mouseup"; break;
	        default: return;
	    }

	             //initMouseEvent(type, canBubble, cancelable, view, clickCount, 
	    //           screenX, screenY, clientX, clientY, ctrlKey, 
	    //           altKey, shiftKey, metaKey, button, relatedTarget);

	    var simulatedEvent = document.createEvent("MouseEvent");
	    simulatedEvent.initMouseEvent(type, true, true, window, 1, 
	                              first.screenX, first.screenY, 
	                              first.clientX, first.clientY, false, 
	                              false, false, false, 0/*left*/, null);

	    first.target.dispatchEvent(simulatedEvent);
	    event.preventDefault();
	}  

});















