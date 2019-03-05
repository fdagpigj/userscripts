// ==UserScript==
// @name           YouTube autoplay stopper
// @namespace      fdagpigj
// @description    Stops youtube video autoplay
// @author         fdagpigj
// @include        http://youtube.com/*
// @include        http://www.youtube.com/*
// @include        https://youtube.com/*
// @include        https://www.youtube.com/*
// @version        1
// @grant          none
// @run-at         document-end
// ==/UserScript==

/*
 this is an ugly hack
 probably doesn't even work with the new yt layout
 and since a few firefox upgrades ago this started resulting in often having to refresh the page
 you used to be able to have run-at set to document-start
*/

var video = document.getElementsByTagName("video")[0];
function findVideo() {
  video = document.getElementsByTagName("video")[0];
}

function pauseVideo() {
  if (video===undefined) findVideo();
  video.pause();
  // this isn't being run every millisecond so the video might advance a few frames before it gets stopped, reset that
  if (!window.location.href.match(/&t=[a-z0-9]+/) && video.currentTime < 2) {
    video.currentTime = 0;
  }
}

function quitPausing() {window.clearInterval(pauseInterval)}

var pauseInterval = window.setInterval(pauseVideo, 20);
window.setTimeout(quitPausing, 1000);
