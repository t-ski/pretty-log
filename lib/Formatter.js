module.exports.Formatter = class {
	#code;
	#closeCode;

	constructor(code, closeCode = null) {
		this.#code = code;
		this.#closeCode = closeCode;
	}

	apply(str) {
		return `${str.replace(
			new RegExp(`(^${this.#closeCode ? `|\x1b\\[${this.#closeCode}m` : ""})`, "g"),
			`$1\x1b[${this.#code}m`
		)}${this.#closeCode ? `\x1b[${this.#closeCode}m` : ""}`;
	}
};
