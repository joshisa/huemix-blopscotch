var jstart = /^https?:\/\/(.*?)\.ibm\.com\/(.*?)\/ebusiness\/jstart\/(.*?)/;
if (jstart.test(location.href)) {
		console.log(prefix + "Loading tour button on IBM jStart Page");
		// Let's attach a Take Tour button to the page
		var mainsection = document.getElementById("ibm-content-nav");
		var b = document.createElement('a');
		b.setAttribute('id', 'startTourBtn');
		b.setAttribute('class', 'ibm-btn-pri');
		b.setAttribute('style', 'position:inherit;float:left;');
		b.setAttribute('href', '#');
		var t = document.createTextNode("▶ Tour");
		b.appendChild(t);
		mainsection.appendChild(b);
		console.log(prefix + "Tour Button injected ...");
		
		// Load the jstart website tour
		var t = document.createElement ('script');
		t.src = "https://cdn.jsdelivr.net/gh/joshisa/huemix-blopscotch/tour/jstart.js";
		document.body.appendChild (t);
}
