const { equal } = require("assert");


let testCaseCount = 0;
process.on("exit", (code) => !code && console.log(prettyLog.fg.GREEN(`All tests passed (${testCaseCount}).`)));
function test(actual, expected) {
    testCaseCount++;
    
    try {
        equal(actual, expected);
        console.error((testCaseCount ? prettyLog.ERASE("") : "") + prettyLog.fg.GREEN("✓"));
    } catch(err) {
        console.error(prettyLog.fg.RED("Test case failed:"));
        console.error(err);

        process.exit(1);
    }
}


const prettyLog = require("../lib/api.js");


test(prettyLog.fg.RED("Test"), "\x1b[38;2;255;0;0mTest\x1b[39m");
test(prettyLog.fg.color(255, 0, 0)("Test"), "\x1b[38;2;255;0;0mTest\x1b[39m");
test(prettyLog.fg.color("FF0000")("Test"), "\x1b[38;2;255;0;0mTest\x1b[39m");
test(prettyLog.fg.RED.fg.BLUE("Test"), "\x1b[38;2;0;0;255m\x1b[38;2;255;0;0mTest\x1b[39m\x1b[38;2;0;0;255m\x1b[39m");
test(prettyLog.UP.BOLD("Test"), "\x1B[1m\x1B[1ATest\x1B[22m");
test(prettyLog.cursor(-1, 1)("Test"), "\x1B[1D\x1B[1BTest");