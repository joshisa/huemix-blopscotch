  var prefix = "Huemix-Blopscotch:: ";
  var goog = /^https?:\/\/(.*?)google(.*?)/;
  // Author choice to narrow down to a specific url
  if (goog.test(location.href)) {
      console.log(prefix + "Loading tour button onto Google web page");
      // Let's attach a Take Tour button to the page
      // <div id="startTourBtn" style="position:relative;display:inline-block;padding-right:50px;" class="nav-text-button"><a class="button primary" style="width:100%;" href="#">▶ Tour</a></div>
      var googelem = document.getElementById("gb");
      var b = document.createElement('div');
      b.setAttribute('id', 'googtour');
      b.setAttribute('style', 'position:relative;display:inline;padding-right:50px;');
      var a = document.createElement('a');
      a.setAttribute('class','button primary');
      a.setAttribute('style','width:100%;');
      a.setAttribute('href', '#');
      var t = document.createTextNode("▶  Tour");
      a.appendChild(t);
      b.appendChild(a);

      document.addEventListener("DOMContentLoaded", function(event) {
        googelem.append(b);
        console.log(prefix + "Tour Button injected on Google WebSite...");
        console.log(prefix + "Happy Touring from the IBM CP4MCM Team!");
        var t = document.createElement ('script');
        t.src = "https://raw.githack.com/joshisa/huemix-blopscotch/master/tour/google.js";
        document.body.appendChild(t);
      });
  }
