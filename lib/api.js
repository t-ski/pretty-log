const { Style } = require("./Style");

function makeProxy(
	target = {},
	textFrames = [],
	textFrameKeys = [],
	nestedAPI = {
		...require("./style.color"),
		...require("./style.format"),
		...require("./style.cursor")
	}
) {
	return new Proxy(target, {
		apply(_, __, strs) {
			let str = strs[0];
			for (const textFrame of textFrames) {
				str = textFrame.apply(str);
			}
			return str;
		},
		get(_, property) {
			if (typeof property !== "string") return this;

			const curAPI = nestedAPI[property.toString()];
			const curStyleKeys = textFrameKeys.concat([property]);

			if (!curAPI) throw new SyntaxError(`Unknown style ${curStyleKeys.join(".")}`);

			if (nestedAPI[property.toString()] instanceof Style) {
				return makeProxy(
					() => {},
					Object.assign([], textFrames).concat([nestedAPI[property.toString()]]),
					curStyleKeys
				);
			}

			if (!(curAPI instanceof Function)) {
				return makeProxy({}, textFrames, curStyleKeys, curAPI);
			}

			return new Proxy(() => {}, {
				apply(_, __, args) {
					const callAPI = curAPI(...args);

					return !(callAPI instanceof Style)
						? makeProxy(() => {}, textFrames, textFrameKeys, callAPI)
						: makeProxy(
								() => {},
								Object.assign([], textFrames.concat([callAPI])),
								Object.assign([], curStyleKeys)
							);
				}
			});
		}
	});
}

module.exports = makeProxy();
