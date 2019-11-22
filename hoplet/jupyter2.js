var jupyter2 = /^https?:\/\/(cdsx)\.ng\.bluemix\.net\/data\/jupyter2(.*?)/;
// Initialize tour if it's the user's first time
if (jupyter2.test(location.href)) {
	console.log(prefix + "Loading tour button on the Jupyter notebook");
	// Let's attach a Take Tour button to the page
	var navbar = document.querySelectorAll('.nav.navbar-nav');
	var b = document.createElement('li');
	b.setAttribute('id', 'startTourBtn');
	b.setAttribute('class', 'dropdown');
	
	var a = document.createElement('a');
	a.setAttribute('class','dropdown-toggle');
	a.setAttribute('style','color:blue;font-weight:bold;');
	a.setAttribute('href', '#');
	
	var t = document.createTextNode("▶ Tour");
	a.appendChild(t);
	b.appendChild(a);
	
	navbar[0].appendChild(b);
	console.log(prefix + "Tour Button injected ...");
	
	var t = document.createElement ('script');
	t.src = "https://raw.githack.com/joshisa/huemix-blopscotch/master/tour/jupyter2.js";
	document.body.appendChild (t);
}
