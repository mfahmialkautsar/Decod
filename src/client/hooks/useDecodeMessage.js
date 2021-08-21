import { getNumberFromBits } from './components/getNumberFromBits';

// returns the message encoded in the CanvasPixelArray 'colors'
const useDecodeMessage = function (colors, hash, maxMessageSize = 1000) {
	// this will store the color values we've already read from
	let history = [];

	// get the message size
	const messageSize = getNumberFromBits(colors, history, hash);

	// exit early if the message is too big for the image
	if ((messageSize + 1) * 16 > colors.length * 0.75) {
		return '';
	}

	// exit early if the message is above an artificial limit
	if (messageSize === 0 || messageSize > maxMessageSize) {
		return '';
	}

	// put each character into an array
	const message = [];
	for (let i = 0; i < messageSize; i++) {
		const code = getNumberFromBits(colors, history, hash);
		message.push(String.fromCharCode(code));
	}

	// the characters should parse into valid JSON
	return message.join('');
};

export { useDecodeMessage };
