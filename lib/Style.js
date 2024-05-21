module.exports.Style = class {
	#code;
	#closeCode;

	constructor(codes, closeCode = null) {
		this.#code = [codes]
			.flat()
			.map((code) => this.#toAnsi(code))
			.join("");
		this.#closeCode = closeCode;
	}

	#toAnsi(code) {
		return `\x1b[${code}`;
	}

	apply(str) {
		return `${(!str.replace ? str.toString() : str).replace(
			new RegExp(`(^${this.#closeCode ? `|\x1b\\[${this.#closeCode}` : ""})`, "g"),
			`$1${this.#code}`
		)}${this.#closeCode ? this.#toAnsi(this.#closeCode) : ""}`;
	}
};
