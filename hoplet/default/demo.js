var demo = /^file?:\/\/\/(.*?)hopscotch(.*?)/;
if (demo.test(location.href)) {
	var t = document.createElement ('script');
	t.src = "https://raw.githack.com/joshisa/huemix-blopscotch/master/tour/demo.js";
	document.body.appendChild (t);
}
