//		Author: Chrissy Clark(fivefourths@gmail.com)
//		webtypographyforthelonely.com
//
//		Cram is a very little function for breaking text into spans.
//		It was one of my first experiments for webtypographyforthelonely,
//		and as the project has grown, it has become quite the old standby.
//		It is tiny and integrates into projects very neatly and tidily.		
//
//		You can call it using: 
//                                     cram(htmlObject,5,'nameofthediv')
//
//		Where '5' is the number of divs you want.Cram will add a number
//		to the end of each div so that you can style them easily.



var cram = function(location,colornum,divname) {

		var y = 1;	var x=0;
		divname = (!divname) ? "color" : divname
		colornum = (!colornum) ? 3 : colornum 
		location = (!location) ? document.body : location
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

}

target = document.getElementById('intro')
cram(target,5,'color')