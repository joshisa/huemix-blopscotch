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

function wrap(el, wrapper, newid) {
    wrapper.setAttribute("id", newid)
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
}


var autoPlayEnabled = hopscotchOptions.dataset.autoplayenabled || false;
var playBackDelay = hopscotchOptions.dataset.playbackdelay || 8;
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

var autoplay;
var globalCadence = (parseInt(playBackDelay)*1000);
var tour = {
    id: 'hello-cloudpak-for-multicloud-management',
    steps: [{
            target: 'icp-user-dropdown',
            title: 'User DropDown Menu',
            content: '<b>Hey there!</b> IBM is honored to be a partner in your multicloud journey. There\'s plenty of time to read doc and explore sample code, but join us first on this quick feature fly-by!<br/>Through this dropdown, access features in the context of your account here.  Things like <span style=\"color:blue\">client command line configuration, setting a default home page and your login session</span>',
            placement: 'bottom',
            arrowOffset: 260,
            xOffset: -280,
            yOffset: 10,
            delay: 0,
            onNext: ["openUserMenu"],
            onError:["openUserMenu"],
        },
        {
            target: 'icp-user',
            title: 'User Deets',
            content: 'Quick reference on the current user name, role and account.',
            placement: 'left',
            arrowOffset: 0,
            yOffset: 0,
            delay: 0,
            onNext: ["openUserMenu"],
            onPrev: ["closeUserMenu"],
            onError:["openUserMenu"],
        },
        {
            target: 'configure-client',
            title: 'kubectl CLI Config',
            content: 'To access your cluster by using the command line interface (CLI), you must install and configure kubectl, the Kubernetes command line tool. For convenience, the cluster configuration details are provided via this menu entry.  This configuration expires in 12 hours. To continue to use the CLI, you must log in and reconfigure kubectl every 12 hours. To avoid this limitation, you can configure your CLI by using service accounts.',
            placement: 'left',
            arrowOffset: 0,
            yOffset: 0,
            delay: 0,
            onNext: ["openUserMenu"],
            onPrev: ["openUserMenu"],
            onError:["openUserMenu"],
        },
        {
            target: 'icp-homepage',
            title: 'Favorite Page',
            content: 'Choose your favorite page to see first!',
            placement: 'left',
            arrowOffset: 0,
            yOffset: 0,
            delay: 0,
            onNext: ["openUserMenu"],
            onPrev: ["openUserMenu"],
            onError:["openUserMenu"],
        },
        {
            target: 'icp-logout',
            title: 'Logout',
            content: 'Would hate to see you go, but this is where you can exit a user session',
            placement: 'left',
            arrowOffset: 0,
            yOffset: 0,
            delay: 0,
            onNext: [["closeUserMenu"], ["openInfoMenu"]],
            onPrev: ["openUserMenu"],
            onError:["openUserMenu"],
        },
        {
            target: 'icp-about',
            title: 'About Dialog',
            content: 'Quick reference on version, copyright and licensing information.',
            placement: 'left',
            arrowOffset: 0,
            yOffset: 0,
            delay: 1000,
            onNext: ["openInfoMenu"],
            onPrev: [["closeInfoMenu"], ["openUserMenu"]],
            onError:["openInfoMenu"],
        },
        {
            target: 'icp-kc',
            title: 'Knowledge Center',
            content: 'Obtain valuable information from the Knowledge Center. Things like Release notes explaining what\'s new and known issues.  Getting started, installation, deep dive explanations on product features and overviews covering Multicloud Manager, Cloud Application Management, Event Management, Infrastructure Management and much, much more!',
            placement: 'left',
            arrowOffset: 0,
            yOffset: 0,
            delay: 0,
            onNext: ["openInfoMenu"],
            onPrev: ["openInfoMenu"],
            onError:["openInfoMenu"],
        },
        {
            target: 'icp-welcome',
            title: 'Welcome - Getting Started',
            content: 'Convenient shortcut link to the \"Getting Started\" welcome page',
            placement: 'left',
            arrowOffset: 0,
            yOffset: 0,
            delay: 0,
            onNext: ["openInfoMenu"],
            onPrev: ["openInfoMenu"],
            onError:["openInfoMenu"],
        },
        {
            target: 'icp-support',
            title: 'Support',
            content: 'We are here to help. While we work hard to make things simple and clear, we know that gremlins can happen at any time.  Share your questions. Share your comments. Our support team is ready.',
            placement: 'left',
            arrowOffset: 0,
            yOffset: 0,
            delay: 0,
            onNext: [["closeInfoMenu"], ["openTermMenu"]],
            onPrev: ["openInfoMenu"],
            onError:["openInfoMenu"],
        },
        {
            target: 'icp-web-terminal',
            title: 'Browser based web terminal',
            content: 'For those times when a situation needs a power-user move - drop into command-line without the hassle of configuration or setup locally. Sweet!',
            placement: 'left',
            arrowOffset: 0,
            yOffset: 0,
            delay: 1000,
            onNext: ["openTermMenu"],
            onPrev: [["closeTermMenu"], ["openInfoMenu"]],
            onError:["openTermMenu"],
        },
        {
            target: 'icp-visual-web-terminal',
            title: 'KUI',
            content: 'Taking the CLI experience to a whole new level. Experience IBM Research technology first-hand! A hybrid CLI experience blending visual and terminal experiences for your Hybrid Cloud world.',
            placement: 'left',
            arrowOffset: 0,
            yOffset: 0,
            delay: 0,
            onNext: ["closeTermMenu"],
            onPrev: ["openTermMenu"],
            onError:["openTermMenu"],
        },
        {
            target: document.querySelectorAll('.hamburger-box')[0],
            title: 'Hamburger Menu',
            content: 'This side menu is your main navigation.',
            placement: 'right',
            arrowOffset: 0,
            yOffset: -20,
            delay: 0,
            onPrev: ["openTermMenu"],
            onNext: ["openSideMenu"],
            onError:["openSideMenu"],
        },
        {
            target: { get target() { return '#overview' }},
            title: 'Overview',
            content: 'A great place to understand things at a very high level across all managed systems. Use the Overview page to view, manage, and reorganize the dashboard of your cluster information. You can view details of your clusters and other cloud service providers that IBM Multicloud Manager supports. You can also view details about your applications. The Overview dashboard is continuously refreshed in real time.',
            placement: 'right',
            arrowOffset: 0,
            yOffset: -10,
            delay: 700,
            onNext: ["openSideMenu"],
            onPrev: ["openSideMenu"],
            onError:["openSideMenu"],
        },
        {
            target: { get target() { return '#topology' }},
            title: 'Topology Page',
            content: 'Architects love this view. It visualizes relationships between components and within an application. With containerization, application boundaries may be hard to understand - but not with CP4MCM. The Topology page uses information from Weave Scope probe to display Kubernetes objects within a cluster. You can view hub cluster resources. As you configure managed clusters, you see more clusters in the Topology view.',
            placement: 'right',
            arrowOffset: 0,
            yOffset: -10,
            delay: 700,
            onNext: ["openSideMenu"],
            onPrev: ["openSideMenu"],
            onError:["openSideMenu"],
        },
        {
            target: { get target() { return '#applications' }},
            title: 'Applications Page',
            content: 'Developers and Operators appreciate this view. You can use the applications page to create, manage, view details, and troubleshoot application resources, including applications, deployables, channels, and subscriptions.',
            placement: 'right',
            arrowOffset: 0,
            yOffset: -10,
            delay: 700,
            onNext: ["openSideMenu"],
            onPrev: ["openSideMenu"],
            onError:["openSideMenu"],
        },
        {
            target: { get target() { return '#search' }},
            title: 'Search Page',
            content: 'Operators need this view. The needs of one cluster rhyme with the needs of many. Find what you\'re looking for. There\'s alot to sift through.  With the search page, you get visibility into your resources across all your clusters. You can save your popular ones and the platform will happily suggest other filtered views for your consideration.',
            placement: 'right',
            arrowOffset: 0,
            yOffset: -10,
            delay: 700,
            onNext: ["openSideMenu"],
            onPrev: ["openSideMenu"],
            onError:["openSideMenu"],
        },
        {
            target: { get target() { return '#clusters' }},
            title: 'Clusters Page',
            content: 'Operators use this view when thinking about their environments from a top-down perspective.',
            placement: 'right',
            arrowOffset: 0,
            yOffset: -10,
            delay: 700,
            onNext: ["openSideMenu"],
            onPrev: ["openSideMenu"],
            onError:["openSideMenu"],
        },
        {
            target: { get target() { return '#policies' }},
            title: 'Governance and Risk Page',
            content: 'SecOps care about this view. ',
            placement: 'right',
            arrowOffset: 0,
            yOffset: -10,
            delay: 700,
            onNext: ["openSideMenu"],
            onPrev: ["openSideMenu"],
            onError:["openSideMenu"],
        },
        {
            target: { get target() { return '#monitoring' }},
            title: 'Monitoring Page',
            content: 'Operators need this view. The needs of one cluster rhyme with the needs of many. With a federated monitoring Grafana Dashboard, you have resource metrics at your fingertips.',
            placement: 'right',
            arrowOffset: 0,
            yOffset: -10,
            delay: 700,
            onNext: ["openSideMenu"],
            onPrev: ["openSideMenu"],
            onError:["openSideMenu"],
        },
        {
            target: { get target() { return '#releases' }},
            title: 'Helm Releases Page',
            content: 'Developers and Operators manage resources in this view. Content is king and having access to world-class IBM and opensource middleware gives your organization advantages.',
            placement: 'right',
            arrowOffset: 0,
            yOffset: -10,
            delay: 700,
            onNext: ["openSideMenu"],
            onPrev: ["openSideMenu"],
            onError:["openSideMenu"],
        },
        {
            target: { get target() { return '#local' }},
            title: 'Local Cluster Drill Down',
            content: 'Operators infrequently use this view to look at the MCM Hub\'s cluster underpinning its behavior. Even the best maintained homes have their crawl spaces inspected once in a while.',
            placement: 'right',
            arrowOffset: 0,
            yOffset: -10,
            delay: 700,
            multipage: true,
            onNext: function() {
              window.location.href ="/multicloud/overview";
            },
            onPrev: ["openSideMenu"],
            onError: ["openSideMenu"],
        },
        {
            target: 'header',
            title: 'Overview Page',
            content: 'View operations details across all of your cloud providers.',
            placement: 'bottom',
            arrowOffset: 100,
            xOffset: 800,
            multipage: true,
            delay: 500,
            onPrev: ["openSideMenu"],
        },
    ],
    showPrevButton: true,
    scrollTopMargin: 100,
    onEnd: [["setCookie"], ["clearTimer"]],
    onClose: [["setCookie"], ["closeUserMenu"], ["closeInfoMenu"], ["closeTermMenu"], ["clearTimer"]],
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

    hopscotch.registerHelper("setCookie", function() {
        console.log("setCookie invoked ...");
        var expires = new Date();
        expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000));
        document.cookie = 'toured=toured;path=/' + ';expires=' + expires.toUTCString();
    });

    hopscotch.registerHelper("clearTimer", function() {
        console.log("clearTimer invoked ...");
        console.log(autoplay);
        clearInterval(autoplay);
    });

    hopscotch.registerHelper("openUserMenu", function() {
        console.log("openUserMenu invoked ...");
        document.querySelector('#icp-user-dropdown').firstElementChild.classList.add("is-open");
    });

    hopscotch.registerHelper("closeUserMenu", function() {
        console.log("closeUserMenu invoked ...");
        document.querySelector('#icp-user-dropdown').firstElementChild.classList.remove("is-open");
    });

    hopscotch.registerHelper("openInfoMenu", function() {
        console.log("openInfoMenu invoked ...");
        document.querySelector('#icp-info-dropdown').firstElementChild.classList.add("is-open");
    });

    hopscotch.registerHelper("closeInfoMenu", function() {
        console.log("closeInfoMenu invoked ...");
        document.querySelector('#icp-info-dropdown').firstElementChild.classList.remove("is-open");
    });

    hopscotch.registerHelper("openTermMenu", function() {
        console.log("openTermMenu invoked ...");
        document.querySelector('#icp-terminal-dropdown').firstElementChild.classList.add("is-open");
    });

    hopscotch.registerHelper("closeTermMenu", function() {
        console.log("closeTermMenu invoked ...");
        document.querySelector('#icp-terminal-dropdown').firstElementChild.classList.remove("is-open");
    });

    hopscotch.registerHelper("openSideMenu", function() {
        //keep console.log("registerHelper invoked ...");
        if (!document.querySelector('#left-nav')) {
          document.querySelector('.hamburger-box').click();
        }
        //var checkExist = setInterval(function() {
        //    var element = document.querySelectorAll('#overview')[0];
        //    if (element) {
        //      clearInterval(checkExist);
        //keep console.log(document.querySelector('#overview').id);
        // Wrapping React element within a div to avoid Uncaught TypeError: j.getBoundingClientRect is not a function
        // https://github.com/soenkekluth/react-sticky-state/issues/9

        //wrap(document.querySelector('#overview'), document.createElement('div'), 'overview-tour');

        // window.hopscotch.startTour(window.hopscotch.getCurrTour(), window.hopscotch.getCurrStepNum());
        //    }
        //}, 2000);
    });

    if (state && state.indexOf('hello-cloudpak-for-multicloud-management') === 0) {
        // Already started the tour at some point!
        hopscotch.startTour(tour);
        autoPlayEnabled = hopscotchOptions.dataset.autoplayenabled;
        globalCadence = (parseInt(hopscotchOptions.dataset.playbackdelay)*1000);
        if (String(autoPlayEnabled) == "true") {
          autoplay = setInterval(function () { hopscotch.nextStep() }, globalCadence);
        } else {
          clearInterval(autoplay);
        }
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
                    xOffset: -15,
                    yOffset: -15,
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
            autoPlayEnabled = hopscotchOptions.dataset.autoplayenabled;
            globalCadence = (parseInt(hopscotchOptions.dataset.playbackdelay)*1000);
            if (String(autoPlayEnabled) == "true") {
              autoplay = setInterval(function () { hopscotch.nextStep() }, globalCadence);
            } else {
              clearInterval(autoplay);
            }
        }
    });

};


init();
