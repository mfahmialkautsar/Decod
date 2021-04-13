import { getNextLocation } from './getNextLocation';
import { getBit } from './getBit';
import { setBit } from './setBit';

// returns the next 2-byte number
const getNumberFromBits = function (bytes, history, hash) {
	let number = 0,
		pos = 0;
	while (pos < 16) {
		const loc = getNextLocation(history, hash, bytes.length);
		const bit = getBit(bytes[loc], 0);
		number = setBit(number, pos, bit);
		pos++;
	}
	return number;
};

export { getNumberFromBits };
