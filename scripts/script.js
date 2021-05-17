// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker.register("./sw.js").then(function(registration) {
      // Registration was successful
      console.log("ServiceWorker registration successful with scope: ", registration.scope);
    }, function(err) {
      // registration failed :(
      console.log("ServiceWorker registration failed: ", err);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      let entryNum = 1;
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);
        let currNum = entryNum; //Need a new variable or else it will use total entries + 1
        //Handles changing to single entry page
        newPost.addEventListener("click", () => {
          //Deletes old entry page first
          let entryPage = document.querySelector('entry-page');
          entryPage.remove();
          entryPage = document.createElement('entry-page');
          entryPage.entry = newPost.entry;
          document.querySelector('body').appendChild(entryPage);
          setState("entry", currNum);
        });
        entryNum++;
        //Pushes home page to history stack so the initial back button isn't null
        history.pushState({"state": "home"}, "", window.location);
        history.pushState({"state": "home"}, "", window.location);
      });
    });
});

//Clicking on title brings you to home page
let title = document.getElementsByTagName("h1")[0];
title.addEventListener("click", () => {
  setState("home", -1);
});

//Clicking on settings button brings you to settings page
let settingsBtn = document.getElementsByTagName("img")[0];
settingsBtn.addEventListener("click", () => {
  setState("settings", -1);
});

//Handles back button
window.addEventListener("popstate", (event) => {
  if(event.state.state == "entry"){
    let currNum = "" + document.location;
    let currInd = currNum.indexOf("#");
    currNum = currNum.substring(currInd + 6);
    setState(event.state.state, currNum);
  }
  else{
    setState(event.state.state, -1);
  }
});