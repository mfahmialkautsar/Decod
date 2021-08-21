import { getBitsFromNumber } from './getBitsFromNumber';

// returns an array of 1s and 0s for the string 'message'
const getMessageBits = function (message) {
	let messageBits = [];
	for (let i = 0; i < message.length; i++) {
		const code = message.charCodeAt(i);
		messageBits = messageBits.concat(getBitsFromNumber(code));
	}
	return messageBits;
};

export { getMessageBits };
