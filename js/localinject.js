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
    autoPlayEnabledValue = items.autoPlayEnabled || "true";
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
              var prefix = "[Huemix Blopscotch Local Dev on githack]] ";
              console.log(prefix + "current page URL is: " + location.href);
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
