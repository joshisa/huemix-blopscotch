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
      content: 'Hey there! IBM is honored to be a partner in your journey with Apache Spark, Jupyter Notebooks and OpenStack Object Storage.   There will be plenty of time to read documentation and sample code, but let\'s just take some time to see what fun levers are here for you to pull!',
      placement: 'bottom',
      arrowOffset: 60
    },
    {
      target: ['notebooks', 'all-notebooks'],
      title: 'Jupyter Notebooks',
      content: 'Here\'s a tab to show you all of your Jupyter notebooks',
      placement: 'bottom',
      arrowOffset: 60
    },
    {
      target: document.querySelectorAll('.notebooks-desc')[0],
      title: 'Precipitation Analysis',
      content: 'If you\'re looking for a simple example, checkout this Precipitation Analysis notebook',
      placement: 'right',
      arrowOffset: 60
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
        title: 'Take an example tour',
        content: 'Start by taking an example tour to see Hopscotch in action!',
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

