  var prefix = "Huemix-Blopscotch:: ";
  var sUsrAg = window.navigator.userAgent;
  var goog = /^https?:\/\/(.*?)google(.*?)/;
  // Author choice to narrow down to a specific url
  if (goog.test(location.href)) {
      console.log(prefix + "Loading tour button onto Google web page");
      // Let's attach a Take Tour button to the page
      // <div id="startTourBtn" style="position:relative;display:inline-block;padding-right:50px;" class="nav-text-button"><a class="button primary" style="width:100%;" href="#">▶ Tour</a></div>
      var b = document.createElement('div');
      b.setAttribute('id', 'googtour');
      if (sUsrAg.indexOf("Firefox") > -1) {
        b.setAttribute('style', 'position:relative;display:inline-block;padding-right:50px;');
      } else if (sUsrAg.indexOf("Chrome") > -1) {
        b.setAttribute('style', 'position:relative;display:inline;padding-right:50px;');
      } else {
        b.setAttribute('style', 'position:relative;display:inline;padding-right:50px;');
      }
      var a = document.createElement('a');
      a.setAttribute('class','button primary');
      a.setAttribute('style','width:100%;');
      a.setAttribute('href', '#');
      var t = document.createTextNode("▶  Tour");
      a.appendChild(t);
      b.appendChild(a);

      if( document.readyState !== 'loading' ) {
          var googelem = document.getElementById("hptl");
          console.log( 'document is already ready, just execute code here' );
          console.log(prefix + "Tour Button injected on Google WebSite...");
          console.log(prefix + "Happy Touring from the IBM CP4MCM Team!");
          var t = document.createElement ('script');
          t.src = "https://raw.githack.com/joshisa/huemix-blopscotch/master/tour/google.js";
          document.body.appendChild(t);
          googelem.appendChild(b);
      } else {
          document.addEventListener("DOMContentLoaded", function(event) {
            var googelem = document.getElementById("hptl");
            console.log(prefix + "Tour Button injected on Google WebSite...");
            console.log(prefix + "Happy Touring from the IBM CP4MCM Team!");
            var t = document.createElement ('script');
            t.src = "https://raw.githack.com/joshisa/huemix-blopscotch/master/tour/google.js";
            document.body.appendChild(t);
            googelem.appendChild(b);
          });
      }
  }
