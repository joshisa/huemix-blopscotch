var s = document.createElement('script');
s.src = "https://raw.githack.com/joshisa/huemix-blopscotch/master/js/hopscotch.highlight.js";
//s.onload = function() {
//    this.parentNode.removeChild(this);
//};

(document.head || document.documentElement).appendChild(s);
            
function ping() {
  chrome.extension.sendMessage({}, function(response) {
      if (chrome.runtime.lastError) {
        //console.log("foo::" + chrome.runtime.lastError.message);
        var readyStateCheckInterval = setInterval(function() {
          if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);
            var prefix = "[Huemix Blopscotch on githack]] ";
            console.log(prefix + "current page URL is: " + location.href);
            // https://api.github.com/repos/joshisa/huemix-blopscotch/git/trees/master?recursive=1
            // Array of registered hoplets
            whitelist = ["hoplet/demo.js",
                        "hoplet/cp4mcm.js"];
            console.log(prefix + "Number of Hoplets defined : " + whitelist.length);
            var i = 0;
            while (whitelist[i]) {
                // https://raw.githack.com/joshisa/huemix-blopscotch/master/ + whitelist[i]
                console.log(prefix + "Loading " + whitelist[i]);
                proxyXHR.get('https://raw.githack.com/joshisa/huemix-blopscotch/master/' + whitelist[i]).onSuccess(function (data) {
                    eval(data);
                });
                i++;
            }
            console.log(prefix + "Hopscotch Dependencies successfully injected");
          }
        }, 10);
      }
  });
}

ping();
