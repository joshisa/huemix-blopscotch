var jupyter = /^https?:\/\/(console)\.ng\.bluemix\.net\/data\/notebooks(.*?)/;
// Initialize tour if it's the user's first time
if (jupyter.test(location.href)) {
	console.log(prefix + "Loading tour button on the Jupyter notebook");
	// Let's attach a Take Tour button to the page
	var paletteHeader = document.getElementsByClassName("paletteCardHeader");
	var paletteBackButton = document.getElementsByClassName("paletteBackButtonWrapper");
	var b = document.createElement('div');
	b.setAttribute('id', 'startTourBtn');
	b.setAttribute('style', 'position:relative;left:-20%;');
	
	var a = document.createElement('a');
	a.setAttribute('class','paletteColumnButton');
	a.setAttribute('style','text-decoration:none;color:orange;font-weight:bold;');
	a.setAttribute('href', '#');
	
	var t = document.createTextNode("▶ Tour");
	a.appendChild(t);
	b.appendChild(a);
	
	paletteHeader[0].insertBefore(b, paletteBackButton);
	console.log(prefix + "Tour Button injected ...");
	
	var t = document.createElement ('script');
	t.src = "https://rawgit.com/joshisa/huemix-blopscotch/master/tour/jupyter.js";
	document.body.appendChild (t);
}
