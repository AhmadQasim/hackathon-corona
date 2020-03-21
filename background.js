// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// updated for the hackathon coronavirus on 21-22 March

// this file is run in the background once when the extension is loaded
'use strict';

// intiialize the app. Add a condition which sets which websites the extension should be activated for, and which protocols http, https
// there is no website listed here, so this extension works for all
chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {schemes: ['https', 'http']},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});


// recieve the notification message from content.js
// show the notification with myth and correction in the same message
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    chrome.notifications.create(
        'name-for-notification',
        {   
            type: 'basic', 
            iconUrl: 'https://www.tf.uni-freiburg.de/de/bilder/icons/achtung.png/image', 
            title: "Achtung!", 
            message: request.myth + request.correct 
        },
        function(notificationId) {} 
    );
    sendResponse({returnMsg: true});
  });