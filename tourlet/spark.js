var spark = /^https?:\/\/(console)\.ng\.bluemix\.net\/data\/analytics(.*?)/;
if (spark.test(location.href)) {
		console.log(prefix + "Loading tour button on Working with Notebooks and Spark Instances Dashboard");
		// Let's attach a Take Tour button to the page
		var newnotebookbutton = document.getElementsByClassName("button-area");
		var b = document.createElement('div');
		b.setAttribute('id', 'startTourBtn');
		b.setAttribute('class', 'button-area');
		b.setAttribute('style', 'position:relative;display:inline-block');
		var a = document.createElement('a');
		a.setAttribute('class','button primary');
		a.setAttribute('href', '#');
		var t = document.createTextNode("Take Tour");
		a.appendChild(t);
		b.appendChild(a);
		newnotebookbutton[0].appendChild(b);
		console.log(prefix + "Tour Button injected ...");
		
		var t = document.createElement ('script');
		t.src = "https://rawgit.com/joshisa/huemix-blopscotch/master/tour/spark.js";
		document.body.appendChild (t);
	}
