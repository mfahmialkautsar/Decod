import { getBit } from './getBit';

// returns an array of 1s and 0s for a 2-byte number
const getBitsFromNumber = function (number) {
	const bits = [];
	for (let i = 0; i < 16; i++) {
		bits.push(getBit(number, i));
	}
	return bits;
};

export { getBitsFromNumber };
