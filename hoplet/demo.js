var demo = /^file?:\/\/\/(.*?)hopscotch(.*?)/;
if (demo.test(location.href)) {
	var t = document.createElement ('script');
	t.src = "https://cdn.jsdelivr.net/gh/joshisa/huemix-blopscotch/tour/demo.js";
	document.body.appendChild (t);
}
