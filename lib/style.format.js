const { Style } = require("./Style");

module.exports.BOLD = new Style("1m", "22m");
module.exports.FAINT = new Style("2m", "22m");
module.exports.ITALIC = new Style("3m", "23m");
module.exports.UNDERLINE = new Style("4m", "24m");
module.exports.DOUBLY_UNDERLINE = new Style("21m", "24m");
module.exports.BLINK = new Style("5m", "25m");
module.exports.INVERT = new Style("7m", "27m");
module.exports.STRIKE = new Style("9m", "29m");
