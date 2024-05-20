const { Formatter } = require("./Formatter");

module.exports.BOLD = new Formatter(1, 22);
module.exports.FAINT = new Formatter(2, 22);
module.exports.ITALIC = new Formatter(3, 23);
module.exports.UNDERLINED = new Formatter(4, 24);
module.exports.DOUBLY_UNDERLINED = new Formatter(21, 24);
module.exports.BLINK = new Formatter(5, 25);
module.exports.CROSSED = new Formatter(9, 29);
