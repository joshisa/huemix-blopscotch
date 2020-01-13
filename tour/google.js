/* globals hopscotch: false */

/* ============ */
/* EXAMPLE TOUR */
/* ============ */
var tour = {
  id: 'hello-google',
  steps: [
    {
      target: 'hplogo',
      title: 'Welcome to Hopscotch!',
      content: 'Hey there! This is an example Hopscotch tour. There will be plenty of time to read documentation and sample code, but let\'s just take some time to see how Hopscotch actually works.',
      placement: 'bottom',
      arrowOffset: 60,
      highlight: true,
      highlightMargin: 0
    },
    {
      target: document.querySelector("input[name='q']"),
      title: '&#127798; Where to begin',
      content: 'At the very least, you\'ll need to decide what you want to search for.',
      placement: 'bottom',
      yOffset: -20
    },
  ],
  showPrevButton: true,
  scrollTopMargin: 100,
  highlight: true
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
  var startBtnId = 'googtour',
      calloutId = 'startTourCallout',
      mgr = hopscotch.getCalloutManager(),
      state = hopscotch.getState();

  if (state && state.indexOf('hello-google:') === 0) {
    // Already started the tour at some point!
    hopscotch.startTour(tour);
  }
  else {
    // Looking at the page for the first(?) time.
    setTimeout(function() {
      mgr.createCallout({
        id: calloutId,
        target: startBtnId,
        placement: 'bottom',
        title: '&#127798; Friend, interested in a tour?',
        content: 'We shall not cease from exploration<br>And the end of all our exploring<br>Will be to arrive where we started<br>And know the place for the first time.<br>∞T.S. Eliot∞',
        yOffset: 10,
        arrowOffset: 20,
        width: 240,
        highlight: true
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
