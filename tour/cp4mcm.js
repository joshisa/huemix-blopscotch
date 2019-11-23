/* globals hopscotch: false */
/*
 * Elements courtesy of https://github.com/gthomas3
 * https://github.com/linkedin/hopscotch/issues/80#issuecomment-48330396
 */
function setCookie(key, value) {
    var expires = new Date();
    expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000));
    document.cookie = key + '=' + value + ';path=/' + ';expires=' + expires.toUTCString();
}

function deleteCookie(key) {
    document.cookie = key + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function getCookie(key) {
    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;
}

function isVisible(elem) {
    if (!(elem instanceof Element)) throw Error('DomUtil: elem is not an element.');
    const style = getComputedStyle(elem);
    if (style.display === 'none') return false;
    if (style.visibility !== 'visible') return false;
    if (style.opacity < 0.1) return false;
    if (elem.offsetWidth + elem.offsetHeight + elem.getBoundingClientRect().height +
        elem.getBoundingClientRect().width === 0) {
        return false;
    }
    const elemCenter   = {
        x: elem.getBoundingClientRect().left + elem.offsetWidth / 2,
        y: elem.getBoundingClientRect().top + elem.offsetHeight / 2
    };
    if (elemCenter.x < 0) return false;
    if (elemCenter.x > (document.documentElement.clientWidth || window.innerWidth)) return false;
    if (elemCenter.y < 0) return false;
    if (elemCenter.y > (document.documentElement.clientHeight || window.innerHeight)) return false;
    let pointContainer = document.elementFromPoint(elemCenter.x, elemCenter.y);
    do {
        if (pointContainer === elem) return true;
    } while (pointContainer = pointContainer.parentNode);
    return false;
}

/*
var waitForElementVisible = function(element, callback) {
    var checkExist = setInterval(function() {
        $element = typeof element == "function" ? $(element()) : $(element);
        if ($element.is(':visible')) {
            clearInterval(checkExist);
            if (typeof callback == "function") {
                callback();
            }
        }
    }, 100);
};

var nextOnCallback = function(callback) {
    var currentStep = window.hopscotch.getCurrStepNum();
    callback(function() {
        window.hopscotch.startTour(theTour, currentStep);
    });
};
*/

var tour = {
    id: 'hello-cloudpak-for-multicloud-management',
    steps: [{
            target: document.querySelectorAll('.hamburger-box')[0],
            title: 'Hamburger Menu',
            content: 'Hey there! IBM is honored to be a partner in your journey with CP4MCM. There\'s plenty of time to read doc and sample code, but join us first on this quick feature fly-by!  This sidebar menu is your main navigation.',
            placement: 'right',
            arrowOffset: 0,
            multipage: true,
            onNext: ["openSideMenu"]
        },
        {
            target: document.querySelectorAll('#overview')[0],
            title: 'Overview',
            content: 'Hey there! IBM is honored to be a partner in your journey with CP4MCM. There\'s plenty of time to read doc and sample code, but join us first on this quick feature fly-by!  This is the overview.  A great place to understand things at a very high level across all managed systems.',
            placement: 'right',
            arrowOffset: 0,
            delay: 500,
            multipage: true,
            onNext: ["openSideMenu"]
        },
        {
            target: document.querySelectorAll('#topology')[0],
            title: 'Topology',
            content: 'Architect\'s love this view. It visualizes relationships between components and within an application. With containerization, application boundaries may be hard to understand - but not with CP4MCM and the cool visualizations in this view.',
            placement: 'right',
            arrowOffset: 0,
            delay: 700,
            multipage:true,
            onNext: ["openSideMenu"]
        },
    ],
    showPrevButton: true,
    scrollTopMargin: 100,
    onEnd: function() {
        setCookie("toured", "toured");
    }
    //onClose: function() {
    //    setCookie("toured", "toured");
    //}
};

/* ========== */
/* TOUR SETUP */
/* ========== */
var addClickListener = function(el, fn) {
    if (el.addEventListener) {
        el.addEventListener('click', fn, false);
    } else {
        el.attachEvent('onclick', fn);
    }
};

var init = function() {
    var startBtnId = 'startTourBtn',
        calloutId = 'startTourCallout',
        mgr = hopscotch.getCalloutManager(),
        state = hopscotch.getState();

    hopscotch.registerHelper("openSideMenu", function() {
        console.log("registerHelper invoked ...");
        document.querySelectorAll('.hamburger-box')[0].click();
        //var checkExist = setInterval(function() {
        //    var element = document.querySelectorAll('#overview')[0];
        //    if (element) {
        //      clearInterval(checkExist);
        console.log(document.querySelectorAll('#overview')[0].id);
        window.hopscotch.startTour(window.hopscotch.getCurrTour(), window.hopscotch.getCurrStepNum());
        //    }
        //}, 2000);
    });

    if (state && state.indexOf('hello-cloudpak-for-multicloud-management') === 0) {
        // Already started the tour at some point!
        hopscotch.startTour(tour);
    } else {
        // Looking at the page for the first(?) time.
        if (!getCookie("toured")) {
            setTimeout(function() {
                mgr.createCallout({
                    id: calloutId,
                    target: startBtnId,
                    placement: 'bottom',
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
