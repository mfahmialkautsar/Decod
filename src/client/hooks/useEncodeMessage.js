import { getBitsFromNumber } from './components/getBitsFromNumber';
import { getMessageBits } from './components/getMessageBits';
import { getNextLocation } from './components/getNextLocation';
import { setBit } from './components/setBit';

// encodes the supplied 'message' into the CanvasPixelArray 'colors'
const useEncodeMessage = function (colors, hash, message) {
	// make an array of bits from the message
	let messageBits = getBitsFromNumber(message.length);
	messageBits = messageBits.concat(getMessageBits(message));

	// this will store the color values we've already modified
	let history = [];

	// encode the bits into the pixels
	let pos = 0;
	while (pos < messageBits.length) {
		// set the next color value to the next bit
		let loc = getNextLocation(history, hash, colors.length);
		colors[loc] = setBit(colors[loc], 0, messageBits[pos]);

		// set the alpha value in this pixel to 255
		// we have to do this because browsers do premultiplied alpha
		// see for example: http://stackoverflow.com/q/4309364
		while ((loc + 1) % 4 !== 0) {
			loc++;
		}
		colors[loc] = 255;

		pos++;
	}
};

export { useEncodeMessage };
