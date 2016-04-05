/* globals hopscotch: false */

/* ============ */
/* EXAMPLE TOUR */
/* ============ */
var tour = {
  id: 'hello-spark-on-bluemix',
  steps: [
    {
      target: 'main-infobar',
      title: 'Welcome to Spark-as-a-Service on IBM Bluemix!',
      content: 'Hey there! <a href="https://ibm.com/jstart"><img border=0 src="https://raw.githubusercontent.com/joshisa/huemix-blopscotch/master/img/jstart.png" style="height:20px;width:20px;vertical-align:middle;">IBM jStart</a> is honored to be a partner in your journey with Apache Spark, Jupyter Notebooks and OpenStack Object Storage.   There will be plenty of time to read documentation and sample code, but let\'s quickly see what fun levers are here to pull!',
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
      content: 'Homebase for Spark using notebooks',
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
      content: 'Rain, rain go away - check out the Precipitation Analysis notebook',
      placement: 'top',
      arrowOffset: 30
    },
  ],
  showPrevButton: true,
  scrollTopMargin: 100
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

  if (state && state.indexOf('hello-hopscotch:') === 0) {
    // Already started the tour at some point!
    hopscotch.startTour(tour);
  }
  else {
    // Looking at the page for the first(?) time.
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

  addClickListener(document.getElementById(startBtnId), function() {
    if (!hopscotch.isActive) {
      mgr.removeAllCallouts();
      hopscotch.startTour(tour);
    }
  });
};

init();
