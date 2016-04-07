var s = document.createElement('script');
s.src = "https://rawgit.com/joshisa/huemix-blopscotch/master/js/hopscotch.highlight.js";
s.onload = function() {
    this.parentNode.removeChild(this);
};
(document.head || document.documentElement).appendChild(s);

chrome.extension.sendMessage({}, function(response) {
    var readyStateCheckInterval = setInterval(function() {
      if (document.readyState === "complete") {
        clearInterval(readyStateCheckInterval);
        var prefix = "[Huemix Blopscotch]] ";
        console.log(prefix + "current page URL is: " + location.href);
        // https://api.github.com/repos/joshisa/huemix-blopscotch/git/trees/master?recursive=1
        // Array of registered hoplets
        whitelist = ["hoplet/demo.js", 
                    "hoplet/jstart.js",
                    "hoplet/jupyter.js",
                    "hoplet/jupyter2.js",
                    "hoplet/spark.js"];
                    
        console.log(prefix + "Number of Hoplets defined : " + whitelist.length);
        var i = 0;
        while (whitelist[i]) {
            // https://rawgit.com/joshisa/huemix-blopscotch/master/ + whitelist[i]
            console.log(prefix + "Loading " + whitelist[i]);
            proxyXHR.get('https://rawgit.com/joshisa/huemix-blopscotch/master/' + whitelist[i]).onSuccess(function (data) {
                eval(data);
            }).onFailure(function (status) {
               console.log("HTTP Error " + status + " while retrieving data for the Huemix Blopscotch Tour Chrome Plugin");
            });
            i++;
        }
        console.log(prefix + "Hopscotch Dependencies successfully injected");
      }
    }, 10);
});
