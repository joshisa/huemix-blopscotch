var cp4mcm = /^https?:\/\/icp-console(.*?)/;
  // Initialize tour if it's the user's first time
  if (cp4mcm.test(location.href)) {
  console.log(prefix + "Loading tour button on Exploring Cloud Pak for MultiCloud Management");
  // Let's attach a Take Tour button to the page
  // <li id="blah"><div id="startTourBtn" style="position:relative;display:inline-block;padding-right:50px;" class="nav-text-button"><a class="button primary" style="width:100%;" href="#">▶ Tour</a></div></li>
  var create_resource_item = document.getElementById("icp-create-resource");
  var c = document.createElement('li');
  c.setAttribute('id', 'itemHolder');
  var b = document.createElement('div');
  b.setAttribute('id', 'startTourBtn');
  b.setAttribute('style', 'position:relative;display:inline-block;padding-right:50px;');
  var a = document.createElement('a');
  a.setAttribute('class','button primary');
  a.setAttribute('style','width:100%;');
  a.setAttribute('href', '#');
  var t = document.createTextNode("▶  Tour");
  a.appendChild(t);
  b.appendChild(a);
  c.appendChild(b);
  create_resource_item.parentNode.insertBefore(c,create_resource_item);
  console.log(prefix + "Tour Button injected ...");
  console.log(prefix + "Happy Touring from the IBM CP4MCM Team!");

  var t = document.createElement ('script');
  t.src = "https://raw.githack.com/joshisa/huemix-blopscotch/master/tour/cp4mcm.js";
  document.body.appendChild(t);

  chrome.storage.sync.get(['autoPlayEnabled','playBackDelay'], function(items) {
    autoPlayEnabledValue = items.autoPlayEnabled || "false";
    playBackDelayValue = items.playBackDelay || "8";
    //Trying to create this hidden div to share extension options with tour script
    //<div id="hopscotchOptions" data-autoplayenabled="true" data-playbackdelay="8"></div>
    var h = document.createElement('div');
    h.id = 'hopscotchOptions';
    h.setAttribute("data-autoplayenabled", autoPlayEnabledValue);
    h.setAttribute("data-playbackdelay", playBackDelayValue);
    document.body.appendChild(h);
    console.log("Is autoplay enabled? " + autoPlayEnabledValue);
    console.log("Global Playback Cadence: " + playBackDelayValue);
  });
}
