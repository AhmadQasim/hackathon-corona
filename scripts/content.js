// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// updated for the hackathon coronavirus on 21-22 March

// this file is injected into every page by chrome, so it works on the DOM level of the page

// the dictionary which holds the combination of our corrections
var corrections = {
	"A vaccine would help, but that could be 18 months away.": "it can take upto 12 months for the coronavirus vaccine to be here",
	"Das Virus steht weder in Zusammenhang mit Mobilfunk im Allgemeinen, noch mit dem neuen Übertragungsstandard 5G.": "5G is not related to the spread of Coronavirus",
	"wonach US-Präsident Donald Trump sich Zugriff auf das Unternehmen": "wonach US-Präsident Donald Trump sich Zugriff auf das Unternehmen sichern wolle ist nicht richtig",
	"Bis ein Impfstoff gegen das neue Coronavirus Sars-CoV-2 für den Einsatz am Patienten fertig ist, wird noch einige Zeit vergehen.": "Es wird ungefähr 6-12 Monate dauern, bis der Impfstoff fertig ist"
}


var keywords_facts = {
	0: {keywords: ['uk', 'lockdown', 'home', 'rest', 'restricted'],
		sentence: "Prime Minister Boris Johnson has closed pubs, restaurants, cafes, nightclubs, gyms, theatres, cinemas and schools, and asked members of the public to start working from home 'where they possibly can'.",
		source: "https://twitter.com/MedUni_Wien/status/1238782938344554496"
	}
}

// this function is called when the injected div is hovered upon
function makealert(evt) {
	// chrome.runtime.sendMessage({myth: evt.currentTarget.myth, correct: evt.currentTarget.correct, notif_id: evt.currentTarget.notif_id}, function(response) {
    //    console.log(response.returnMsg);
    //});

}

/*
// When the model is loaded
function modelLoaded() {
  console.log('Model Loaded!');
}

function operationDone(){

}
*/

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


// get keywords from a sentence
function getKeywords(sentence){
	var $commonWords = ['i','a','about','an','and','are','as','at','be','by','com','de','en','for','from','how','in','is','it','la','of',
	'on','or','that','the','this','to','was','what','when','where','who','will','with','und','the','www', 'if', 'then', 'would', 'too', 
	'however', 'likely', 'take', 'we', 'may', 'being', 'then', 'until', 'have', 'soon', 'said', 'now', 'had', 'there', 'do', 'so', 'if',
	'but', 'you', 'your', 'his', 'her', 'mine', 'our', 'we', 'he', 'she', 'it', 'us', 'has', 'they', 'them', 'were', 'am', 'been', 'into',
	'than', 'must', 'should', 'could', 'go', 'other', 'also', 'can', 'might', 'its', 'though'];
	var $text = sentence;
	$text = $text.toLowerCase(); // Convert to lowercase
	$text = $text.replace(/[^\w\d ]/g, ''); // replace unnesessary chars. leave only chars, numbers and space
	var result = $text.split(' ');
	result = result.filter(function (word) {
	    return $commonWords.indexOf(word) === -1;
	}); // remove $commonWords
	result = result.filter((v, i, a) => a.indexOf(v) === i); // Unique words
	return result.slice(1) // skip first word as it is often empty
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
document.addEventListener('readystatechange', event => nlpStuff(event), false);

async function nlpStuff(event){
   // console.log("tensor flow backend: ", tf.getBackend());
   // console.log("ML5 version: " + ml5.version);
	modelURL = chrome.runtime.getURL('scripts/data/word-embeddings.json');
	const model = await loadModel(modelURL);

	keywordVectors = [];

	Object.keys(keywords_facts).forEach(function(_key) {
	    var keywords = keywords_facts[_key].keywords;
	    var keywordsLength = keywords.length;
	    var sum = tf.zeros([model.codes.shape[1]*model.centroids.shape[2]]);
		for (var i = 0; i < keywordsLength; i++) {
	    	sum = tf.add(sum, model.getVector(keywords[i]));
	    };
	    sum = tf.div(sum, tf.scalar(keywordsLength));
	    keywordVectors.push(sum);
	});

	// const word2vec = ml5.word2vec(modelURL, modelLoaded);
	// console.log(word2vec.subtract(['queen', 'king'], 1, operationDone));
	if (event.target.readyState === "interactive") {
	}

	if (event.target.readyState === "complete") {
	    	let i = 0;
		    var pTags = document.querySelectorAll('p');
		    [].forEach.call(pTags, function(node) {
		    	text = node.textContent;
		    	textLength = text.length;
		    	if (textLength < 16 || textLength > 512){
		    		return; // stop processing this p tag element further if the length is between certain bounds
		    	}
		    	var sentences = text.split(".");
		    	var sentencesLength = sentences.length;
				for (var i = 0; i < sentencesLength - 1; i++) {
				    var keywords = getKeywords(sentences[i]);
				    var keywordsLength = keywords.length;
				    var sum = tf.zeros([model.codes.shape[1]*model.centroids.shape[2]]);
				    for (var j = 0; j < keywordsLength; j++) {
				    	sum = tf.add(sum, model.getVector(keywords[j]));
				    }
				    sum = tf.div(sum, tf.scalar(keywordsLength));
				    keywordVectorsLength = keywordVectors.length
				    for (var j = 0; j < keywordVectorsLength; j++) {
				    	dist = tf.losses.cosineDistance(sum, keywordVectors[j]);
				    	if (dist.dataSync() > 0.7){
				    		let div_id = 'div-' + i;
				    		node.style.backgroundColor = "#C5FFBD";
				    		// node.outerHTML = '<div id=' + div_id + '>' + node.outerHTML + '</div>';
				    		node.outerHTML = '<div id=' + div_id + ' class="tooltip">'
								+ node.outerHTML + '<span class="tooltiptext" font-family="Crimson Text"> ' +
								'<img src="https://pbs.twimg.com/profile_images/1144501389290299392/NT-KR-vT_400x400.jpg">' +
								keywords_facts[j].sentence + ' ' +
								'<a href='+ keywords_facts[j].source +' color="blue">(Quelle)</a></span></div>'
				    		var div = document.getElementById(div_id);
				    		div.addEventListener("mouseover", makealert);
				    		div.correct = keywords_facts[j].sentence
				    		div.myth = sentences[i]
				    		div.notif_id = makeid(10)
				    		i++;
				    	}
				    }
				}
				/*
		    	Object.keys(corrections).forEach(function(key) {
			    	if (node.textContent.includes(key)){
			    		let div_id = 'div-' + i;
			    		node.style.backgroundColor = "yellow";
			    		// node.outerHTML = '<div id=' + div_id + '>' + node.outerHTML + '</div>';
			    		node.outerHTML = '<div id=' + div_id + ' class="tooltip">' + node.outerHTML + '<span class="tooltiptext">' + corrections[key] + '</span></div>'
			    		var div = document.getElementById(div_id);
			    		div.addEventListener("mouseover", makealert);
			    		div.correct = corrections[key]
			    		div.myth = key
			    		div.notif_id = makeid(10)
			    		i++;
			    	}
			    }); 
			    */
		});
	}
}
