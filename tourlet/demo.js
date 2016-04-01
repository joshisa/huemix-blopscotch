var demo = /^file?:\/\/\/(.*?)hopscotch(.*?)/;
if (demo.test(location.href)) {
	console.log(prefix + "Loading demo.js tour");
	var t = document.createElement ('script');
	t.src = "https://rawgit.com/joshisa/huemix-blopscotch/master/js/demo.js";
	document.body.appendChild (t);
}
