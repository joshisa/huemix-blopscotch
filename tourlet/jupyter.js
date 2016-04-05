var jupyter = /^https?:\/\/(console)\.ng\.bluemix\.net\/data\/notebooks(.*?)/;
// Initialize tour if it's the user's first time
if (jupyter.test(location.href)) {
	console.log(prefix + "Loading tour button on the Jupyter notebook");
	// Let's attach a Take Tour button to the page
	var palette = document.getElementsByClassName("paletteCardHeader");
	var b = document.createElement('span');
	b.setAttribute('id', 'startTourBtn');
	b.setAttribute('class', 'paletteTextBold');
	
	var a = document.createElement('a');
	a.setAttribute('class','button primary');
	a.setAttribute('style','width:100%;');
	a.setAttribute('href', '#');
	
	var t = document.createTextNode("▶ Tour");
	a.appendChild(t);
	b.appendChild(a);
	palette[0].appendChild(b);
	console.log(prefix + "Tour Button injected ...");
	
	var t = document.createElement ('script');
	t.src = "https://rawgit.com/joshisa/huemix-blopscotch/master/tour/jupyter.js";
	document.body.appendChild (t);
}
