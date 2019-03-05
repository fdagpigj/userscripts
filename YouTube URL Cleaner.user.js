// ==UserScript==
// @name           YouTube URL Cleaner
// @namespace      fdagpigj
// @description    Removes unneeded parameters and redirection pages from YouTube links.
// @author         fdagpigj
// @include        http://youtube.com/*
// @include        http://www.youtube.com/*
// @include        https://youtube.com/*
// @include        https://www.youtube.com/*
// @version        1
// @grant          none
// @run-at         document-start
// ==/UserScript==

/*
 Based on YouTube Link Cleaner by tfr
 https://greasyfork.org/en/scripts/1193-youtube-link-cleaner
*/


var disable = {};
disable.playlist = true;


// If on a redirect page, redirect
if(window.location.pathname == "/redirect") {
  window.location.href.match(/(&|\?)q=(.*?)(&|$)/);
  window.location.replace(window.decodeURIComponent(RegExp.$2));
}
// Disable SPF, inspired by https://openuserjs.org/scripts/JoeSimmons/YouTube_-_Disable_Red_Bar_aka_SPF/source
if(window && window._spf_state && window._spf_state.config) {
  window._spf_state.config["navigate-limit"] = 0;
}

// If a unneeded parameter exists, remove it
if(window.location.pathname!=="/playlist" && window.location.href.match(/(&(feature|src_vid|annotation_id|gl|hl|list|index|ab_channel)=[a-zA-Z0-9_\-\.]*|\?(feature|src_vid|annotation_id|gl|hl|list|index|ab_channel)=[a-zA-Z0-9_\-\.]*$)/)) {
  window.history.replaceState({}, window.document.title, window.location.href.replace(/(&(feature|src_vid|annotation_id|gl|hl|ab_channel)=[a-zA-Z0-9_\-\.]*|\?(feature|src_vid|annotation_id|gl|hl|ab_channel)=[a-zA-Z0-9_\-\.]*$)/g, ''));
  if (disable.playlist) {
    window.history.replaceState({}, window.document.title, window.location.href.replace(/(&(list|index)=[a-zA-Z0-9_\-\.]*|\?(list|index)=[a-zA-Z0-9_\-\.]*$)/g, ''));
  }
}

if(window.location.href.match(/(&t=0s?|\?t=0s?)/g, '')) {
  window.history.replaceState({}, window.document.title, window.location.href.replace(/(&t=0s?|\?t=0s?)/g, ''));
}

function removeParams() {
	//console.log(hasFocus)
	if (!hasFocus) {return}
	for (var i = 0; i < window.document.links.length; i++) {
		var link = window.document.links[i];
		if(link.pathname !== "/playlist") {//do not remove list parametre from playlist pages...
		  // Remove unneeded parameters
		  link.href = link.href.replace(/(&(feature|src_vid|annotation_id|gl|hl)=[a-zA-Z0-9_\-\.]*|\?(feature|src_vid|annotation_id|gl|hl)=[a-zA-Z0-9_\-\.]*$)/g, '');
      if (disable.playlist) {
        link.href = link.href.replace(/(&(list|index)=[a-zA-Z0-9_\-\.]*|\?(list|index)=[a-zA-Z0-9_\-\.]*$)/g, '');
      }
      link.href = link.href.replace(/(&t=0s?|\?t=0s?)/g, '');
      //link.href = link.href.replace(/&t=0s/g, '');
		  // Do not use redirect pages
		  link.className = link.className.replace(/(yt-uix-redirect-link)/g, "");
		}
	}
}

var hasFocus = true;
window.onfocus = function() {hasFocus = true};
window.onblur = function() {hasFocus = false};

// playlists are annoying
if (window.location.pathname === "/playlist") {
  window.setInterval(removeParams, 15000);
  window.setTimeout(removeParams, 800);
}

removeParams();
//unsafeWindow.removeParams = removeParams; //for testing

