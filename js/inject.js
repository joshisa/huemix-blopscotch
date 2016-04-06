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
          proxyXHR.get('https://api.github.com/repos/joshisa/huemix-blopscotch/git/trees/master?recursive=1&access_token=953978ba1aa45cd3c1834785794c39c7e738f6da').onSuccess(function (data) {
              var arr = JSON.parse(data);
              var tourlets = arr.tree.filter(function (el) {
                  if ('path' in el && typeof(el.path) === 'string' && el.path.indexOf("tourlet/") == 0) {
                     return true;
                  }
              });
              console.log(prefix + "Number of Tourlets discovered : " + tourlets.length);
              var i = 0;
              while (tourlets[i]) {
                  // https://rawgit.com/joshisa/huemix-blopscotch/master/ + tourlets.path
                  console.log(prefix + "Loading " + tourlets[i].path);
                  proxyXHR.get('https://rawgit.com/joshisa/huemix-blopscotch/master/' + tourlets[i].path).onSuccess(function (data) {
                        eval(data);
                  }).onFailure(function (status) {
                       alert("HTTP Error " + status + " while retrieving data for the Huemix Blopscotch Tour Chrome Plugin");
                  });
                  i++;
              }
              // Let's only load this stuff once for a given dom
          }).onFailure(function (status) {
            alert("HTTP Error " + status + " while retrieving data for the Huemix Blopscotch Tour Chrome Plugin");
          });

          console.log(prefix + "Hopscotch Dependencies successfully injected");
      }
    }, 10);
});
