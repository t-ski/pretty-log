const prettyLog = require("./lib/api.js");

console.log(prettyLog.fg.RED("Example"));
console.log(prettyLog.fg.color("FF0000")("Example"));
console.log(prettyLog.fg.RED(`Example ${prettyLog.bg.LIME.BOLD("Example")} Example`));
console.log(prettyLog.fg.RED(`Example ${prettyLog.BOLD(prettyLog.fg.LIME("Example"))} Example`));
console.log(prettyLog.fg.RED(`Example ${prettyLog.DOUBLY_UNDERLINE.BOLD(prettyLog.fg.color(0, 0, 255)("Example"))} Example`));

const ORANGE = prettyLog.fg.ORANGE;
console.log(ORANGE("Example"));

console.log("...");
console.log(prettyLog.ERASE.fg.RED(`ERASED LAST`));

console.log("...");
console.log(prettyLog.UP.RIGHT.fg.RED(`UP RIGHT`));
console.log("...");
console.log(prettyLog.cursor(2, -1).fg.RED(`UP RIGHT(2)`));

console.log(prettyLog.STORE("---") + prettyLog.RESTORE("+++"));