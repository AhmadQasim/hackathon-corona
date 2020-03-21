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
function makealert(evt) {
	chrome.runtime.sendMessage({myth: evt.currentTarget.myth, correct: evt.currentTarget.correct}, function(response) {
        console.log(response.returnMsg);
    });
}

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
	let i = 0;
    var linksList = document.querySelectorAll('span.css-901oao');
    [].forEach.call(linksList, function(header) {
    	Object.keys(corrections).forEach(function(key) {
	    	if (header.innerHTML.includes(key)){
	    		let div_id = 'div-' + i;
	    		header.style.backgroundColor = "yellow";
	    		header.outerHTML = '<div id=' + div_id + '>' + header.outerHTML + '</div>';
	    		// header.outerHTML = '<a href="#" data-toggle="tooltip" title="Some tooltip text!">' + header.outerHTML + '</a>'
	    		// header.outerHTML = '<div class="tooltip">' + header.outerHTML + '<span class="tooltiptext">Tooltip text</span> </div>';
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