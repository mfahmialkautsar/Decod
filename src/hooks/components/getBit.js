// returns a 1 or 0 for the bit in 'location'
const getBit = function (number, location) {
	return (number >> location) & 1;
};

export { getBit };
