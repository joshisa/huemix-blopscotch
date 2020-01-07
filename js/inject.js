var s = document.createElement('script');
s.src = "https://raw.githack.com/joshisa/huemix-blopscotch/master/js/hopscotch.js";
//s.onload = function() {
//    this.parentNode.removeChild(this);
//};

(document.head || document.documentElement).appendChild(s);
            
function ping() {

  chrome.storage.sync.get(['autoPlayEnabled','playBackDelay','categories'], function(items) {
    autoPlayEnabledValue = items.autoPlayEnabled || "false";
    playBackDelayValue = items.playBackDelay || "8";
    categoryValues = items.categories || JSON.stringify(['default']);
    //Trying to create this hidden div to share extension options with tour script
    //<div id="hopscotchOptions" data-autoplayenabled="true" data-playbackdelay="8"></div>
    var h = document.createElement('div');
    h.id = 'hopscotchOptions';
    h.setAttribute("data-autoplayenabled", autoPlayEnabledValue);
    h.setAttribute("data-playbackdelay", playBackDelayValue);
    h.setAttribute("data-categories", categoryValues);
    document.body.appendChild(h);
    console.log("Is autoplay enabled? " + autoPlayEnabledValue);
    console.log("Global Playback Cadence: " + playBackDelayValue);
    JSON.parse(categoryValues).forEach(element => console.log("Hoplet Category: " + element + " is enabled."));
  });

  chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (var key in changes) {
      var storageChange = changes[key];
      var changePatrol = document.getElementById("hopscotchOptions");
      if (key === "autoPlayEnabled") {
        changePatrol.setAttribute("data-autoplayenabled", storageChange.newValue);
      } else if (key === "playBackDelay") {
        changePatrol.setAttribute("data-playbackdelay", storageChange.newValue);
      }
      console.info('Hopscotch for CloudPaks Option "%s" has now been set to "%s"', key, storageChange.newValue);
      /*
      console.log('Storage key "%s" in namespace "%s" changed. ' +
                  'Old value was "%s", new value is "%s".',
                  key,
                  namespace,
                  storageChange.oldValue,
                  storageChange.newValue);
      */
    }
  });

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
            /*
            whitelist = ["hoplet/demo.js",
                        "hoplet/cp4mcm.js"];
            */
           // Trying to make whitelist enumeration dynamic (rather than static list) to accomodate anticipated hoplet growth
            proxyXHR.get('https://api.github.com/repos/joshisa/huemix-blopscotch/git/trees/master?recursive=1&client_id=b32b5b5d345ded1f5136&client_secret=84a11f4d715f6a185fda52c3826570346b549a87').onSuccess(function (data) {
                    var pdata = JSON.parse(data);
                    var whitelist = [];
                    for (i in pdata.tree) {
                      if (pdata.tree[i].path.indexOf("hoplet/") != -1) {
                        whitelist.push(pdata.tree[i].path.toString());
                      }
                    }
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
            });
            console.log(prefix + "Hopscotch Dependencies successfully injected");
          }
        }, 10);
      }
  });
}

ping();
