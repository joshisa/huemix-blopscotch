var s = document.createElement('script');
s.src = "https://raw.githack.com/joshisa/huemix-blopscotch/master/js/hopscotch.js";

(document.head || document.documentElement).appendChild(s);
            

window.browser = (function () {
  return window.msBrowser ||
    window.browser ||
    window.chrome;
})();

function ping() {

  browser.storage.local.get(['autoPlayEnabled','playBackDelay','categories'], function(items) {
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
    browser.runtime.sendMessage({}, function(response) {
        if (browser.runtime.lastError) {
          //console.log("foo::" + browser.runtime.lastError.message);
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
              // Making whitelist enumeration dynamic (user customizable rather than static list) to accomodate anticipated hoplet growth
              // Don't care about exposure of OAuth client app creds in repo.  This is to allow a greater API rate call per hour (60 --> 5000).
              proxyXHR.get('https://api.github.com/repos/joshisa/huemix-blopscotch/git/trees/master?recursive=1&client_id=b32b5b5d345ded1f5136&client_secret=84a11f4d715f6a185fda52c3826570346b549a87').onSuccess(function (data) {
                      var pdata = JSON.parse(data);
                      var whitelist = [];
                      for (i in pdata.tree) {
                        // Want to narrow into hoplet folder and limit our choices to files (aka blob types) only
                        if ((pdata.tree[i].path.indexOf("hoplet/") != -1) && (pdata.tree[i].type.indexOf("blob") != -1)) {
                          //reference:  https://stackoverflow.com/questions/5582574/how-to-check-if-a-string-contains-text-from-an-array-of-substrings-in-javascript#answer-46337280
                          //substringsArray.some(substring=>yourBigString.includes(substring))
                          if (JSON.parse(categoryValues).some((substring) => pdata.tree[i].path.includes(substring))) {
                            whitelist.push(pdata.tree[i].path.toString());
                          }
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
  });

  browser.storage.onChanged.addListener(function(changes, namespace) {
    for (var key in changes) {
      var storageChange = changes[key];
      var changePatrol = document.getElementById("hopscotchOptions");
      if (key === "autoPlayEnabled") {
        changePatrol.setAttribute("data-autoplayenabled", storageChange.newValue);
      } else if (key === "playBackDelay") {
        changePatrol.setAttribute("data-playbackdelay", storageChange.newValue);
      } else if (key === "categories") {
        changePatrol.setAttribute("data-categories", storageChange.newValue);
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
}

ping();
