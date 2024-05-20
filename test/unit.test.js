const { pretty } = require("../lib/api.js");

console.log(pretty.fg.RED("Test"));
console.log(pretty.fg.RED(`Test ${pretty.bg.LIME.BOLD("Test")} Test`));
console.log(pretty.fg.RED(`Test ${pretty.BOLD(pretty.fg.LIME("Test"))} Test`));
console.log(pretty.fg.RED(`Test ${pretty.DOUBLY_UNDERLINED.BOLD(pretty.fg.color(0, 0, 255)("Test"))} Test`));