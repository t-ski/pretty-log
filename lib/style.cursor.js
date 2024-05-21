const { Style } = require("./Style");

function cursor(x, y) {
	const xInt = Math.round(x);
	const yInt = Math.round(y);
	return new Style(
		[
			xInt && !isNaN(xInt) ? `${Math.abs(xInt)}${xInt < 0 ? "D" : "C"}` : [],
			yInt && !isNaN(yInt) ? `${Math.abs(yInt)}${yInt < 0 ? "A" : "B"}` : []
		].flat()
	);
}

module.exports.cursor = cursor;
module.exports.UP = cursor(0, -1);
module.exports.DOWN = cursor(0, 1);
module.exports.LEFT = cursor(-1, 0);
module.exports.RIGHT = cursor(1, 0);

module.exports.CLEAR = new Style("2K\r");
module.exports.ERASE = new Style(["2K\r", "1A", "2K\r"]);
module.exports.STORE = new Style("s");
module.exports.RESTORE = new Style("u");
