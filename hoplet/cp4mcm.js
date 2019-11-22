var cp4mcm = /^https?:\/\/(.*?)cloud\/multicloud(.*?)/;
// Initialize tour if it's the user's first time
if (cp4mcm.test(location.href)) {
	console.log(prefix + "Loading tour button on Exploring Cloud Pak for MultiCloud Management");
	// Let's attach a Take Tour button to the page
	var create_resource_item = document.getElementById("icp-create-resource");
	var b = document.createElement('div');
	b.setAttribute('id', 'startTourBtn');
	b.setAttribute('style', 'position:relative;display:inline-block;float:right;');
	var a = document.createElement('a');
	a.setAttribute('class','button primary');
	a.setAttribute('style','width:100%;');
	a.setAttribute('href', '#');
	var t = document.createTextNode("▶ Tour");
	a.appendChild(t);
	b.appendChild(a);
	create_resource_item[0].appendChild(b);
	console.log(prefix + "Tour Button injected ...");
  console.log(prefix + "Happy Touring from the IBM CP4MCM Team!");
	
	var t = document.createElement ('script');
	t.src = "https://raw.githack.com/joshisa/huemix-blopscotch/master/tour/cp4mcm.js";
	document.body.appendChild (t);
}
