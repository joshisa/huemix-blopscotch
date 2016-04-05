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
  id: 'hello-spark-on-bluemix',
  steps: [
    {
      target: document.querySelectorAll('.data-nav-title')[0],
      title: 'Welcome to the IBM Bluemix Spark-as-a-Service tl;dr',
      content: 'Hey there! <a href="https://ibm.com/jstart"><img border=0 src="https://raw.githubusercontent.com/joshisa/huemix-blopscotch/master/img/jstart.png" style="height:20px;width:20px;vertical-align:middle;">&nbsp;IBM jStart</a> is honored to be a partner in your journey with Apache Spark, Jupyter Notebooks and OpenStack Object Storage. There\'s plenty of time to read doc and sample code, but join us first on this quick feature fly-by!',
      placement: 'bottom',
      arrowOffset: 60
    },
    {
      target: ['instances', 'all-instances'],
      title: 'Apache Spark Instances',
      content: 'A multi-tenant Spark cluster means up to 10 separate instances just for you.  As you create \'em, find them here',
      placement: 'bottom',
      arrowOffset: 60
    },
    {
      target: ['storage'],
      title: 'Object Storage',
      content: 'Jupyter (iPython) notebooks need data from somewhere.  Here\'s your goto spot! A tab that shows you OpenStack Object Storage instances',
      placement: 'bottom',
      arrowOffset: 60
    },
    {
      target: ['notebooks', 'all-notebooks'],
      title: 'Jupyter Notebooks',
      content: 'Did you notice this tab to show you all of your Jupyter (iPython) notebooks?',
      placement: 'bottom',
      arrowOffset: 60
    },
    {
      target: document.querySelectorAll('.data-page-icon.services')[0],
      title: 'Services',
      content: 'Look here! Here\'s a view to explore getting data into your services',
      placement: 'right',
      arrowOffset: 30
    },
    {
      target: document.querySelectorAll('.data-page-icon.data')[0],
      title: 'Data',
      content: 'Got data sources? View and Edit connections for them here',
      placement: 'right',
      arrowOffset: 30
    },
    {
      target: document.querySelectorAll('.data-page-icon.analytics')[0],
      title: 'Analytics',
      content: 'Almost done, this is homebase for Spark using notebooks',
      placement: 'right',
      arrowOffset: 30
    },
    {
      target: document.querySelectorAll('.data-page-icon.exchange')[0],
      title: 'Exchange',
      content: 'Behind Door #3, check out 200+ Datasets via the Analytics Exchange.',
      placement: 'right',
      arrowOffset: 30
    },
    {
      target: document.querySelectorAll('.notebooks-desc')[0],
      title: 'Precipitation Analysis',
      content: 'Rain, rain go away - check out the Precipitation Analysis notebook for a simple starter',
      placement: 'top',
      arrowOffset: 30
    },
  ],
  showPrevButton: true,
  scrollTopMargin: 100,
  onEnd: function() {
      setCookie("toured", "toured");
  }
  //onClose: function() {
  //  setCookie("toured", "toured");
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
    alert('resumed-' + getCookie("toured"));
    hopscotch.startTour(tour);
  }
  else {
    // Looking at the page for the first(?) time.
    alert('new-huh-' + getCookie("toured"));
    if (!getCookie("toured")) {
        setTimeout(function() {
          mgr.createCallout({
            id: calloutId,
            target: startBtnId,
            placement: 'left',
            title: 'Friend, interested in a tour?',
            content: 'We shall not cease from exploration<br>And the end of all our exploring<br>Will be to arrive where we started<br>And know the place for the first time.<br>∞T.S. Eliot∞',
            yOffset: -25,
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
