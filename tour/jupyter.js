/* globals hopscotch: false */
/*
 * Elements courtesy of https://github.com/gthomas3
 * https://github.com/linkedin/hopscotch/issues/80#issuecomment-48330396
*/
function setCookie(key, value) {
    var expires = new Date();
    expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000));
    document.cookie = key + '=' + value + ';path=/' + ';expires=' + expires.toUTCString();
};

function deleteCookie(key) {
  document.cookie = key +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function getCookie(key) {
    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;
};

var tour = {
  id: 'hello-jupyter-on-bluemix',
  steps: [
    {
      target: 'iframe#guest#menubar',
      title: 'Welcome to our Jupyter Notebook tl;dr',
      content: 'Hey there! <a href="https://ibm.com/jstart"><img border=0 src="https://raw.githubusercontent.com/joshisa/huemix-blopscotch/master/img/jstart.png" style="height:20px;width:20px;vertical-align:middle;">&nbsp;IBM jStart</a> is honored to be a partner in your journey with Apache Spark, Jupyter Notebooks and OpenStack Object Storage. There\'s plenty of time to read doc and sample code, but join us first on this quick feature fly-by!',
      placement: 'bottom',
      arrowOffset: 0
    }
  ],
  showPrevButton: true,
  scrollTopMargin: 100,
  onEnd: function() {
      setCookie("toured", "toured");
  }
  //onClose: function() {
    //setCookie("toured", "toured");
  //}
},

/* ========== */
/* TOUR SETUP */
/* ========== */
addClickListener = function(el, fn) {
  if (el.addEventListener) {
    el.addEventListener('click', fn, false);
  }
  else {
    el.attachEvent('onclick', fn);
  }
},

init = function() {
  var startBtnId = 'startTourBtn',
      calloutId = 'startTourCallout',
      mgr = hopscotch.getCalloutManager(),
      state = hopscotch.getState();

  if (state && state.indexOf('hello-spark-on-bluemix') === 0) {
    // Already started the tour at some point!
    hopscotch.startTour(tour);
  }
  else {
    // Looking at the page for the first(?) time.
    if (!getCookie("toured")) {
        setTimeout(function() {
          mgr.createCallout({
            id: calloutId,
            target: startBtnId,
            placement: 'left',
            title: 'Friend, interested in a tour?',
            content: 'We shall not cease from exploration<br>And the end of all our exploring<br>Will be to arrive where we started<br>And know the place for the first time.<br>∞T.S. Eliot∞',
            yOffset: -20,
            arrowOffset: 20,
            width: 240
          });
        }, 100);
    }
  }

  addClickListener(document.getElementById(startBtnId), function() {
    if (!hopscotch.isActive) {
      mgr.removeAllCallouts();
      deleteCookie('toured');
      hopscotch.startTour(tour);
    }
  });
};


init();
