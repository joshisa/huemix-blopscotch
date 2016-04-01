var s = document.createElement('script');
s.src = "https://rawgit.com/joshisa/huemix-blopscotch/master/js/hopscotch.min.js";
s.onload = function() {
    this.parentNode.removeChild(this);
};
(document.head || document.documentElement).appendChild(s);

chrome.extension.sendMessage({}, function(response) {
    	var readyStateCheckInterval = setInterval(function() {
	    	if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);
			var prefix = "[Huemix Blopscotch]] ";
			var spark = /^https?:\/\/(console)\.ng\.bluemix\.net\/data\/analytics(.*?)/;
			var demo = /^file?:\/\/\/(.*?)hopscotch(.*?)/;
			console.log(prefix + "current page URL is: " + location.href);
			
			if (demo.test(location.href)) {
				console.log(prefix + "Loading demo.js tour");
				var t = document.createElement ('script');
				t.src = "https://rawgit.com/joshisa/huemix-blopscotch/master/js/demo.js";
				document.body.appendChild (t);
			}
			
			if (spark.test(location.href)) {
				console.log(prefix + "Loading tour button on Working with Notebooks and Spark Instances Dashboard");
				// Let's attach a Take Tour button to the page
				var newnotebookbutton = document.getElementsByClassName("button-area");
				var b = document.createElement('div');
				b.setAttribute('id', 'startTourBtn');
				b.setAttribute('class', 'button-area');
				b.setAttribute('style', 'position:relative;float:right;');
				var a = document.createElement('a');
				a.setAttribute('class','button primary');
				a.setAttribute('href', '#');
				var t = document.createTextNode("Take Tour");
				a.appendChild(t);
				b.appendChild(a);
				newnotebookbutton[0].appendChild(b);
				console.log(prefix + "Tour Button injected ...");
				
				// Let's load the tour for this spark experience
				console.log(prefix + "Loading spark.js tour");
				var t = document.createElement ('script');
				t.src = "https://rawgit.com/joshisa/huemix-blopscotch/master/js/spark.js";
				document.body.appendChild (t);
			}
			
			console.log(prefix + "Hopscotch Dependencies successfully injected");
	    	}
    	}, 10);
});
