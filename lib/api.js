const { Formatter } = require("./Formatter");

const formatterAPI = {
	...require("./text"),
	...require("./highlight")
};

function makeProxy(target = {}, formatters = [], formatterKeys = [], nestedAPI = formatterAPI) {
	return new Proxy(target, {
		apply(_, __, strs) {
			let str = strs[0];
			for (const formatter of formatters) {
				str = formatter.apply(str);
			}
			return str;
		},
		get(_, property) {
			if (typeof property !== "string") return this;

			const curAPI = nestedAPI[property.toString()];
			const curFormatterKeys = formatterKeys.concat([property]);

			if (!curAPI) throw new SyntaxError(`Unknown formatter ${curFormatterKeys.join(".")}`);

			if (nestedAPI[property.toString()] instanceof Formatter) {
				return makeProxy(
					() => {},
					Object.assign([], formatters).concat([nestedAPI[property.toString()]]),
					curFormatterKeys
				);
			}

			if (!(curAPI instanceof Function)) {
				return makeProxy({}, formatters, curFormatterKeys, curAPI);
			}

			return new Proxy(() => {}, {
				apply(_, __, args) {
					const callAPI = curAPI(...args);

					return !(callAPI instanceof Formatter)
						? makeProxy(() => {}, formatters, formatterKeys, callAPI)
						: makeProxy(
								() => {},
								Object.assign([], formatters.concat([callAPI])),
								Object.assign([], curFormatterKeys)
							);
				},
				get() {
					throw new SyntaxError("Formatter must be called");
				}
			});
		}
	});
}

module.exports.pretty = makeProxy();
module.exports.format = makeProxy();

module.exports.Color = require("./Color.js").Color;
