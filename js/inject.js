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

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------
    // <link href="../dist/css/hopscotch.min.css" rel="stylesheet"></link>

    // csslink = document.createElement('link');
    // csslink.setAttribute('rel', 'stylesheet');
    // csslink.setAttribute('href', 'https://ibm.box.com/shared/static/n54a4o935nqr4xck9ag7m51p3e4a81f0.css');
    // document.body.appendChild(csslink);

    // location = window.location;
    // alert(location.protocol + '//'+location.host+location.pathname);

    // In the content script:
    var prefix = "[Huemix Blopscotch]] ";
    // https://console.ng.bluemix.net/data/analytics
    var spark = /^https?:\/\/(console)\.ng\.bluemix\.net\/data\/analytics(.*?)/;
    var demo = /^file?:\/\/\/(.*?)hopscotch(.*?)/;
    console.log(prefix + "current page URL is: " + location.href);

    if (demo.test(location.href)) {
      console.log(prefix + "Loading demo.js tour");
      var t = document.createElement ('script');
      t.src = "https://rawgit.com/joshisa/huemix-blopscotch/master/js/demo.js";
      document.body.appendChild (t);
    }

    // <div id="main-infobar" class="infoBar" xmlns:xlink="http://www.w3.org/1999/xlink">
    // <div class="button-area" style="position:absolute;float:right;top:7%;right:10%;">
    // <a class="button primary" href="/data/new-notebook" da="">Take Tour</a>
    // </div>
    if (spark.test(location.href)) {
      console.log(prefix + "Loading tour button on Working with Notebooks and Spark Instances Dashboard");
      var notebookspage = document.getElementsByClassName("button-area");
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
      notebookspage[0].appendChild(b);
      console.log(prefix + "Tour Button rendered ...");

      console.log(prefix + "Loading spark.js tour");
      var t = document.createElement ('script');
      t.src = "https://rawgit.com/joshisa/huemix-blopscotch/master/js/spark.js";
      document.body.appendChild (t);
    }

    console.log(prefix + "Hopscotch Dependencies successfully injected");
	}
	}, 10);
});
