// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// updated for the hackathon coronavirus on 21-22 March

// this file is injected into every page by chrome, so it works on the DOM level of the page

// the dictionary which holds the combination of our corrections
var corrections = {
	"Die Kraft der Zwiebel gegen Viren und Bakterien": "Die Kraft der Zwiebel gegen Viren und Bakterien ist nicht richtig",
	'"Knoblauch und Ingwer helfen auch sind aber kein Allheilmittel sie unterstützen den Körper."': "Knoblauch und Ingwer helfen auch sind aber kein Allheilmittel sie unterstützen den Körper ist nicht richtig",
	"CureVac dementiert US-Übernahmeangebot": "CureVac dementiert US-Übernahmeangebot ist nicht richtig",
	"wonach US-Präsident Donald Trump sich Zugriff auf das Unternehmen": "wonach US-Präsident Donald Trump sich Zugriff auf das Unternehmen sichern wolle ist nicht richtig",
	"Bis ein Impfstoff gegen das neue Coronavirus Sars-CoV-2 für den Einsatz am Patienten fertig ist, wird noch einige Zeit vergehen.": "Es wird ungefähr 6-12 Monate dauern, bis der Impfstoff fertig ist"
}

// this function is called when the injected div is hovered upon
function makealert(evt) {
	chrome.runtime.sendMessage({myth: evt.currentTarget.myth, correct: evt.currentTarget.correct, notif_id: evt.currentTarget.notif_id}, function(response) {
        console.log(response.returnMsg);
    });
}

// generate random notication id everytime
function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

// listens for the message from extension.js and then scans the current active tab DOM
// select some particular tags and then look for target text in them
// if the target text is found then inject a div around the tag
// add a listener on hover event on that injected div
// we don't need this code for now because we are not listening for extension.js anymore as we scan the web page when it loads
/*
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
	let i = 0;
    var linksList = document.querySelectorAll('p');
    [].forEach.call(linksList, function(header) {
    	Object.keys(corrections).forEach(function(key) {
	    	if (header.innerHTML.includes(key)){
	    		let div_id = 'div-' + i;
	    		header.style.backgroundColor = "yellow";
	    		header.outerHTML = '<div id=' + div_id + '>' + header.outerHTML + '</div>';
	    		var div = document.getElementById(div_id);
	    		div.addEventListener("mouseover", makealert);
	    		div.correct = corrections[key]
	    		div.myth = key
	    		i++;
	    	}
	    });
    });
    sendResponse({data: true, success: true});
});
*/


// when the web page is loaded then scan it
// for scanning info see the comments above of the commented listener
document.addEventListener('readystatechange', event => {

    if (event.target.readyState === "interactive") {
    }

    if (event.target.readyState === "complete") {
        	let i = 0;
		    var linksList = document.querySelectorAll('p');
		    [].forEach.call(linksList, function(header) {
		    	Object.keys(corrections).forEach(function(key) {
			    	if (header.innerHTML.includes(key)){
			    		let div_id = 'div-' + i;
			    		header.style.backgroundColor = "yellow";
			    		header.outerHTML = '<div id=' + div_id + '>' + header.outerHTML + '</div>';
			    		var div = document.getElementById(div_id);
			    		div.addEventListener("mouseover", makealert);
			    		div.correct = corrections[key]
			    		div.myth = key
			    		div.notif_id = makeid(10)
			    		i++;
			    	}
			    });
		    });
    }

});