const { Color } = require("./Color");
const { Formatter } = require("./Formatter");

function rgbStr(color) {
	return color.map((c) => parseInt(c.toString())).join(";");
}

function foreground(color) {
	return new Formatter(`38;2;${rgbStr(color)}`, 39);
}

function background(color) {
	return new Formatter(`48;2;${rgbStr(color)}`, 49);
}

function customFg(arg, g = null, b = null) {
	return foreground(
		/^[0-9A-F]{6}$/i.test(arg.toString())
			? arg
					.toString()
					.match(/.{2}/g)
					.map((hex) => parseInt(hex, 16))
			: !Array.isArray(arg)
				? [arg, g, b]
				: arg
	);
}

function customBg(arg, g = null, b = null) {
	return background(
		/^[0-9A-F]{6}$/i.test(arg.toString())
			? arg
					.toString()
					.match(/.{2}/g)
					.map((hex) => parseInt(hex, 16))
			: !Array.isArray(arg)
				? [arg, g, b]
				: arg
	);
}

module.exports.fg = {
	color: customFg,

	...Object.fromEntries(Object.entries(Color).map((entry) => [entry[0], foreground(entry[1])]))
};

module.exports.bg = {
	color: customBg,

	...Object.fromEntries(Object.entries(Color).map((entry) => [entry[0], background(entry[1])]))
};
