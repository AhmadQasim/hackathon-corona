function unpackVectors(data, type) {
	var jsonData = JSON.parse(LZString.decompressFromBase64(data));
	var array = tf.tensor(jsonData.vectors, jsonData.shape, type);
	return array;
}

async function fetchModel(url) {
	var response = await fetch(url);
	var data = await response.json();
	return data;
}