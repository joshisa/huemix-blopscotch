var demo = /^file?:\/\/\/(.*?)hopscotch(.*?)/;
if (demo.test(location.href)) {
	var t = document.createElement ('script');
	t.src = "https://rawgit.com/joshisa/huemix-blopscotch/master/tourlet/demo.js";
	document.body.appendChild (t);
}
