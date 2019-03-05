// ==UserScript==
// @name           Old YouTube
// @namespace      fdagpigj
// @description    Redirects to the old YouTube layout.
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
 adds disable_polymer to all yt pages
*/

if(window.location.href.indexOf("youtube.com")!==-1 && !window.location.href.match(/(&(disable_polymer)=(true|1)*|\?(disable_polymer)=(true|1)*$)/)) {
  let to_append = window.location.href.indexOf("?") === -1 ? "?" : "&";
  to_append += "disable_polymer=true";
  window.location = window.location.href + to_append;
  // edit the history so we don't break the browser's "back" button
  window.history.replaceState({}, window.document.title, window.location.href + to_append);
}

