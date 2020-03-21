// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// updated for the hackathon coronavirus on 21-22 March


// after the website has been loaded, send message to content.js so that it can start scanning the page
// after receiving the response from content.js that it has completed the scanning process then set the status accordingly
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('status').textContent = "Extension loaded";
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {'data': "Start scanning"}, function(response) {
            $('#status').html('changed data in page');
            console.log('success');
        });
    });
});