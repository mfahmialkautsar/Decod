// gets the next location to store a bit
const getNextLocation = function (history, hash, total) {
	const pos = history.length;
	let loc = Math.abs(hash[pos % hash.length] * (pos + 1)) % total;
	while (true) {
		if (loc >= total) {
			loc = 0;
		} else if (history.indexOf(loc) >= 0) {
			loc++;
		} else if ((loc + 1) % 4 === 0) {
			loc++;
		} else {
			history.push(loc);
			return loc;
		}
	}
};

export { getNextLocation };
