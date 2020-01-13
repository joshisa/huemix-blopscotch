  var prefix = "Huemix-Blopscotch:: ";
  var goog = /^https?:\/\/(.*?)google(.*?)/;
  // Author choice to narrow down to a specific url
  if (goog.test(location.href)) {
      console.log(prefix + "Loading tour button onto Google web page");
      // Let's attach a Take Tour button to the page
      // <li id="blah"><div id="startTourBtn" style="position:relative;display:inline-block;padding-right:50px;" class="nav-text-button"><a class="button primary" style="width:100%;" href="#">▶ Tour</a></div></li>
      var googtophf = document.getElementById("tophf");
      var a = document.createElement('input');
      a.setAttribute('id', 'googtour');
      a.setAttribute('aria-label','Google Tour');
      a.setAttribute('name', 'googtour');
      a.setAttribute('type', 'submit');
      a.setAttribute('value', 'Web Tour');
      document.addEventListener("DOMContentLoaded", function(){
        googtophf.append(a);
        console.log(prefix + "Tour Button injected on Google WebSite...");
        console.log(prefix + "Happy Touring from the IBM CP4MCM Team!");

        var t = document.createElement ('script');
        t.src = "https://raw.githack.com/joshisa/huemix-blopscotch/master/tour/google.js";
        document.body.appendChild(t);
      });
  }
