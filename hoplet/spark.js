var spark = /^https?:\/\/(console)\.ng\.bluemix\.net\/data\/analytics(.*?)/;
// Initialize tour if it's the user's first time
if (spark.test(location.href)) {
	console.log(prefix + "Loading tour button on Working with Notebooks and Spark Instances Dashboard");
	// Let's attach a Take Tour button to the page
	var newnotebookbutton = document.getElementsByClassName("button-area");
	var b = document.createElement('div');
	b.setAttribute('id', 'startTourBtn');
	b.setAttribute('style', 'position:relative;display:inline-block;float:right;');
	var a = document.createElement('a');
	a.setAttribute('class','button primary');
	a.setAttribute('style','width:100%;');
	a.setAttribute('href', '#');
	var t = document.createTextNode("▶ Tour");
	a.appendChild(t);
	b.appendChild(a);
	newnotebookbutton[0].appendChild(b);
	console.log(prefix + "Tour Button injected ...");
	
	var t = document.createElement ('script');
	t.src = "https://raw.githack.com/joshisa/huemix-blopscotch/master/tour/spark.js";
	document.body.appendChild (t);
}
