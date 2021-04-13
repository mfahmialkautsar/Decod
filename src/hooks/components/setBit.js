// sets the bit in 'location' to 'bit' (either a 1 or 0)
const setBit = function (number, location, bit) {
	return (number & ~(1 << location)) | (bit << location);
};

export { setBit };
