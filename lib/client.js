window.__ModuleLoader__.load({
	id: "dsh-liquid-glass-fluid-background",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react_jsx_runtime = require("react/jsx-runtime");
		let _deepseek_ai_dsh_client_runtime_client = require("@deepseek-ai/dsh-client-runtime/client");
		//#region ../../../node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs
		function r(e) {
			var t, f, n = "";
			if ("string" == typeof e || "number" == typeof e) n += e;
			else if ("object" == typeof e) if (Array.isArray(e)) {
				var o = e.length;
				for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
			} else for (f in e) e[f] && (n && (n += " "), n += f);
			return n;
		}
		function clsx() {
			for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
			return n;
		}
		//#endregion
		//#region ../../../vendor/cosmokit/src/misc.ts
		/** Return true when a value is `null` or `undefined`. */
		function isNullable(value) {
			return value === null || value === void 0;
		}
		/** Return true for non-array object values. */
		function isPlainObject(data) {
			return data && typeof data === "object" && !Array.isArray(data);
		}
		/** Filter object entries and return a new object. */
		function filterKeys(object, filter) {
			return Object.fromEntries(Object.entries(object).filter(([key, value]) => filter(key, value)));
		}
		/** Map object values while preserving the original key set. */
		function mapValues(object, transform) {
			return Object.fromEntries(Object.entries(object).map(([key, value]) => [key, transform(value, key)]));
		}
		/** Pick selected keys from an object, optionally including `undefined` values. */
		function pick(source, keys, forced) {
			if (!keys) return { ...source };
			const result = {};
			for (const key of keys) if (forced || source[key] !== void 0) result[key] = source[key];
			return result;
		}
		//#endregion
		//#region ../../../vendor/cosmokit/src/types.ts
		/** Test values using `instanceof` with a `toStringTag` fallback. */
		function is(type, value) {
			if (arguments.length === 1) return (value) => is(type, value);
			return type in globalThis && value instanceof globalThis[type] || Object.prototype.toString.call(value).slice(8, -1) === type;
		}
		function isArrayBufferLike(value) {
			return is("ArrayBuffer", value) || is("SharedArrayBuffer", value);
		}
		function isArrayBufferSource(value) {
			return isArrayBufferLike(value) || ArrayBuffer.isView(value);
		}
		let Binary;
		(function(_Binary) {
			_Binary.is = isArrayBufferLike;
			_Binary.isSource = isArrayBufferSource;
			function fromSource(source) {
				if (ArrayBuffer.isView(source)) return source.buffer.slice(source.byteOffset, source.byteOffset + source.byteLength);
				else return source;
			}
			_Binary.fromSource = fromSource;
			function toBase64(source) {
				source = fromSource(source);
				if (typeof Buffer !== "undefined") return Buffer.from(source).toString("base64");
				let binary = "";
				const bytes = new Uint8Array(source);
				for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
				return btoa(binary);
			}
			_Binary.toBase64 = toBase64;
			function fromBase64(source) {
				if (typeof Buffer !== "undefined") return fromSource(Buffer.from(source, "base64"));
				return Uint8Array.from(atob(source), (c) => c.charCodeAt(0));
			}
			_Binary.fromBase64 = fromBase64;
			function toHex(source) {
				source = fromSource(source);
				if (typeof Buffer !== "undefined") return Buffer.from(source).toString("hex");
				return Array.from(new Uint8Array(source), (byte) => byte.toString(16).padStart(2, "0")).join("");
			}
			_Binary.toHex = toHex;
			function fromHex(source) {
				if (typeof Buffer !== "undefined") return fromSource(Buffer.from(source, "hex"));
				const hex = source.length % 2 === 0 ? source : source.slice(0, source.length - 1);
				const buffer = [];
				for (let i = 0; i < hex.length; i += 2) buffer.push(parseInt(`${hex[i]}${hex[i + 1]}`, 16));
				return Uint8Array.from(buffer).buffer;
			}
			_Binary.fromHex = fromHex;
		})(Binary || (Binary = {}));
		Binary.fromBase64;
		Binary.toBase64;
		Binary.fromHex;
		Binary.toHex;
		/** Deep-clone common JavaScript values while preserving prototypes and cycles. */
		function clone(source, refs = /* @__PURE__ */ new Map()) {
			if (!source || typeof source !== "object") return source;
			if (is("Date", source)) return new Date(source.valueOf());
			if (is("RegExp", source)) return new RegExp(source.source, source.flags);
			if (isArrayBufferLike(source)) return source.slice(0);
			if (ArrayBuffer.isView(source)) return source.buffer.slice(source.byteOffset, source.byteOffset + source.byteLength);
			const cached = refs.get(source);
			if (cached) return cached;
			if (Array.isArray(source)) {
				const result = [];
				refs.set(source, result);
				source.forEach((value, index) => {
					result[index] = Reflect.apply(clone, null, [value, refs]);
				});
				return result;
			}
			const result = Object.create(Object.getPrototypeOf(source));
			refs.set(source, result);
			for (const key of Reflect.ownKeys(source)) {
				const descriptor = { ...Reflect.getOwnPropertyDescriptor(source, key) };
				if ("value" in descriptor) descriptor.value = Reflect.apply(clone, null, [descriptor.value, refs]);
				Reflect.defineProperty(result, key, descriptor);
			}
			return result;
		}
		/** Deeply compare arrays, dates, regexps, buffers, and plain object fields. */
		function deepEqual(a, b, strict) {
			if (a === b) return true;
			if (!strict && isNullable(a) && isNullable(b)) return true;
			if (typeof a !== typeof b) return false;
			if (typeof a !== "object") return false;
			if (!a || !b) return false;
			function check(test, then) {
				return test(a) ? test(b) ? then(a, b) : false : test(b) ? false : void 0;
			}
			return check(Array.isArray, (a, b) => a.length === b.length && a.every((item, index) => deepEqual(item, b[index]))) ?? check(is("Date"), (a, b) => a.valueOf() === b.valueOf()) ?? check(is("RegExp"), (a, b) => a.source === b.source && a.flags === b.flags) ?? check(isArrayBufferLike, (a, b) => {
				if (a.byteLength !== b.byteLength) return false;
				const viewA = new Uint8Array(a);
				const viewB = new Uint8Array(b);
				for (let i = 0; i < viewA.length; i++) if (viewA[i] !== viewB[i]) return false;
				return true;
			}) ?? Object.keys({
				...a,
				...b
			}).every((key) => deepEqual(a[key], b[key], strict));
		}
		//#endregion
		//#region ../../../vendor/cosmokit/src/time.ts
		let Time;
		(function(_Time) {
			_Time.millisecond = 1;
			const second = _Time.second = 1e3;
			const minute = _Time.minute = second * 60;
			const hour = _Time.hour = minute * 60;
			const day = _Time.day = hour * 24;
			const week = _Time.week = day * 7;
			let timezoneOffset = (/* @__PURE__ */ new Date()).getTimezoneOffset();
			function setTimezoneOffset(offset) {
				timezoneOffset = offset;
			}
			_Time.setTimezoneOffset = setTimezoneOffset;
			function getTimezoneOffset() {
				return timezoneOffset;
			}
			_Time.getTimezoneOffset = getTimezoneOffset;
			function getDateNumber(date = /* @__PURE__ */ new Date(), offset) {
				if (typeof date === "number") date = new Date(date);
				if (offset === void 0) offset = timezoneOffset;
				return Math.floor((date.valueOf() / minute - offset) / 1440);
			}
			_Time.getDateNumber = getDateNumber;
			function fromDateNumber(value, offset) {
				const date = new Date(value * day);
				if (offset === void 0) offset = timezoneOffset;
				return new Date(+date + offset * minute);
			}
			_Time.fromDateNumber = fromDateNumber;
			const numeric = /\d+(?:\.\d+)?/.source;
			const timeRegExp = new RegExp(`^${[
				"w(?:eek(?:s)?)?",
				"d(?:ay(?:s)?)?",
				"h(?:our(?:s)?)?",
				"m(?:in(?:ute)?(?:s)?)?",
				"s(?:ec(?:ond)?(?:s)?)?"
			].map((unit) => `(${numeric}${unit})?`).join("")}$`);
			function parseTime(source) {
				const capture = timeRegExp.exec(source);
				if (!capture) return 0;
				return (parseFloat(capture[1]) * week || 0) + (parseFloat(capture[2]) * day || 0) + (parseFloat(capture[3]) * hour || 0) + (parseFloat(capture[4]) * minute || 0) + (parseFloat(capture[5]) * second || 0);
			}
			_Time.parseTime = parseTime;
			function parseDate(date) {
				const parsed = parseTime(date);
				if (parsed) date = Date.now() + parsed;
				else if (/^\d{1,2}(:\d{1,2}){1,2}$/.test(date)) date = `${(/* @__PURE__ */ new Date()).toLocaleDateString()}-${date}`;
				else if (/^\d{1,2}-\d{1,2}-\d{1,2}(:\d{1,2}){1,2}$/.test(date)) date = `${(/* @__PURE__ */ new Date()).getFullYear()}-${date}`;
				return date ? new Date(date) : /* @__PURE__ */ new Date();
			}
			_Time.parseDate = parseDate;
			function format(ms) {
				const abs = Math.abs(ms);
				if (abs >= day - hour / 2) return Math.round(ms / day) + "d";
				else if (abs >= hour - minute / 2) return Math.round(ms / hour) + "h";
				else if (abs >= minute - second / 2) return Math.round(ms / minute) + "m";
				else if (abs >= second) return Math.round(ms / second) + "s";
				return ms + "ms";
			}
			_Time.format = format;
			function toDigits(source, length = 2) {
				return source.toString().padStart(length, "0");
			}
			_Time.toDigits = toDigits;
			function template(template, time = /* @__PURE__ */ new Date()) {
				return template.replace("yyyy", time.getFullYear().toString()).replace("yy", time.getFullYear().toString().slice(2)).replace("MM", toDigits(time.getMonth() + 1)).replace("dd", toDigits(time.getDate())).replace("hh", toDigits(time.getHours())).replace("mm", toDigits(time.getMinutes())).replace("ss", toDigits(time.getSeconds())).replace("SSS", toDigits(time.getMilliseconds(), 3));
			}
			_Time.template = template;
		})(Time || (Time = {}));
		//#endregion
		//#region ../../../vendor/schemastery/src/index.ts
		const kSchema = Symbol.for("schemastery");
		const kValidationError = Symbol.for("ValidationError");
		globalThis.__schemastery_index__ ??= 0;
		globalThis.__schemastery_refs__ = void 0;
		var ValidationError = class extends TypeError {
			options;
			name = "ValidationError";
			constructor(message, options) {
				let prefix = "$";
				for (const segment of options.path || []) if (typeof segment === "string") prefix += "." + segment;
				else if (typeof segment === "number") prefix += "[" + segment + "]";
				else if (typeof segment === "symbol") prefix += `[Symbol(${segment.toString()})]`;
				if (prefix.startsWith(".")) prefix = prefix.slice(1);
				super((prefix === "$" ? "" : `${prefix} `) + message);
				this.options = options;
			}
			static is(error) {
				return !!error?.[kValidationError];
			}
		};
		Object.defineProperty(ValidationError.prototype, kValidationError, { value: true });
		const Schema = function(options) {
			const schema = function(data, options = {}) {
				return Schema.resolve(data, schema, options)[0];
			};
			if (options.refs) {
				const refs = mapValues(options.refs, (options) => new Schema(options));
				const getRef = (uid) => refs[uid];
				for (const key in refs) {
					const options = refs[key];
					options.sKey = getRef(options.sKey);
					options.inner = getRef(options.inner);
					options.list = options.list && options.list.map(getRef);
					options.dict = options.dict && mapValues(options.dict, getRef);
				}
				return refs[options.uid];
			}
			Object.assign(schema, options);
			if (typeof schema.callback === "string") try {
				schema.callback = new Function("return " + schema.callback)();
			} catch {}
			Object.defineProperty(schema, "uid", { value: globalThis.__schemastery_index__++ });
			Object.setPrototypeOf(schema, Schema.prototype);
			schema.meta ||= {};
			schema.toString = schema.toString.bind(schema);
			return schema;
		};
		Schema.prototype = Object.create(Function.prototype);
		Schema.prototype[kSchema] = true;
		Object.defineProperty(Schema.prototype, "~standard", { get() {
			return {
				version: 1,
				vendor: "schemastery",
				validate: (value) => {
					try {
						return { value: Schema.resolve(value, this, {})[0] };
					} catch (error) {
						if (ValidationError.is(error)) return { issues: [{
							message: error.message,
							path: error.options.path
						}] };
						throw error;
					}
				}
			};
		} });
		Schema.ValidationError = ValidationError;
		Schema.prototype.toJSON = function toJSON() {
			if (globalThis.__schemastery_refs__) {
				globalThis.__schemastery_refs__[this.uid] ??= JSON.parse(JSON.stringify({ ...this }));
				return this.uid;
			}
			globalThis.__schemastery_refs__ = { [this.uid]: { ...this } };
			globalThis.__schemastery_refs__[this.uid] = JSON.parse(JSON.stringify({ ...this }));
			const result = {
				uid: this.uid,
				refs: globalThis.__schemastery_refs__
			};
			globalThis.__schemastery_refs__ = void 0;
			return result;
		};
		Schema.prototype.set = function set(key, value) {
			this.dict[key] = value;
			return this;
		};
		Schema.prototype.push = function push(value) {
			this.list.push(value);
			return this;
		};
		function mergeDesc(original, messages) {
			const result = typeof original === "string" ? { "": original } : { ...original };
			for (const locale in messages) {
				const value = messages[locale];
				if (value?.$description || value?.$desc) result[locale] = value.$description || value.$desc;
				else if (typeof value === "string") result[locale] = value;
			}
			return result;
		}
		function getInner(value) {
			return value?.$value ?? value?.$inner;
		}
		function extractKeys(data) {
			return filterKeys(data ?? {}, (key) => !key.startsWith("$"));
		}
		Schema.prototype.i18n = function i18n(messages) {
			const schema = Schema(this);
			const desc = mergeDesc(schema.meta.description, messages);
			if (Object.keys(desc).length) schema.meta.description = desc;
			if (schema.dict) schema.dict = mapValues(schema.dict, (inner, key) => {
				return inner.i18n(mapValues(messages, (data) => getInner(data)?.[key] ?? data?.[key]));
			});
			if (schema.list) schema.list = schema.list.map((inner, index) => {
				return inner.i18n(mapValues(messages, (data = {}) => {
					if (Array.isArray(getInner(data))) return getInner(data)[index];
					if (Array.isArray(data)) return data[index];
					return extractKeys(data);
				}));
			});
			if (schema.inner) schema.inner = schema.inner.i18n(mapValues(messages, (data) => {
				if (getInner(data)) return getInner(data);
				return extractKeys(data);
			}));
			if (schema.sKey) schema.sKey = schema.sKey.i18n(mapValues(messages, (data) => data?.$key));
			return schema;
		};
		Schema.prototype.extra = function extra(key, value) {
			const schema = Schema(this);
			schema.meta = {
				...schema.meta,
				[key]: value
			};
			return schema;
		};
		for (const key of [
			"required",
			"disabled",
			"collapse",
			"hidden",
			"loose"
		]) Object.assign(Schema.prototype, { [key](value = true) {
			const schema = Schema(this);
			schema.meta = {
				...schema.meta,
				[key]: value
			};
			return schema;
		} });
		Schema.prototype.deprecated = function deprecated() {
			const schema = Schema(this);
			schema.meta.badges ||= [];
			schema.meta.badges.push({
				text: "deprecated",
				type: "danger"
			});
			return schema;
		};
		Schema.prototype.experimental = function experimental() {
			const schema = Schema(this);
			schema.meta.badges ||= [];
			schema.meta.badges.push({
				text: "experimental",
				type: "warning"
			});
			return schema;
		};
		Schema.prototype.pattern = function pattern(regexp) {
			const schema = Schema(this);
			const pattern = pick(regexp, ["source", "flags"]);
			schema.meta = {
				...schema.meta,
				pattern
			};
			return schema;
		};
		Schema.prototype.simplify = function simplify(value) {
			if (deepEqual(value, this.meta.default, this.type === "dict")) return null;
			if (isNullable(value)) return value;
			if (this.type === "object" || this.type === "dict") {
				const result = {};
				for (const key in value) {
					const item = (this.type === "object" ? this.dict[key] : this.inner)?.simplify(value[key]);
					if (this.type === "dict" || !isNullable(item)) result[key] = item;
				}
				if (deepEqual(result, this.meta.default, this.type === "dict")) return null;
				return result;
			} else if (this.type === "array" || this.type === "tuple") {
				const result = [];
				value.forEach((value, index) => {
					const schema = this.type === "array" ? this.inner : this.list[index];
					const item = schema ? schema.simplify(value) : value;
					result.push(item);
				});
				return result;
			} else if (this.type === "intersect") {
				const result = {};
				for (const item of this.list) Object.assign(result, item.simplify(value));
				return result;
			} else if (this.type === "union") for (const schema of this.list) try {
				Schema.resolve(value, schema, {});
				return schema.simplify(value);
			} catch {}
			return value;
		};
		Schema.prototype.toString = function toString(inline) {
			return formatters[this.type]?.(this, inline) ?? `Schema<${this.type}>`;
		};
		Schema.prototype.role = function role(role, extra) {
			const schema = Schema(this);
			schema.meta = {
				...schema.meta,
				role,
				extra
			};
			return schema;
		};
		for (const key of [
			"default",
			"link",
			"comment",
			"description",
			"max",
			"min",
			"step"
		]) Object.assign(Schema.prototype, { [key](value) {
			const schema = Schema(this);
			schema.meta = {
				...schema.meta,
				[key]: value
			};
			return schema;
		} });
		const resolvers = {};
		Schema.extend = function extend(type, resolve) {
			resolvers[type] = resolve;
		};
		Schema.resolve = function resolve(data, schema, options = {}, strict = false) {
			if (!schema) return [data];
			if (options.ignore?.(data, schema)) return [data];
			if (isNullable(data) && schema.type !== "lazy") {
				if (schema.meta.required) throw new ValidationError(`missing required value`, options);
				let current = schema;
				let fallback = schema.meta.default;
				while (current?.type === "intersect" && isNullable(fallback)) {
					current = current.list[0];
					fallback = current?.meta.default;
				}
				if (isNullable(fallback)) return [data];
				data = clone(fallback);
			}
			const callback = resolvers[schema.type];
			if (!callback) throw new ValidationError(`unsupported type "${schema.type}"`, options);
			try {
				return callback(data, schema, options, strict);
			} catch (error) {
				if (!schema.meta.loose) throw error;
				return [schema.meta.default];
			}
		};
		Schema.from = function from(source) {
			if (isNullable(source)) return Schema.any();
			else if ([
				"string",
				"number",
				"boolean"
			].includes(typeof source)) return Schema.const(source).required();
			else if (source[kSchema]) return source;
			else if (typeof source === "function") switch (source) {
				case String: return Schema.string().required();
				case Number: return Schema.number().required();
				case Boolean: return Schema.boolean().required();
				case Function: return Schema.function().required();
				default: return Schema.is(source).required();
			}
			else throw new TypeError(`cannot infer schema from ${source}`);
		};
		Schema.lazy = function lazy(builder) {
			const toJSON = () => {
				if (!schema.inner[kSchema]) {
					schema.inner = schema.builder();
					schema.inner.meta = {
						...schema.meta,
						...schema.inner.meta
					};
				}
				return schema.inner.toJSON();
			};
			const schema = new Schema({
				type: "lazy",
				builder,
				inner: { toJSON }
			});
			return schema;
		};
		Schema.natural = function natural() {
			return Schema.number().step(1).min(0);
		};
		Schema.percent = function percent() {
			return Schema.number().step(.01).min(0).max(1).role("slider");
		};
		Schema.date = function date() {
			return Schema.union([Schema.is(Date), Schema.transform(Schema.string().role("datetime"), (value, options) => {
				const date = new Date(value);
				if (isNaN(+date)) throw new ValidationError(`invalid date "${value}"`, options);
				return date;
			}, true)]);
		};
		Schema.regExp = function regExp(flag = "") {
			return Schema.union([Schema.is(RegExp), Schema.transform(Schema.string().role("regexp", { flag }), (value, options) => {
				try {
					return new RegExp(value, flag);
				} catch (e) {
					throw new ValidationError(e.message, options);
				}
			}, true)]);
		};
		Schema.arrayBuffer = function arrayBuffer(encoding) {
			return Schema.union([
				Schema.is(ArrayBuffer),
				Schema.is(SharedArrayBuffer),
				Schema.transform(Schema.any(), (value, options) => {
					if (Binary.isSource(value)) return Binary.fromSource(value);
					throw new ValidationError(`expected ArrayBufferSource but got ${value}`, options);
				}, true),
				...encoding ? [Schema.transform(Schema.string(), (value, options) => {
					try {
						return encoding === "base64" ? Binary.fromBase64(value) : Binary.fromHex(value);
					} catch (e) {
						throw new ValidationError(e.message, options);
					}
				}, true)] : []
			]);
		};
		Schema.extend("lazy", (data, schema, options, strict) => {
			if (!schema.inner[kSchema]) {
				schema.inner = schema.builder();
				schema.inner.meta = {
					...schema.meta,
					...schema.inner.meta
				};
			}
			return Schema.resolve(data, schema.inner, options, strict);
		});
		Schema.extend("any", (data) => {
			return [data];
		});
		Schema.extend("never", (data, _, options) => {
			throw new ValidationError(`expected nullable but got ${data}`, options);
		});
		Schema.extend("const", (data, { value }, options) => {
			if (deepEqual(data, value)) return [value];
			throw new ValidationError(`expected ${value} but got ${data}`, options);
		});
		function checkWithinRange(data, meta, description, options, skipMin = false) {
			const { max = Infinity, min = -Infinity } = meta;
			if (data > max) throw new ValidationError(`expected ${description} <= ${max} but got ${data}`, options);
			if (data < min && !skipMin) throw new ValidationError(`expected ${description} >= ${min} but got ${data}`, options);
		}
		Schema.extend("string", (data, { meta }, options) => {
			if (typeof data !== "string") throw new ValidationError(`expected string but got ${data}`, options);
			if (meta.pattern) {
				const regexp = new RegExp(meta.pattern.source, meta.pattern.flags);
				if (!regexp.test(data)) throw new ValidationError(`expect string to match regexp ${regexp}`, options);
			}
			checkWithinRange(data.length, meta, "string length", options);
			return [data];
		});
		function decimalShift(data, digits) {
			const str = data.toString();
			if (str.includes("e")) return data * Math.pow(10, digits);
			const index = str.indexOf(".");
			if (index === -1) return data * Math.pow(10, digits);
			const frac = str.slice(index + 1);
			const integer = str.slice(0, index);
			if (frac.length <= digits) return +(integer + frac.padEnd(digits, "0"));
			return +(integer + frac.slice(0, digits) + "." + frac.slice(digits));
		}
		function isMultipleOf(data, min, step) {
			step = Math.abs(step);
			if (!/^\d+\.\d+$/.test(step.toString())) return (data - min) % step === 0;
			const index = step.toString().indexOf(".");
			const digits = step.toString().slice(index + 1).length;
			return Math.abs(decimalShift(data, digits) - decimalShift(min, digits)) % decimalShift(step, digits) === 0;
		}
		Schema.extend("number", (data, { meta }, options) => {
			if (typeof data !== "number") throw new ValidationError(`expected number but got ${data}`, options);
			checkWithinRange(data, meta, "number", options);
			const { step } = meta;
			if (step && !isMultipleOf(data, meta.min ?? 0, step)) throw new ValidationError(`expected number multiple of ${step} but got ${data}`, options);
			return [data];
		});
		Schema.extend("boolean", (data, _, options) => {
			if (typeof data === "boolean") return [data];
			throw new ValidationError(`expected boolean but got ${data}`, options);
		});
		Schema.extend("bitset", (data, { bits, meta }, options) => {
			let value = 0, keys = [];
			if (typeof data === "number") {
				value = data;
				for (const key in bits) if (data & bits[key]) keys.push(key);
			} else if (Array.isArray(data)) {
				keys = data;
				for (const key of keys) {
					if (typeof key !== "string") throw new ValidationError(`expected string but got ${key}`, options);
					if (key in bits) value |= bits[key];
				}
			} else throw new ValidationError(`expected number or array but got ${data}`, options);
			if (value === meta.default) return [value];
			return [value, keys];
		});
		Schema.extend("function", (data, _, options) => {
			if (typeof data === "function") return [data];
			throw new ValidationError(`expected function but got ${data}`, options);
		});
		Schema.extend("is", (data, { constructor }, options) => {
			if (typeof constructor === "function") {
				if (data instanceof constructor) return [data];
				throw new ValidationError(`expected ${constructor.name} but got ${data}`, options);
			} else {
				if (isNullable(data)) throw new ValidationError(`expected ${constructor} but got ${data}`, options);
				let prototype = Object.getPrototypeOf(data);
				while (prototype) {
					if (prototype.constructor?.name === constructor) return [data];
					prototype = Object.getPrototypeOf(prototype);
				}
				throw new ValidationError(`expected ${constructor} but got ${data}`, options);
			}
		});
		function property(data, key, schema, options) {
			try {
				const [value, adapted] = Schema.resolve(data[key], schema, {
					...options,
					path: [...options.path || [], key]
				});
				if (adapted !== void 0) data[key] = adapted;
				return value;
			} catch (e) {
				if (!options?.autofix) throw e;
				delete data[key];
				return schema.meta.default;
			}
		}
		Schema.extend("array", (data, { inner, meta }, options) => {
			if (!Array.isArray(data)) throw new ValidationError(`expected array but got ${data}`, options);
			checkWithinRange(data.length, meta, "array length", options, !isNullable(inner.meta.default));
			return [data.map((_, index) => property(data, index, inner, options))];
		});
		Schema.extend("dict", (data, { inner, sKey }, options, strict) => {
			if (!isPlainObject(data)) throw new ValidationError(`expected object but got ${data}`, options);
			const result = {};
			for (const key in data) {
				let rKey;
				try {
					rKey = Schema.resolve(key, sKey, options)[0];
				} catch (error) {
					if (strict) continue;
					throw error;
				}
				result[rKey] = property(data, key, inner, options);
				data[rKey] = data[key];
				if (key !== rKey) delete data[key];
			}
			return [result];
		});
		Schema.extend("tuple", (data, { list }, options, strict) => {
			if (!Array.isArray(data)) throw new ValidationError(`expected array but got ${data}`, options);
			const result = list.map((inner, index) => property(data, index, inner, options));
			if (strict) return [result];
			result.push(...data.slice(list.length));
			return [result];
		});
		function merge(result, data) {
			for (const key in data) {
				if (key in result) continue;
				result[key] = data[key];
			}
		}
		Schema.extend("object", (data, { dict }, options, strict) => {
			if (!isPlainObject(data)) throw new ValidationError(`expected object but got ${data}`, options);
			const result = {};
			for (const key in dict) {
				const value = property(data, key, dict[key], options);
				if (!isNullable(value) || key in data) result[key] = value;
			}
			if (!strict) merge(result, data);
			return [result];
		});
		Schema.extend("union", (data, { list, toString }, options, strict) => {
			const messages = [];
			for (const inner of list) try {
				return Schema.resolve(data, inner, options, strict);
			} catch (error) {
				messages.push(error);
			}
			throw new ValidationError(`expected ${toString()} but got ${JSON.stringify(data)}`, options);
		});
		Schema.extend("intersect", (data, { list, toString }, options, strict) => {
			if (!list.length) return [data];
			let result;
			for (const inner of list) {
				const value = Schema.resolve(data, inner, options, true)[0];
				if (isNullable(value)) continue;
				if (isNullable(result)) result = value;
				else if (typeof result !== typeof value) throw new ValidationError(`expected ${toString()} but got ${JSON.stringify(data)}`, options);
				else if (typeof value === "object") merge(result ??= {}, value);
				else if (result !== value) throw new ValidationError(`expected ${toString()} but got ${JSON.stringify(data)}`, options);
			}
			if (!strict && isPlainObject(data)) merge(result, data);
			return [result];
		});
		Schema.extend("transform", (data, { inner, callback, preserve }, options) => {
			const [result, adapted = data] = Schema.resolve(data, inner, options, true);
			if (preserve) return [callback(result)];
			else return [callback(result), callback(adapted)];
		});
		const formatters = {};
		function defineMethod(name, keys, format) {
			formatters[name] = format;
			Object.assign(Schema, { [name](...args) {
				const schema = new Schema({ type: name });
				keys.forEach((key, index) => {
					switch (key) {
						case "sKey":
							schema.sKey = args[index] ?? Schema.string();
							break;
						case "inner":
							schema.inner = Schema.from(args[index]);
							break;
						case "list":
							schema.list = args[index].map(Schema.from);
							break;
						case "dict":
							schema.dict = mapValues(args[index], Schema.from);
							break;
						case "bits":
							schema.bits = {};
							for (const key in args[index]) {
								if (typeof args[index][key] !== "number") continue;
								schema.bits[key] = args[index][key];
							}
							break;
						case "callback": {
							const callback = schema.callback = args[index];
							callback["toJSON"] ||= () => callback.toString();
							break;
						}
						case "constructor": {
							const constructor = schema.constructor = args[index];
							if (typeof constructor === "function") constructor["toJSON"] ||= () => constructor["name"];
							break;
						}
						default: schema[key] = args[index];
					}
				});
				if (name === "object" || name === "dict") schema.meta.default = {};
				else if (name === "array" || name === "tuple") schema.meta.default = [];
				else if (name === "bitset") schema.meta.default = 0;
				return schema;
			} });
		}
		defineMethod("is", ["constructor"], ({ constructor }) => {
			if (typeof constructor === "function") return constructor.name;
			else return constructor;
		});
		defineMethod("any", [], () => "any");
		defineMethod("never", [], () => "never");
		defineMethod("const", ["value"], ({ value }) => typeof value === "string" ? JSON.stringify(value) : value);
		defineMethod("string", [], () => "string");
		defineMethod("number", [], () => "number");
		defineMethod("boolean", [], () => "boolean");
		defineMethod("bitset", ["bits"], () => "bitset");
		defineMethod("function", [], () => "function");
		defineMethod("array", ["inner"], ({ inner }) => `${inner.toString(true)}[]`);
		defineMethod("dict", ["inner", "sKey"], ({ inner, sKey }) => `{ [key: ${sKey.toString()}]: ${inner.toString()} }`);
		defineMethod("tuple", ["list"], ({ list }) => `[${list.map((inner) => inner.toString()).join(", ")}]`);
		defineMethod("object", ["dict"], ({ dict }) => {
			if (Object.keys(dict).length === 0) return "{}";
			return `{ ${Object.entries(dict).map(([key, inner]) => {
				return `${key}${inner.meta.required ? "" : "?"}: ${inner.toString()}`;
			}).join(", ")} }`;
		});
		defineMethod("union", ["list"], ({ list }, inline) => {
			const result = list.map(({ toString: format }) => format()).join(" | ");
			return inline ? `(${result})` : result;
		});
		defineMethod("intersect", ["list"], ({ list }) => {
			return `${list.map((inner) => inner.toString(true)).join(" & ")}`;
		});
		defineMethod("transform", [
			"inner",
			"callback",
			"preserve"
		], ({ inner }, isInner) => inner.toString(isInner));
		//#endregion
		//#region src/glass-settings.ts
		/** Liquid-glass preference stored in the Host user-settings document. */
		/** Settings namespace owned by the liquid-glass overlay plugin. */
		const GLASS_SETTINGS_NAMESPACE = "ui-theme-liquid-glass";
		/** Field carrying whether the overlay is on. */
		const GLASS_ENABLED_FIELD = "enabled";
		/** Backdrop blur in CSS pixels. */
		const GLASS_BLUR_FIELD = "blurPx";
		/** Backdrop saturation percent. */
		const GLASS_SATURATE_FIELD = "saturatePct";
		/** SVG displacement scale in CSS pixels. */
		const GLASS_DISPLACE_FIELD = "displace";
		/** Chromatic-aberration intensity. */
		const GLASS_ABERRATION_FIELD = "aberration";
		/** Column and header corner radius in CSS pixels. */
		const GLASS_RADIUS_FIELD = "radiusPx";
		/** Gap between the sidebar and center column in CSS pixels. */
		const GLASS_GAP_FIELD = "gapPx";
		/** Custom main-canvas fill: empty, a CSS color/gradient, or an http(s) image URL. */
		const GLASS_CANVAS_FIELD = "canvas";
		/** Field carrying whether the fluid backdrop is on. Independent of `enabled`. */
		const FLUID_ENABLED_FIELD = "fluidEnabled";
		/** Field carrying the fluid preset id. */
		const FLUID_PRESET_FIELD = "fluidPreset";
		/** Field carrying the fluid speed multiplier. */
		const FLUID_SPEED_FIELD = "fluidSpeed";
		/** Field carrying fluid blend color 1. */
		const FLUID_COLOR_1_FIELD = "fluidColor1";
		/** Field carrying fluid blend color 2. */
		const FLUID_COLOR_2_FIELD = "fluidColor2";
		/** Field carrying fluid blend color 3. */
		const FLUID_COLOR_3_FIELD = "fluidColor3";
		/** Field carrying fluid blend color 4. */
		const FLUID_COLOR_4_FIELD = "fluidColor4";
		/** Field carrying whether composer popover motion is on. Independent of `enabled`. */
		const MOTION_ENABLED_FIELD = "motionEnabled";
		/** Field carrying open-animation duration in milliseconds. */
		const MOTION_OPEN_MS_FIELD = "motionOpenMs";
		/** Field carrying close-animation duration in milliseconds. */
		const MOTION_CLOSE_MS_FIELD = "motionCloseMs";
		/** Field carrying fade-out duration after an open grow or pane slide settles. */
		const MOTION_FADE_MS_FIELD = "motionFadeMs";
		/** Default fluid preset. */
		const DEFAULT_FLUID_PRESET = "silk";
		/** Isolation default color 1. */
		const DEFAULT_FLUID_COLOR_1 = "#f4cd9f";
		/** Isolation default color 2. */
		const DEFAULT_FLUID_COLOR_2 = "#3162ee";
		/** Isolation default color 3. */
		const DEFAULT_FLUID_COLOR_3 = "#e882cc";
		/** Isolation default color 4. */
		const DEFAULT_FLUID_COLOR_4 = "#59b5f3";
		/** Persistable fluid preset ids (Isolation silk plus five variants). */
		const FLUID_PRESETS = [
			"silk",
			"hsv",
			"wave",
			"aurora",
			"plasma",
			"smoke"
		];
		const CANVAS_MAX = 2048;
		/** Durable liquid-glass schema; also the wire envelope the browser scope validates against. */
		const GlassSettingsSchema = Schema.object({
			[GLASS_ENABLED_FIELD]: Schema.boolean().default(false),
			[GLASS_BLUR_FIELD]: Schema.number().min(0).max(40).default(10),
			[GLASS_SATURATE_FIELD]: Schema.number().min(100).max(220).default(140),
			[GLASS_DISPLACE_FIELD]: Schema.number().min(0).max(80).default(40),
			[GLASS_ABERRATION_FIELD]: Schema.number().min(0).max(8).default(2),
			[GLASS_RADIUS_FIELD]: Schema.number().min(0).max(40).default(22),
			[GLASS_GAP_FIELD]: Schema.number().min(0).max(32).default(10),
			[GLASS_CANVAS_FIELD]: Schema.string().max(CANVAS_MAX).default(""),
			[FLUID_ENABLED_FIELD]: Schema.boolean().default(false),
			[FLUID_PRESET_FIELD]: Schema.union([...FLUID_PRESETS]).default(DEFAULT_FLUID_PRESET),
			[FLUID_SPEED_FIELD]: Schema.number().min(.25).max(2.5).default(1),
			[FLUID_COLOR_1_FIELD]: Schema.string().max(32).default(DEFAULT_FLUID_COLOR_1),
			[FLUID_COLOR_2_FIELD]: Schema.string().max(32).default(DEFAULT_FLUID_COLOR_2),
			[FLUID_COLOR_3_FIELD]: Schema.string().max(32).default(DEFAULT_FLUID_COLOR_3),
			[FLUID_COLOR_4_FIELD]: Schema.string().max(32).default(DEFAULT_FLUID_COLOR_4),
			[MOTION_ENABLED_FIELD]: Schema.boolean().default(true),
			[MOTION_OPEN_MS_FIELD]: Schema.number().min(50).max(600).default(160),
			[MOTION_CLOSE_MS_FIELD]: Schema.number().min(50).max(600).default(120),
			[MOTION_FADE_MS_FIELD]: Schema.number().min(50).max(600).default(120)
		});
		/**
		* Fill missing fields from the schema defaults.
		* @param section - partial host or wire section.
		* @returns a complete settings object.
		*/
		function resolveGlassSettings(section) {
			return GlassSettingsSchema(section ?? {});
		}
		const CANVAS_COLOR = /^(?:#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})|[a-z]{3,24})$/i;
		const CANVAS_FUNCTION = /^(?:rgb|rgba|hsl|hsla|oklch|oklab|color|(?:repeating-)?(?:linear|radial|conic)-gradient)\(/i;
		/**
		* Whether a canvas string is unsafe to put in a CSS `background` declaration.
		* @param value - trimmed user input.
		* @returns true when the value must be ignored.
		*/
		function isUnsafeCanvas(value) {
			const lower = value.toLowerCase();
			return lower.includes("javascript:") || lower.includes("expression(") || lower.includes("<script") || lower.includes("url(javascript") || /[{};]/.test(value);
		}
		/**
		* Turn a stored canvas field into a CSS `background` value.
		* @param raw - settings `canvas` field.
		* @returns a CSS background, or empty when unset or unsafe.
		*/
		function resolveCanvasBackground(raw) {
			const value = raw.trim();
			if (value === "" || isUnsafeCanvas(value)) return "";
			if (/^https?:\/\//i.test(value)) return `url(${JSON.stringify(value)})`;
			if (CANVAS_COLOR.test(value)) return value;
			if (CANVAS_FUNCTION.test(value) && value.endsWith(")")) return value;
			return "";
		}
		//#endregion
		//#region src/client/fluid-shader.ts
		/**
		* Fullscreen fluid color field inspired by the Isolation HLSL effect
		* (Shadertoy dstBRs / wdyczG / msXcz2). Noise uses a public-domain sin-dot
		* hash, not the CC-NC IQ 2014 hash from that sample.
		*/
		/** Persistable fluid preset ids. */
		const FLUID_PRESET_IDS = FLUID_PRESETS;
		/** Isolation default palette (color1..color4). */
		const DEFAULT_FLUID_COLORS = [
			DEFAULT_FLUID_COLOR_1,
			DEFAULT_FLUID_COLOR_2,
			DEFAULT_FLUID_COLOR_3,
			DEFAULT_FLUID_COLOR_4
		];
		const PRESETS = {
			silk: {
				frequency: 5,
				amplitude: 25,
				speed: .75,
				hsv: false,
				wave: false
			},
			hsv: {
				frequency: 5,
				amplitude: 25,
				speed: .75,
				hsv: true,
				wave: false
			},
			wave: {
				frequency: 5,
				amplitude: 25,
				speed: .75,
				hsv: false,
				wave: true
			},
			aurora: {
				frequency: 3,
				amplitude: 18,
				speed: .45,
				hsv: true,
				wave: true
			},
			plasma: {
				frequency: 8,
				amplitude: 14,
				speed: 1.35,
				hsv: false,
				wave: false
			},
			smoke: {
				frequency: 3.2,
				amplitude: 42,
				speed: .32,
				hsv: false,
				wave: false
			}
		};
		/**
		* Narrow one wire value to a fluid preset id.
		* @param value - value crossing the settings boundary.
		* @returns whether the value is a known preset id.
		*/
		function isFluidPreset(value) {
			return FLUID_PRESET_IDS.some((id) => id === value);
		}
		/**
		* Look up one preset, falling back to silk.
		* @param id - persistable preset id.
		* @returns shader knobs.
		*/
		function fluidPresetSpec(id) {
			return isFluidPreset(id) ? PRESETS[id] : PRESETS.silk;
		}
		/**
		* Parse a `#rgb` or `#rrggbb` color into 0..1 RGB.
		* @param raw - user or stored hex string.
		* @returns RGB, or undefined when the string is not a hex color.
		*/
		function parseHexColor(raw) {
			const value = raw.trim();
			const short = /^#([0-9a-f]{3})$/i.exec(value);
			if (short !== null) {
				const digits = short[1] ?? "";
				if (digits.length !== 3) return void 0;
				return parseHexColor(`#${digits[0]}${digits[0]}${digits[1]}${digits[1]}${digits[2]}${digits[2]}`);
			}
			const long = /^#([0-9a-f]{6})$/i.exec(value);
			if (long === null) return void 0;
			const hex = long[1] ?? "";
			if (hex.length !== 6) return void 0;
			return [
				Number.parseInt(hex.slice(0, 2), 16) / 255,
				Number.parseInt(hex.slice(2, 4), 16) / 255,
				Number.parseInt(hex.slice(4, 6), 16) / 255
			];
		}
		/**
		* Format RGB as `#rrggbb` for a color input.
		* @param rgb - 0..1 triple.
		* @returns a 7-character hex color.
		*/
		function rgbToHex(rgb) {
			const byte = (channel) => Math.round(Math.min(1, Math.max(0, channel)) * 255).toString(16).padStart(2, "0");
			return `#${byte(rgb[0])}${byte(rgb[1])}${byte(rgb[2])}`;
		}
		/**
		* Coerce a stored color to a `#rrggbb` value a color input accepts.
		* @param raw - stored field.
		* @param fallback - hex used when parsing fails.
		* @returns a 7-character hex color.
		*/
		function toColorInput(raw, fallback) {
			const parsed = parseHexColor(raw);
			if (parsed === void 0) return fallback;
			return rgbToHex(parsed);
		}
		/**
		* Resolve draw uniforms from persistable fluid fields.
		* @param preset - preset id.
		* @param speed - user speed multiplier.
		* @param color1 - first blend color.
		* @param color2 - second blend color.
		* @param color3 - third blend color.
		* @param color4 - fourth blend color.
		* @returns GPU uniforms.
		*/
		function resolveFluidDrawState(preset, speed, color1, color2, color3, color4) {
			const spec = fluidPresetSpec(preset);
			const fallback = (index, raw) => parseHexColor(raw) ?? parseHexColor(DEFAULT_FLUID_COLORS[index]) ?? [
				1,
				1,
				1
			];
			return {
				colors: [
					fallback(0, color1),
					fallback(1, color2),
					fallback(2, color3),
					fallback(3, color4)
				],
				frequency: spec.frequency,
				amplitude: spec.amplitude,
				speed: spec.speed * speed,
				hsv: spec.hsv,
				wave: spec.wave
			};
		}
		/** Fullscreen clip-space vertex shader (WebGL 1). */
		const FLUID_VERTEX_SOURCE = [
			"attribute vec2 a_pos;",
			"void main() {",
			"  gl_Position = vec4(a_pos, 0.0, 1.0);",
			"}"
		].join("\n");
		/** Isolation-style fluid fragment shader (WebGL 1). */
		const FLUID_FRAGMENT_SOURCE = [
			"#ifdef GL_FRAGMENT_PRECISION_HIGH",
			"precision highp float;",
			"#else",
			"precision mediump float;",
			"#endif",
			"uniform vec2 u_resolution;",
			"uniform float u_time;",
			"uniform vec3 u_color1;",
			"uniform vec3 u_color2;",
			"uniform vec3 u_color3;",
			"uniform vec3 u_color4;",
			"uniform float u_frequency;",
			"uniform float u_amplitude;",
			"uniform float u_speed;",
			"uniform float u_hsv;",
			"uniform float u_wave;",
			"mat2 rot(float a) {",
			"  float s = sin(a);",
			"  float c = cos(a);",
			"  return mat2(c, s, -s, c);",
			"}",
			"vec2 hash22(vec2 p) {",
			"  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));",
			"  return fract(sin(p) * 43758.5453123);",
			"}",
			"float noise(vec2 p) {",
			"  vec2 i = floor(p);",
			"  vec2 f = fract(p);",
			"  vec2 u = f * f * (3.0 - 2.0 * f);",
			"  float a = dot(-1.0 + 2.0 * hash22(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0));",
			"  float b = dot(-1.0 + 2.0 * hash22(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0));",
			"  float c = dot(-1.0 + 2.0 * hash22(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0));",
			"  float d = dot(-1.0 + 2.0 * hash22(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0));",
			"  return 0.5 + 0.5 * mix(mix(a, b, u.x), mix(c, d, u.x), u.y);",
			"}",
			"vec3 hsv2rgb(vec3 c) {",
			"  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);",
			"  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);",
			"  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);",
			"}",
			"vec3 rgb2hsv(vec3 c) {",
			"  vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);",
			"  vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));",
			"  vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));",
			"  float d = q.x - min(q.w, q.y);",
			"  float e = 1.0e-10;",
			"  return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);",
			"}",
			"float remapRange(float val, float mi, float ma) {",
			"  return val * (ma - mi) + mi;",
			"}",
			"vec3 lightwave(vec3 inputColor, float isHsv, vec2 uv) {",
			"  vec3 hsv = isHsv > 0.5 ? inputColor : rgb2hsv(inputColor);",
			"  vec2 p = -1.0 + 1.5 * uv;",
			"  float t = u_time / 5.0;",
			"  float mov0 = p.x + p.y + cos(sin(t) * 2.0) * 100.0 + sin(p.x / 100.0) * 1000.0;",
			"  float mov1 = p.y / 0.3 + t;",
			"  float mov2 = p.x / 0.2;",
			"  float c1 = sin(mov1 + t) / 2.0 + mov2 / 2.0 - mov1 - mov2 + t;",
			"  float c2 = cos(c1 + sin(mov0 / 1000.0 + t) + sin(p.y / 40.0 + t) + sin((p.x + p.y) / 100.0) * 3.0);",
			"  float c3 = abs(sin(c2 + cos(mov1 + mov2 + c2) + cos(mov2) + sin(p.x / 1000.0)));",
			"  return hsv2rgb(vec3(",
			"    remapRange(abs(c2), hsv.x * 0.95, hsv.x),",
			"    remapRange(c3, hsv.y, hsv.y * 0.85),",
			"    remapRange(c3, hsv.z, hsv.z * 0.85)",
			"  ));",
			"}",
			"void main() {",
			"  vec2 uv = gl_FragCoord.xy / u_resolution;",
			"  vec2 tuv = uv - 0.5;",
			"  float degree = noise(vec2(u_time * 0.1, tuv.x * tuv.y));",
			"  tuv = rot(radians((degree - 0.5) * 720.0 + 180.0)) * tuv;",
			"  float speed = u_time * u_speed;",
			"  tuv.x += sin(tuv.y * u_frequency + speed) / u_amplitude;",
			"  tuv.y += sin(tuv.x * u_frequency * 1.5 + speed) / (u_amplitude * 0.5);",
			"  vec3 c1 = u_hsv > 0.5 ? rgb2hsv(u_color1) : u_color1;",
			"  vec3 c2 = u_hsv > 0.5 ? rgb2hsv(u_color2) : u_color2;",
			"  vec3 c3 = u_hsv > 0.5 ? rgb2hsv(u_color3) : u_color3;",
			"  vec3 c4 = u_hsv > 0.5 ? rgb2hsv(u_color4) : u_color4;",
			"  vec2 axis = rot(radians(-5.0)) * tuv;",
			"  vec3 layer1 = mix(c1, c2, smoothstep(-0.3, 0.2, axis.x));",
			"  vec3 layer2 = mix(c3, c4, smoothstep(-0.3, 0.2, axis.x));",
			"  vec3 comp = mix(layer1, layer2, smoothstep(0.5, -0.3, tuv.y));",
			"  vec3 color = u_wave > 0.5 ? lightwave(comp, u_hsv, uv)",
			"    : (u_hsv > 0.5 ? hsv2rgb(comp) : comp);",
			"  gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);",
			"}"
		].join("\n");
		//#endregion
		//#region \0dsh-css:D:\Code\TypeScript\deepseek-harness\packages\client\ui-theme-liquid-glass\src\client\LiquidGlassRow.module.css.mjs
		const css = ".EF9Rwa_block{flex-direction:column;display:flex}.EF9Rwa_row{border-bottom:1px solid var(--dsw-alias-border-l2);align-items:center;gap:8px;padding:16px 0;display:flex}.EF9Rwa_rowText{flex-direction:column;flex:1;gap:4px;min-width:0;padding-right:48px;display:flex}.EF9Rwa_title{color:var(--dsw-alias-label-primary);font-size:14px;font-weight:400;line-height:22px}.EF9Rwa_desc{color:var(--dsw-alias-label-tertiary);font-size:12px;font-weight:400;line-height:18px}.EF9Rwa_switch{box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-module-platform);cursor:pointer;border-radius:26px;flex:none;width:44px;height:26px;padding:0;position:relative}.EF9Rwa_switch:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:2px}.EF9Rwa_switchOn{background:var(--dsw-alias-state-business-primary);border-color:var(--dsw-alias-state-business-primary)}.EF9Rwa_thumb{background:var(--dsw-static-neutral-bluish-00);width:20px;height:20px;box-shadow:var(--dsw-shadow-lv1);border-radius:50%;transition:transform .24s cubic-bezier(.32,.72,0,1);position:absolute;top:2px;left:2px}.EF9Rwa_switchOn .EF9Rwa_thumb{transform:translate(18px)}.EF9Rwa_tuners{flex-direction:column;gap:10px;padding:0 0 16px;display:flex}.EF9Rwa_tuner{flex-direction:column;gap:4px;display:flex}.EF9Rwa_tunerLabel{color:var(--dsw-alias-label-secondary);font-size:12px;line-height:18px}.EF9Rwa_canvas{box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-module-platform);width:100%;height:32px;color:var(--dsw-alias-label-primary);font:inherit;border-radius:8px;padding:0 10px;font-size:13px}.EF9Rwa_canvas:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:2px}.EF9Rwa_colors{grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;display:grid}.EF9Rwa_swatch{box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2);cursor:pointer;background:0 0;border-radius:8px;width:100%;height:32px;padding:0}.EF9Rwa_swatch:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:2px}@media (prefers-reduced-motion:reduce){.EF9Rwa_thumb{transition:none}}";
		const tagId = "dsh-liquid-glass-fluid-background/LiquidGlassRow.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-liquid-glass-fluid-background";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		var LiquidGlassRow_module_css_default = {
			"block": "EF9Rwa_block",
			"row": "EF9Rwa_row",
			"swatch": "EF9Rwa_swatch",
			"switch": "EF9Rwa_switch",
			"switchOn": "EF9Rwa_switchOn",
			"tuners": "EF9Rwa_tuners",
			"tunerLabel": "EF9Rwa_tunerLabel",
			"tuner": "EF9Rwa_tuner",
			"canvas": "EF9Rwa_canvas",
			"colors": "EF9Rwa_colors",
			"thumb": "EF9Rwa_thumb",
			"desc": "EF9Rwa_desc",
			"rowText": "EF9Rwa_rowText",
			"title": "EF9Rwa_title"
		};
		//#endregion
		//#region src/client/LiquidGlassRow.tsx
		/**
		* Liquid-glass preference block registered into the General section item slot:
		* on/off switch plus live tuners (blur, saturation, refraction, canvas).
		*/
		const TUNERS = [
			{
				field: "blurPx",
				label: "blur",
				min: 0,
				max: 40,
				step: 1
			},
			{
				field: "saturatePct",
				label: "saturate",
				min: 100,
				max: 220,
				step: 5
			},
			{
				field: "displace",
				label: "displace",
				min: 0,
				max: 80,
				step: 1
			},
			{
				field: "aberration",
				label: "aberration",
				min: 0,
				max: 8,
				step: .5
			},
			{
				field: "radiusPx",
				label: "radius",
				min: 0,
				max: 40,
				step: 1
			},
			{
				field: "gapPx",
				label: "gap",
				min: 0,
				max: 32,
				step: 1
			}
		];
		function SwitchRow({ title, description, checked, onToggle }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: LiquidGlassRow_module_css_default.row,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: LiquidGlassRow_module_css_default.rowText,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: LiquidGlassRow_module_css_default.title,
						children: title
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: LiquidGlassRow_module_css_default.desc,
						children: description
					})]
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
					type: "button",
					role: "switch",
					"aria-checked": checked,
					"aria-label": title,
					className: clsx(LiquidGlassRow_module_css_default.switch, checked && LiquidGlassRow_module_css_default.switchOn),
					onClick: () => {
						onToggle();
					},
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { className: LiquidGlassRow_module_css_default.thumb })
				})]
			});
		}
		function FluidTuners({ t, setField, preset, speed, color1, color2, color3, color4 }) {
			const colors = [
				{
					field: "fluidColor1",
					label: "color1",
					value: color1,
					fallback: DEFAULT_FLUID_COLORS[0]
				},
				{
					field: "fluidColor2",
					label: "color2",
					value: color2,
					fallback: DEFAULT_FLUID_COLORS[1]
				},
				{
					field: "fluidColor3",
					label: "color3",
					value: color3,
					fallback: DEFAULT_FLUID_COLORS[2]
				},
				{
					field: "fluidColor4",
					label: "color4",
					value: color4,
					fallback: DEFAULT_FLUID_COLORS[3]
				}
			];
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: LiquidGlassRow_module_css_default.tuners,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
						className: LiquidGlassRow_module_css_default.tuner,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: LiquidGlassRow_module_css_default.tunerLabel,
							children: t("preset")
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("select", {
							className: LiquidGlassRow_module_css_default.canvas,
							value: preset,
							"aria-label": t("preset"),
							onChange: (event) => {
								setField("fluidPreset", event.target.value);
							},
							children: FLUID_PRESETS.map((id) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
								value: id,
								children: t(id)
							}, id))
						})]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
						className: LiquidGlassRow_module_css_default.tuner,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: LiquidGlassRow_module_css_default.tunerLabel,
							children: `${t("fluidSpeed")} ${String(speed)}`
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
							type: "range",
							min: .25,
							max: 2.5,
							step: .05,
							value: speed,
							"aria-label": t("fluidSpeed"),
							onChange: (event) => {
								setField("fluidSpeed", Number(event.target.value));
							}
						})]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
						className: LiquidGlassRow_module_css_default.colors,
						children: colors.map((color) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
							className: LiquidGlassRow_module_css_default.tuner,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: LiquidGlassRow_module_css_default.tunerLabel,
								children: t(color.label)
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
								type: "color",
								className: LiquidGlassRow_module_css_default.swatch,
								value: toColorInput(color.value, color.fallback),
								"aria-label": t(color.label),
								onChange: (event) => {
									setField(color.field, event.target.value);
								}
							})]
						}, color.field))
					})
				]
			});
		}
		function MotionTuners({ t, setField, openMs, closeMs, fadeMs }) {
			const rows = [
				{
					field: "motionOpenMs",
					label: "motionOpen",
					value: openMs
				},
				{
					field: "motionCloseMs",
					label: "motionClose",
					value: closeMs
				},
				{
					field: "motionFadeMs",
					label: "motionFade",
					value: fadeMs
				}
			];
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: LiquidGlassRow_module_css_default.tuners,
				children: rows.map((row) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
					className: LiquidGlassRow_module_css_default.tuner,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: LiquidGlassRow_module_css_default.tunerLabel,
						children: `${t(row.label)} ${String(row.value)}`
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
						type: "range",
						min: 50,
						max: 600,
						step: 10,
						value: row.value,
						"aria-label": t(row.label),
						onChange: (event) => {
							setField(row.field, Number(event.target.value));
						}
					})]
				}, row.field))
			});
		}
		function GlassTuners({ t, setField, values, canvas }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: LiquidGlassRow_module_css_default.tuners,
				children: [TUNERS.map((tuner) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
					className: LiquidGlassRow_module_css_default.tuner,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: LiquidGlassRow_module_css_default.tunerLabel,
						children: `${t(tuner.label)} ${String(values[tuner.field])}`
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
						type: "range",
						min: tuner.min,
						max: tuner.max,
						step: tuner.step,
						value: values[tuner.field],
						"aria-label": t(tuner.label),
						onChange: (event) => {
							setField(tuner.field, Number(event.target.value));
						}
					})]
				}, tuner.field)), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
					className: LiquidGlassRow_module_css_default.tuner,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: LiquidGlassRow_module_css_default.tunerLabel,
						children: t("canvas")
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
						type: "text",
						className: LiquidGlassRow_module_css_default.canvas,
						value: canvas,
						placeholder: t("canvasHint"),
						"aria-label": t("canvas"),
						onChange: (event) => {
							setField("canvas", event.target.value);
						}
					})]
				})]
			});
		}
		/**
		* Render the liquid-glass settings block.
		* @param props - composed slot props.
		* @returns the row element tree.
		*/
		function LiquidGlassRow({ t, setEnabled, setField, useStore }) {
			const enabled = useStore((s) => s.enabled);
			const blurPx = useStore((s) => s.blurPx);
			const saturatePct = useStore((s) => s.saturatePct);
			const displace = useStore((s) => s.displace);
			const aberration = useStore((s) => s.aberration);
			const radiusPx = useStore((s) => s.radiusPx);
			const gapPx = useStore((s) => s.gapPx);
			const canvas = useStore((s) => s.canvas);
			const fluidEnabled = useStore((s) => s.fluidEnabled);
			const fluidPreset = useStore((s) => s.fluidPreset);
			const fluidSpeed = useStore((s) => s.fluidSpeed);
			const fluidColor1 = useStore((s) => s.fluidColor1);
			const fluidColor2 = useStore((s) => s.fluidColor2);
			const fluidColor3 = useStore((s) => s.fluidColor3);
			const fluidColor4 = useStore((s) => s.fluidColor4);
			const motionEnabled = useStore((s) => s.motionEnabled);
			const motionOpenMs = useStore((s) => s.motionOpenMs);
			const motionCloseMs = useStore((s) => s.motionCloseMs);
			const motionFadeMs = useStore((s) => s.motionFadeMs);
			const values = {
				blurPx,
				saturatePct,
				displace,
				aberration,
				radiusPx,
				gapPx
			};
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: LiquidGlassRow_module_css_default.block,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(SwitchRow, {
						title: t("title"),
						description: t("description"),
						checked: enabled,
						onToggle: () => {
							setEnabled(!enabled);
						}
					}),
					enabled ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(GlassTuners, {
						t,
						setField,
						values,
						canvas
					}) : null,
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(SwitchRow, {
						title: t("fluidTitle"),
						description: t("fluidDescription"),
						checked: fluidEnabled,
						onToggle: () => {
							setField("fluidEnabled", !fluidEnabled);
						}
					}),
					fluidEnabled ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(FluidTuners, {
						t,
						setField,
						preset: fluidPreset,
						speed: fluidSpeed,
						color1: fluidColor1,
						color2: fluidColor2,
						color3: fluidColor3,
						color4: fluidColor4
					}) : null,
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(SwitchRow, {
						title: t("motionTitle"),
						description: t("motionDescription"),
						checked: motionEnabled,
						onToggle: () => {
							setField("motionEnabled", !motionEnabled);
						}
					}),
					motionEnabled ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)(MotionTuners, {
						t,
						setField,
						openMs: motionOpenMs,
						closeMs: motionCloseMs,
						fadeMs: motionFadeMs
					}) : null
				]
			});
		}
		//#endregion
		//#region src/client/settings-store.ts
		/**
		* Liquid-glass row slot store: a mirror of the durable overlay section. The
		* plugin's apply-world settings listener is the only writer; the row
		* component reads via props.useStore.
		*/
		/**
		* Declares the liquid-glass row state and write surface.
		* @returns the store handle.
		*/
		function createLiquidGlassRowStore() {
			return (0, _deepseek_ai_dsh_client_runtime_client.defineStore)({
				init: () => ({
					enabled: false,
					blurPx: 10,
					saturatePct: 140,
					displace: 40,
					aberration: 2,
					radiusPx: 22,
					gapPx: 10,
					canvas: "",
					fluidEnabled: false,
					fluidPreset: DEFAULT_FLUID_PRESET,
					fluidSpeed: 1,
					fluidColor1: DEFAULT_FLUID_COLOR_1,
					fluidColor2: DEFAULT_FLUID_COLOR_2,
					fluidColor3: DEFAULT_FLUID_COLOR_3,
					fluidColor4: DEFAULT_FLUID_COLOR_4,
					motionEnabled: true,
					motionOpenMs: 160,
					motionCloseMs: 120,
					motionFadeMs: 120,
					revision: -1
				}),
				actions: { sync: (d, next, revision) => {
					if (revision <= d.revision) return;
					d.enabled = next.enabled;
					d.blurPx = next.blurPx;
					d.saturatePct = next.saturatePct;
					d.displace = next.displace;
					d.aberration = next.aberration;
					d.radiusPx = next.radiusPx;
					d.gapPx = next.gapPx;
					d.canvas = next.canvas;
					d.fluidEnabled = next.fluidEnabled;
					d.fluidPreset = next.fluidPreset;
					d.fluidSpeed = next.fluidSpeed;
					d.fluidColor1 = next.fluidColor1;
					d.fluidColor2 = next.fluidColor2;
					d.fluidColor3 = next.fluidColor3;
					d.fluidColor4 = next.fluidColor4;
					d.motionEnabled = next.motionEnabled;
					d.motionOpenMs = next.motionOpenMs;
					d.motionCloseMs = next.motionCloseMs;
					d.motionFadeMs = next.motionFadeMs;
					d.revision = revision;
				} }
			});
		}
		//#endregion
		//#region src/client/locales.ts
		/** `settings.liquidGlass` namespace dictionaries (the overlay settings row's copy). */
		/** Simplified Chinese dictionary (the key-set source of truth). */
		const zh = {
			"title": "液态玻璃",
			"description": "圆角边缘折射并色散背景光，带高光与分层阴影；关闭后立即还原。",
			"blur": "模糊",
			"saturate": "饱和",
			"displace": "折射强度",
			"aberration": "色散",
			"radius": "圆角",
			"gap": "栏间距",
			"canvas": "主界面背景",
			"canvasHint": "颜色、渐变或图片 URL，留空则跟随主题",
			"fluidTitle": "流体背景",
			"fluidDescription": "全屏着色器流体，不依赖液态玻璃；关闭后立即还原。",
			"preset": "特效",
			"silk": "丝绸",
			"hsv": "柔和混色",
			"wave": "光波",
			"aurora": "极光",
			"plasma": "等离子",
			"smoke": "烟雾",
			"fluidSpeed": "速度",
			"color1": "颜色 1",
			"color2": "颜色 2",
			"color3": "颜色 3",
			"color4": "颜色 4",
			"motionTitle": "交互动画",
			"motionDescription": "按钮弹窗和设置页以 iOS 式缩放拉伸展开和缩回；关闭后立即还原。不依赖液态玻璃。",
			"motionOpen": "展开",
			"motionClose": "收回",
			"motionFade": "淡出"
		};
		/** English dictionary, checked complete against the zh key set. */
		const en = {
			"title": "Liquid Glass",
			"description": "Liquid glass: the rounded rim refracts and disperses the background, with specular highlights and layered shadows. Turning it off restores the original look immediately.",
			"blur": "Blur",
			"saturate": "Saturation",
			"displace": "Refraction",
			"aberration": "Aberration",
			"radius": "Corner radius",
			"gap": "Column gap",
			"canvas": "Main background",
			"canvasHint": "A color, gradient, or image URL. Leave empty to follow the theme.",
			"fluidTitle": "Fluid background",
			"fluidDescription": "A fullscreen shader fluid. It does not require Liquid Glass. Turning it off restores the original look immediately.",
			"preset": "Effect",
			"silk": "Silk",
			"hsv": "Soft blend",
			"wave": "Light wave",
			"aurora": "Aurora",
			"plasma": "Plasma",
			"smoke": "Smoke",
			"fluidSpeed": "Speed",
			"color1": "Color 1",
			"color2": "Color 2",
			"color3": "Color 3",
			"color4": "Color 4",
			"motionTitle": "Interaction motion",
			"motionDescription": "Menus, popovers, and the settings dialog scale and stretch open and closed like iOS. Turning it off restores the original timing immediately. It does not require Liquid Glass.",
			"motionOpen": "Open",
			"motionClose": "Close",
			"motionFade": "Fade"
		};
		//#endregion
		//#region src/client/glass-tokens.ts
		/** Layer identity passed to overrideTokens; also names the origin for inspection. */
		const GLASS_TOKEN_SOURCE = "ui-theme-liquid-glass";
		/** Build one scheme pair. */
		function pair(light, dark) {
			return {
				light,
				dark
			};
		}
		/**
		* Semi-transparent surfaces stacked on the built-in palettes. `--dsw-alias-bg-base`
		* and every text or state token stay untouched so underlying content shows
		* through and contrast is unchanged.
		*/
		const GLASS_TOKEN_OVERRIDES = {
			"--dsw-alias-bg-layer-1": pair("rgba(255,255,255,0.22)", "rgba(44,44,46,0.24)"),
			"--dsw-alias-bg-layer-2": pair("rgba(255,255,255,0.40)", "rgba(53,54,56,0.40)"),
			"--dsw-alias-bg-layer-3": pair("rgba(255,255,255,0.46)", "rgba(67,69,74,0.44)"),
			"--dsw-alias-bg-overlay": pair("rgba(245,246,247,0.42)", "rgba(53,54,56,0.46)"),
			"--dsw-alias-bg-module-platform": pair("rgba(245,246,247,0.34)", "rgba(35,35,36,0.36)"),
			"--dsw-specific-sidebar-fill": pair("rgba(250,250,250,0.20)", "rgba(21,21,23,0.24)"),
			"--dsw-specific-menu": pair("rgba(255,255,255,0.40)", "rgba(53,54,56,0.44)"),
			"--dsw-specific-selector": pair("rgba(245,246,247,0.36)", "rgba(44,44,46,0.38)"),
			"--dsw-specific-bubble": pair("rgba(237,243,254,0.40)", "rgba(44,44,46,0.40)"),
			"--dsw-specific-input-major": pair("rgba(255,255,255,0.38)", "rgba(44,44,46,0.40)"),
			"--dsw-specific-tip": pair("rgba(245,246,247,0.38)", "rgba(35,35,36,0.38)"),
			"--dsw-alias-toast-bg": pair("rgba(41,41,41,0.56)", "rgba(67,69,74,0.56)"),
			"--dsw-alias-tooltip-bg": pair("rgba(33,33,35,0.58)", "rgba(67,69,74,0.58)"),
			"--dsw-alias-button-elevated-fill": pair("rgba(255,255,255,0.36)", "rgba(67,69,74,0.40)"),
			"--dsw-alias-button-floating-fill": pair("rgba(255,255,255,0.32)", "rgba(53,54,56,0.38)"),
			"--dsw-alias-interactive-bg-hover": pair("rgba(255,255,255,0.32)", "rgba(255,255,255,0.10)"),
			"--dsw-alias-interactive-bg-active": pair("rgba(255,255,255,0.44)", "rgba(255,255,255,0.16)"),
			"--dsw-alias-interactive-bg-hover-solid": pair("rgba(255,255,255,0.38)", "rgba(255,255,255,0.10)"),
			"--dsw-alias-border-l1": pair("rgba(255,255,255,0.45)", "rgba(255,255,255,0.10)"),
			"--dsw-alias-border-l2": pair("rgba(255,255,255,0.60)", "rgba(255,255,255,0.16)"),
			"--dsw-alias-border-l3": pair("rgba(255,255,255,0.70)", "rgba(255,255,255,0.20)"),
			"--dsw-alias-border-l4": pair("rgba(255,255,255,0.80)", "rgba(255,255,255,0.24)")
		};
		//#endregion
		//#region src/client/glass-filter.ts
		/**
		* SVG filter ported from liquid-glass-react GlassFilter (MIT, Copyright 2025
		* MAX ROVENSKY). One shared filter: shader displacement map, per-channel
		* chromatic `feDisplacementMap`, edge mask, clean well. The overlay stylesheet
		* applies `filter: url(#id)` to an empty `::before` warp layer so host text
		* stays sharp.
		*/
		/** Filter id referenced by the overlay stylesheet's warp-layer `filter`. */
		const GLASS_FILTER_ID = "dsh-liquid-glass-lens";
		/** Body attribute selecting the CSS-only (no SVG displacement) engine. */
		const GLASS_ENGINE_ATTRIBUTE = "data-dsh-liquid-glass-engine";
		/**
		* Radial SVG fallback used when canvas cannot emit a PNG map (jsdom without
		* 2D, tainted canvas). Neutral well, saturated rim.
		*/
		const FALLBACK_LENS_SVG = [
			"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"128\" height=\"128\">",
			"<defs>",
			"<radialGradient id=\"dsh-glass-lens\" cx=\"50%\" cy=\"40%\" r=\"72%\">",
			"<stop offset=\"0%\" stop-color=\"rgb(128,128,128)\"/>",
			"<stop offset=\"52%\" stop-color=\"rgb(128,128,128)\"/>",
			"<stop offset=\"78%\" stop-color=\"rgb(176,104,142)\"/>",
			"<stop offset=\"100%\" stop-color=\"rgb(214,64,156)\"/>",
			"</radialGradient>",
			"</defs>",
			"<rect width=\"128\" height=\"128\" fill=\"rgb(128,128,128)\"/>",
			"<rect width=\"128\" height=\"128\" rx=\"28\" ry=\"28\" fill=\"url(#dsh-glass-lens)\"/>",
			"</svg>"
		].join("");
		/** Data-URL fallback displacement map. */
		const FALLBACK_LENS_MAP_HREF = `data:image/svg+xml,${encodeURIComponent(FALLBACK_LENS_SVG)}`;
		/**
		* Pick the shader PNG when canvas produced one, otherwise the SVG rim map.
		* @param generated - `generateLiquidGlassMap` result.
		* @returns href safe to drop into `feImage`.
		*/
		function displacementMapHref(generated) {
			return generated ?? FALLBACK_LENS_MAP_HREF;
		}
		/**
		* Firefox has no `feDisplacementMap` on CSS `filter` / `backdrop-filter`.
		* @param userAgent - `navigator.userAgent`.
		* @returns true when the overlay must use blur/saturate only.
		*/
		function isCssOnlyGlassEngine(userAgent) {
			return userAgent.toLowerCase().includes("firefox");
		}
		/**
		* Escape a value for a double-quoted XML attribute.
		* @param value - raw attribute text.
		* @returns XML-safe attribute value.
		*/
		function escapeXmlAttr(value) {
			return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
		}
		/**
		* Build the hidden SVG document fragment `installOverlay` inserts so
		* `filter: url(#dsh-liquid-glass-lens)` can resolve.
		* @param options - map href and optional scale / aberration.
		* @returns an SVG markup string.
		*/
		function buildGlassFilterSvg(options) {
			const id = options.id ?? "dsh-liquid-glass-lens";
			const scale = options.displacementScale ?? 40;
			const aberration = options.aberrationIntensity ?? 2;
			const href = escapeXmlAttr(options.mapHref);
			const greenScale = scale * (1 - aberration * .05);
			const blueScale = scale * (1 - aberration * .1);
			const blur = Math.max(.1, .5 - aberration * .1);
			const edgeAlpha = aberration * .05;
			return [
				"<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"",
				"  width=\"0\" height=\"0\" aria-hidden=\"true\" focusable=\"false\">",
				"  <defs>",
				`    <filter id="${id}" x="-35%" y="-35%" width="170%" height="170%"`,
				"      color-interpolation-filters=\"sRGB\">",
				`      <feImage href="${href}" xlink:href="${href}"`,
				"        x=\"0\" y=\"0\" width=\"100%\" height=\"100%\"",
				"        preserveAspectRatio=\"xMidYMid slice\" result=\"DISPLACEMENT_MAP\"/>",
				"      <feColorMatrix in=\"DISPLACEMENT_MAP\" type=\"matrix\"",
				"        values=\"0.3 0.3 0.3 0 0  0.3 0.3 0.3 0 0  0.3 0.3 0.3 0 0  0 0 0 1 0\"",
				"        result=\"EDGE_INTENSITY\"/>",
				"      <feComponentTransfer in=\"EDGE_INTENSITY\" result=\"EDGE_MASK\">",
				`        <feFuncA type="discrete" tableValues="0 ${edgeAlpha} 1"/>`,
				"      </feComponentTransfer>",
				"      <feOffset in=\"SourceGraphic\" dx=\"0\" dy=\"0\" result=\"CENTER_ORIGINAL\"/>",
				`      <feDisplacementMap in="SourceGraphic" in2="DISPLACEMENT_MAP" scale="${scale}"`,
				"        xChannelSelector=\"R\" yChannelSelector=\"B\" result=\"RED_DISPLACED\"/>",
				"      <feColorMatrix in=\"RED_DISPLACED\" type=\"matrix\"",
				"        values=\"1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0\" result=\"RED_CHANNEL\"/>",
				`      <feDisplacementMap in="SourceGraphic" in2="DISPLACEMENT_MAP" scale="${greenScale}"`,
				"        xChannelSelector=\"R\" yChannelSelector=\"B\" result=\"GREEN_DISPLACED\"/>",
				"      <feColorMatrix in=\"GREEN_DISPLACED\" type=\"matrix\"",
				"        values=\"0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0\" result=\"GREEN_CHANNEL\"/>",
				`      <feDisplacementMap in="SourceGraphic" in2="DISPLACEMENT_MAP" scale="${blueScale}"`,
				"        xChannelSelector=\"R\" yChannelSelector=\"B\" result=\"BLUE_DISPLACED\"/>",
				"      <feColorMatrix in=\"BLUE_DISPLACED\" type=\"matrix\"",
				"        values=\"0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0\" result=\"BLUE_CHANNEL\"/>",
				"      <feBlend in=\"GREEN_CHANNEL\" in2=\"BLUE_CHANNEL\" mode=\"screen\" result=\"GB_COMBINED\"/>",
				"      <feBlend in=\"RED_CHANNEL\" in2=\"GB_COMBINED\" mode=\"screen\" result=\"RGB_COMBINED\"/>",
				`      <feGaussianBlur in="RGB_COMBINED" stdDeviation="${blur}" result="ABERRATED_BLURRED"/>`,
				"      <feComposite in=\"ABERRATED_BLURRED\" in2=\"EDGE_MASK\" operator=\"in\" result=\"EDGE_ABERRATION\"/>",
				"      <feComponentTransfer in=\"EDGE_MASK\" result=\"INVERTED_MASK\">",
				"        <feFuncA type=\"table\" tableValues=\"1 0\"/>",
				"      </feComponentTransfer>",
				"      <feComposite in=\"CENTER_ORIGINAL\" in2=\"INVERTED_MASK\" operator=\"in\" result=\"CENTER_CLEAN\"/>",
				"      <feComposite in=\"EDGE_ABERRATION\" in2=\"CENTER_CLEAN\" operator=\"over\"/>",
				"    </filter>",
				"  </defs>",
				"</svg>"
			].join("");
		}
		//#endregion
		//#region src/client/shader-displacement.ts
		/**
		* Smoothstep interpolation used by the liquid-glass fragment.
		* @param a - lower edge.
		* @param b - upper edge.
		* @param t - sample.
		* @returns hermite-smoothed 0..1 value.
		*/
		function smoothStep(a, b, t) {
			const x = Math.max(0, Math.min(1, (t - a) / (b - a)));
			return x * x * (3 - 2 * x);
		}
		/**
		* Length of a 2D vector.
		* @param x - x component.
		* @param y - y component.
		* @returns Euclidean length.
		*/
		function length(x, y) {
			return Math.sqrt(x * x + y * y);
		}
		/**
		* Signed distance to a rounded rectangle centered at the origin.
		* @param x - sample x.
		* @param y - sample y.
		* @param width - half-width before radius.
		* @param height - half-height before radius.
		* @param radius - corner radius.
		* @returns signed distance (negative inside).
		*/
		function roundedRectSdf(x, y, width, height, radius) {
			const qx = Math.abs(x) - width + radius;
			const qy = Math.abs(y) - height + radius;
			return Math.min(Math.max(qx, qy), 0) + length(Math.max(qx, 0), Math.max(qy, 0)) - radius;
		}
		/**
		* Liquid-glass fragment: stronger displacement at the rim, quiet in the well.
		* @param uv - unit-square sample.
		* @returns remapped UV used as a displacement source.
		*/
		function liquidGlassFragment(uv) {
			const ix = uv.x - .5;
			const iy = uv.y - .5;
			const scaled = smoothStep(0, 1, smoothStep(.8, 0, roundedRectSdf(ix, iy, .3, .2, .6) - .15));
			return {
				x: ix * scaled + .5,
				y: iy * scaled + .5
			};
		}
		function displacementAt(x, y, width, height) {
			const pos = liquidGlassFragment({
				x: x / width,
				y: y / height
			});
			return {
				x: pos.x * width - x,
				y: pos.y * height - y
			};
		}
		/**
		* Rasterize the liquid-glass fragment into RGBA bytes (R = X, G/B = Y).
		* @param width - map width in CSS pixels; must be a positive integer.
		* @param height - map height in CSS pixels; must be a positive integer.
		* @returns tightly packed RGBA bytes, or an empty buffer when either edge is < 1.
		*/
		function renderDisplacementRgba(width, height) {
			if (width < 1 || height < 1) return new Uint8ClampedArray(0);
			let maxScale = 0;
			for (let y = 0; y < height; y += 1) for (let x = 0; x < width; x += 1) {
				const delta = displacementAt(x, y, width, height);
				maxScale = Math.max(maxScale, Math.abs(delta.x), Math.abs(delta.y));
			}
			if (maxScale < 1) maxScale = 1;
			const pixels = new Uint8ClampedArray(width * height * 4);
			for (let y = 0; y < height; y += 1) for (let x = 0; x < width; x += 1) {
				const delta = displacementAt(x, y, width, height);
				const edgeDistance = Math.min(x, y, width - x - 1, height - y - 1);
				const edgeFactor = Math.min(1, edgeDistance / 2);
				const r = delta.x * edgeFactor / maxScale + .5;
				const g = delta.y * edgeFactor / maxScale + .5;
				const pixel = (y * width + x) * 4;
				pixels[pixel] = r * 255;
				pixels[pixel + 1] = g * 255;
				pixels[pixel + 2] = g * 255;
				pixels[pixel + 3] = 255;
			}
			return pixels;
		}
		/**
		* Rasterize the liquid-glass fragment into a PNG data URL.
		* @param width - map width in CSS pixels.
		* @param height - map height in CSS pixels.
		* @returns `data:image/png;base64,...`, or undefined when canvas 2D is unavailable.
		*/
		function generateLiquidGlassMap(width, height) {
			if (typeof document === "undefined") return void 0;
			if (width < 1 || height < 1) return void 0;
			let canvas;
			try {
				canvas = document.createElement("canvas");
			} catch {
				/* v8 ignore next -- jsdom always provides createElement('canvas') */
				return;
			}
			canvas.width = width;
			canvas.height = height;
			const context = canvas.getContext("2d");
			if (context === null) return void 0;
			const pixels = renderDisplacementRgba(width, height);
			const image = context.createImageData(width, height);
			image.data.set(pixels);
			try {
				context.putImageData(image, 0, 0);
				const url = canvas.toDataURL("image/png");
				return typeof url === "string" && url.startsWith("data:image/") ? url : void 0;
			} catch {
				return;
			}
		}
		//#endregion
		//#region src/client/glass-appearance.ts
		/**
		* Write live liquid-glass tunables onto `document.body` and rebuild the SVG
		* lens when displacement or aberration changes.
		*/
		/** Body attribute set when a custom canvas fill is active. */
		const GLASS_CANVAS_ATTRIBUTE = "data-dsh-glass-canvas";
		/** CSS custom properties written by {@link writeGlassAppearance}. */
		const GLASS_VAR_BLUR = "--dsh-glass-blur";
		/** Saturation custom property. */
		const GLASS_VAR_SATURATE = "--dsh-glass-saturate";
		/** Corner-radius custom property. */
		const GLASS_VAR_RADIUS = "--dsh-glass-radius";
		/** Column-gap custom property. */
		const GLASS_VAR_GAP = "--dsh-glass-gap";
		/** Canvas-fill custom property. */
		const GLASS_VAR_CANVAS = "--dsh-glass-canvas";
		const VARS = [
			GLASS_VAR_BLUR,
			GLASS_VAR_SATURATE,
			GLASS_VAR_RADIUS,
			GLASS_VAR_GAP,
			GLASS_VAR_CANVAS
		];
		/**
		* Apply tunables to the document: CSS variables, optional canvas attribute,
		* and a rebuilt displacement filter.
		* @param body - document body that carries the overlay attribute.
		* @param defs - element that hosts the SVG filter fragment.
		* @param section - current host section; missing fields use schema defaults.
		*/
		function writeGlassAppearance(body, defs, section) {
			const next = resolveGlassSettings(section);
			body.style.setProperty(GLASS_VAR_BLUR, `${String(next.blurPx)}px`);
			body.style.setProperty(GLASS_VAR_SATURATE, `${String(next.saturatePct)}%`);
			body.style.setProperty(GLASS_VAR_RADIUS, `${String(next.radiusPx)}px`);
			body.style.setProperty(GLASS_VAR_GAP, `${String(next.gapPx)}px`);
			const canvas = next.fluidEnabled ? "" : resolveCanvasBackground(next.canvas);
			if (canvas === "") {
				body.style.removeProperty(GLASS_VAR_CANVAS);
				body.removeAttribute(GLASS_CANVAS_ATTRIBUTE);
			} else {
				body.style.setProperty(GLASS_VAR_CANVAS, canvas);
				body.setAttribute(GLASS_CANVAS_ATTRIBUTE, "");
			}
			defs.innerHTML = buildGlassFilterSvg({
				mapHref: displacementMapHref(generateLiquidGlassMap(128, 128)),
				displacementScale: next.displace,
				aberrationIntensity: next.aberration
			});
		}
		/**
		* Remove tunables written by {@link writeGlassAppearance}.
		* @param body - document body that carried the overlay attribute.
		*/
		function clearGlassAppearance(body) {
			for (const name of VARS) body.style.removeProperty(name);
			body.removeAttribute(GLASS_CANVAS_ATTRIBUTE);
		}
		//#endregion
		//#region src/client/glass-styles.ts
		/**
		* Overlay stylesheet injected while the preference is on. Every rule is scoped
		* to `body[data-dsh-liquid-glass]`. Component hits use CSS-module logical
		* class names. Production bundles emit `[hash]_[local]`; Vite emits
		* `[name]_[local]_[hash]`. {@link loc} matches both.
		*
		* Liquid-glass-react applies `filter: url(#svg)` plus `backdrop-filter` on an
		* empty warp layer so text stays sharp. Floating plates do the same with
		* `::before` at `z-index: -1` (submenu uses `::after`; its `::before` is the
		* pointer bridge). The settings overlay is a `position: fixed` descendant of
		* the sidebar, so the sidebar host must not take `backdrop-filter`, `filter`,
		* `isolation`, or `transform` — any of those becomes the containing block
		* and squeezes the dialog into the column. Host `box-shadow` carries the
		* specular rim — InputBar and the conversation header already use `::after`.
		*/
		/** Marker attribute written on the injected `<style>` node and on `document.body`. */
		const GLASS_STYLE_ATTRIBUTE = "data-dsh-liquid-glass";
		/**
		* Match a CSS-module local class under `[hash]_[local]` (production) and
		* `[name]_[local]_[hash]` (Vite). `[class$="_local"]` only hits when that
		* token is last in the attribute; `[class*="_local "]` covers a production
		* token that is not last (selected session rows are `sessionRow selected`).
		* @param local - the module-local class name.
		* @returns an `:is()` selector covering both hash conventions.
		*/
		function loc$1(local) {
			return `:is([class*="_${local}_"], [class*="_${local} "], [class$="_${local}"])`;
		}
		const frame$1 = `${loc$1("frame")}:has(${loc$1("sidebarCol")})`;
		const sidebar = loc$1("sidebarCol");
		const details$1 = loc$1("detailsCol");
		const center$1 = loc$1("centerCol");
		const composerCard = `:is(${loc$1("composerSeat")} ${loc$1("card")}, [data-composer-card])`;
		const sendButton = `${composerCard} ${loc$1("primary")}`;
		const commandButton = `${composerCard} ${loc$1("add")}`;
		const composerChips = `:is(${sendButton}, ${commandButton})`;
		const glassPills = `:is(${sendButton}, ${commandButton}, ${loc$1("previewBadge")})`;
		const dialog = loc$1("dialog");
		const settingsPanel = `${loc$1("panel")}:has(${loc$1("navCell")})`;
		const portal = loc$1("portal");
		const submenu = loc$1("submenu");
		const menuList = `${loc$1("list")}:has(${loc$1("itemWrap")})`;
		const toast = loc$1("toast");
		const bubble = loc$1("bubble");
		const overlayCard = `${loc$1("overlayAnchor")} ${loc$1("card")}`;
		const hoverCard = `${loc$1("card")}${loc$1("copyable")}`;
		const sessionHeader = `${loc$1("header")}:has(${loc$1("titleCluster")})`;
		const queuePanel = `${loc$1("dock")} > ${loc$1("panel")}`;
		const goalBar = `${loc$1("bar")}:has(${loc$1("goalGlyph")})`;
		const todoCard = `${loc$1("root")}:has(> ${loc$1("body")} ${loc$1("progress")})`;
		const dropdown = loc$1("menu");
		const onboarding = loc$1("onboardingStage");
		const COLUMNS = [
			sidebar,
			details$1,
			sessionHeader,
			onboarding
		].join(",\n  ");
		const PLATES = [
			composerCard,
			dialog,
			settingsPanel,
			portal,
			submenu,
			menuList,
			toast,
			bubble,
			overlayCard,
			hoverCard,
			queuePanel,
			goalBar,
			todoCard,
			dropdown
		].join(",\n  ");
		const SURFACES = `${COLUMNS},\n  ${PLATES}`;
		/** Host `backdrop-filter` is safe here: these nodes do not wrap a viewport-fixed overlay. */
		const FROST_HOSTS = [details$1, onboarding].join(",\n  ");
		const WARP_BEFORE = [
			sidebar,
			sessionHeader,
			composerCard,
			dialog,
			settingsPanel,
			portal,
			menuList,
			toast,
			bubble,
			overlayCard,
			hoverCard,
			queuePanel,
			goalBar,
			todoCard,
			dropdown,
			glassPills
		].join(",\n  ");
		/** Small plates and the settings panel take SVG displacement. The sidebar
		* is a tall column: a pill lens rim would sit on the settings trigger. */
		const WARP_DISPLACE = [
			sessionHeader,
			composerCard,
			dialog,
			settingsPanel,
			portal,
			menuList,
			toast,
			bubble,
			overlayCard,
			hoverCard,
			queuePanel,
			goalBar,
			todoCard,
			dropdown
		].join(",\n  ");
		const under = (selector) => `body[data-dsh-liquid-glass] ${selector}`;
		const all = (list) => `:is(${list})`;
		const RIM_LIGHT = `
    0 10px 40px rgba(0, 0, 0, 0.10),
    0 2px 8px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.72),
    inset 1px 0 0 rgba(255, 255, 255, 0.28),
    inset -1px 0 0 rgba(255, 255, 255, 0.12),
    inset 0 -1px 0 rgba(255, 255, 255, 0.16),
    inset 0 0 0 0.5px rgba(255, 255, 255, 0.38),
    inset 0 20px 36px -18px rgba(255, 255, 255, 0.42),
    inset 0 -24px 32px -16px rgba(0, 0, 0, 0.10)`;
		/** Sidebar rim: same plate as {@link RIM_LIGHT} without the foot inset. */
		const RIM_SIDEBAR_LIGHT = `
    0 10px 40px rgba(0, 0, 0, 0.10),
    0 2px 8px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.72),
    inset 1px 0 0 rgba(255, 255, 255, 0.28),
    inset -1px 0 0 rgba(255, 255, 255, 0.12),
    inset 0 -1px 0 rgba(255, 255, 255, 0.16),
    inset 0 0 0 0.5px rgba(255, 255, 255, 0.38),
    inset 0 20px 36px -18px rgba(255, 255, 255, 0.42)`;
		const RIM_DARK = `
    0 10px 40px rgba(0, 0, 0, 0.42),
    0 2px 8px rgba(0, 0, 0, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.22),
    inset 1px 0 0 rgba(255, 255, 255, 0.10),
    inset -1px 0 0 rgba(255, 255, 255, 0.06),
    inset 0 -1px 0 rgba(255, 255, 255, 0.08),
    inset 0 0 0 0.5px rgba(255, 255, 255, 0.16),
    inset 0 20px 36px -18px rgba(255, 255, 255, 0.14),
    inset 0 -24px 32px -16px rgba(0, 0, 0, 0.28)`;
		/** Dark sidebar rim: same plate as {@link RIM_DARK} without the foot inset. */
		const RIM_SIDEBAR_DARK = `
    0 10px 40px rgba(0, 0, 0, 0.42),
    0 2px 8px rgba(0, 0, 0, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.22),
    inset 1px 0 0 rgba(255, 255, 255, 0.10),
    inset -1px 0 0 rgba(255, 255, 255, 0.06),
    inset 0 -1px 0 rgba(255, 255, 255, 0.08),
    inset 0 0 0 0.5px rgba(255, 255, 255, 0.16),
    inset 0 20px 36px -18px rgba(255, 255, 255, 0.14)`;
		const ILLUMINATION = `
  linear-gradient(165deg, rgba(255, 255, 255, 0.36) 0%, rgba(255, 255, 255, 0) 30%),
  linear-gradient(345deg, rgba(170, 205, 255, 0.14) 0%, rgba(255, 255, 255, 0) 34%)`;
		const WARP_BACKDROP = `blur(var(${GLASS_VAR_BLUR}, 10px)) saturate(var(${GLASS_VAR_SATURATE}, 140%))`;
		const COMPOSER_WARP = `blur(calc(var(${GLASS_VAR_BLUR}, 10px) + 2px)) saturate(var(${GLASS_VAR_SATURATE}, 140%))`;
		const DIALOG_WARP = `blur(calc(var(${GLASS_VAR_BLUR}, 10px) + 4px)) saturate(var(${GLASS_VAR_SATURATE}, 150%))`;
		const OPAQUE_LIGHT = `
    --dsw-alias-bg-layer-1: rgba(255, 255, 255, 0.94);
    --dsw-alias-bg-layer-2: rgba(255, 255, 255, 0.94);
    --dsw-alias-bg-layer-3: rgba(255, 255, 255, 0.96);
    --dsw-alias-bg-overlay: rgba(245, 246, 247, 0.96);
    --dsw-alias-bg-module-platform: rgba(245, 246, 247, 0.94);
    --dsw-specific-sidebar-fill: rgba(250, 250, 250, 0.96);
    --dsw-specific-menu: rgba(255, 255, 255, 0.96);
    --dsw-specific-selector: rgba(245, 246, 247, 0.94);
    --dsw-specific-bubble: rgba(237, 243, 254, 0.96);
    --dsw-specific-input-major: rgba(255, 255, 255, 0.96);
    --dsw-specific-tip: rgba(245, 246, 247, 0.94);
    --dsw-alias-toast-bg: rgba(41, 41, 41, 0.96);
    --dsw-alias-tooltip-bg: rgba(33, 33, 35, 0.96);`;
		const OPAQUE_DARK = `
    --dsw-alias-bg-layer-1: rgba(44, 44, 46, 0.94);
    --dsw-alias-bg-layer-2: rgba(53, 54, 56, 0.94);
    --dsw-alias-bg-layer-3: rgba(67, 69, 74, 0.96);
    --dsw-alias-bg-overlay: rgba(53, 54, 56, 0.96);
    --dsw-alias-bg-module-platform: rgba(35, 35, 36, 0.94);
    --dsw-specific-sidebar-fill: rgba(21, 21, 23, 0.96);
    --dsw-specific-menu: rgba(53, 54, 56, 0.96);
    --dsw-specific-selector: rgba(44, 44, 46, 0.94);
    --dsw-specific-bubble: rgba(44, 44, 46, 0.96);
    --dsw-specific-input-major: rgba(44, 44, 46, 0.96);
    --dsw-specific-tip: rgba(35, 35, 36, 0.94);
    --dsw-alias-toast-bg: rgba(67, 69, 74, 0.96);
    --dsw-alias-tooltip-bg: rgba(67, 69, 74, 0.96);`;
		/**
		* Full overlay stylesheet. Color literals live only in this package — it owns
		* the glass presentation. Feature packages keep consuming `--dsw-*` tokens.
		*/
		const GLASS_STYLES = `
body[data-dsh-liquid-glass] {
  ${GLASS_VAR_BLUR}: 10px;
  ${GLASS_VAR_SATURATE}: 140%;
  ${GLASS_VAR_RADIUS}: 22px;
  ${GLASS_VAR_GAP}: 10px;
}

body[data-dsh-liquid-glass] ${all(SURFACES)} {
  background-image: ${ILLUMINATION};
  background-blend-mode: soft-light, screen;
  border-color: rgba(255, 255, 255, 0.34);
  transition:
    background-color 240ms cubic-bezier(0.32, 0.72, 0, 1),
    box-shadow 240ms cubic-bezier(0.32, 0.72, 0, 1),
    border-radius 240ms cubic-bezier(0.32, 0.72, 0, 1),
    transform 240ms cubic-bezier(0.32, 0.72, 0, 1);
}

body[data-dsh-liquid-glass] ${all(SURFACES)}:not(${sidebar}) {
  box-shadow: ${RIM_LIGHT};
}

body[data-dsh-liquid-glass] ${all(PLATES)} {
  isolation: isolate;
}

body[data-dsh-liquid-glass] ${all(FROST_HOSTS)} {
  -webkit-backdrop-filter: ${WARP_BACKDROP};
  backdrop-filter: ${WARP_BACKDROP};
}

body[data-dsh-liquid-glass][data-ds-dark-theme] ${all(SURFACES)} {
  background-image:
    linear-gradient(165deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0) 28%),
    linear-gradient(345deg, rgba(120, 170, 255, 0.10) 0%, rgba(255, 255, 255, 0) 34%);
  border-color: rgba(255, 255, 255, 0.14);
}

body[data-dsh-liquid-glass][data-ds-dark-theme] ${all(SURFACES)}:not(${sidebar}) {
  box-shadow: ${RIM_DARK};
}

${under(sidebar)},
${under(details$1)},
${under(`${bubble}:not([data-side])`)},
${under(goalBar)},
${under(todoCard)} {
  position: relative;
}

${under(details$1)} {
  background-color: var(--dsw-alias-bg-layer-1);
  border-start-start-radius: var(${GLASS_VAR_RADIUS}, 22px);
  border-end-start-radius: var(${GLASS_VAR_RADIUS}, 22px);
}

${under(`${details$1} > *`)} {
  background-color: transparent;
}

body[data-dsh-liquid-glass] ${all(WARP_BEFORE)}::before,
body[data-dsh-liquid-glass] ${submenu}::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  border-radius: inherit;
  -webkit-backdrop-filter: ${WARP_BACKDROP};
  backdrop-filter: ${WARP_BACKDROP};
}

body[data-dsh-liquid-glass]:not([${GLASS_ENGINE_ATTRIBUTE}='css']) ${all(WARP_DISPLACE)}::before,
body[data-dsh-liquid-glass]:not([${GLASS_ENGINE_ATTRIBUTE}='css']) ${submenu}::after {
  filter: url(#${GLASS_FILTER_ID});
}

${under(frame$1)} {
  column-gap: var(${GLASS_VAR_GAP}, 10px);
}

body[data-dsh-liquid-glass][${GLASS_CANVAS_ATTRIBUTE}] {
  background: var(${GLASS_VAR_CANVAS}) center / cover no-repeat fixed;
}

body[data-dsh-liquid-glass][${GLASS_CANVAS_ATTRIBUTE}] ${frame$1} {
  background: transparent;
}

body[data-dsh-liquid-glass][${GLASS_CANVAS_ATTRIBUTE}] ${center$1},
body[data-dsh-liquid-glass][${GLASS_CANVAS_ATTRIBUTE}] ${details$1} {
  --dsw-alias-bg-base: transparent;
  background: transparent;
}

body[data-dsh-liquid-glass][${GLASS_CANVAS_ATTRIBUTE}] ${loc$1("root")}:has([data-conversation-scroll]),
body[data-dsh-liquid-glass][${GLASS_CANVAS_ATTRIBUTE}] ${details$1} ${loc$1("root")},
body[data-dsh-liquid-glass][${GLASS_CANVAS_ATTRIBUTE}] ${loc$1("root")}[data-phase='active'] ${loc$1("composerSeat")} {
  background: transparent;
}

${under(sidebar)},
${under(`${sidebar} > *`)} {
  overflow: hidden;
  border-start-end-radius: var(${GLASS_VAR_RADIUS}, 22px);
  border-end-end-radius: var(${GLASS_VAR_RADIUS}, 22px);
  border-right: none;
  border-inline-end: none;
  border-color: transparent;
  box-shadow: ${RIM_SIDEBAR_LIGHT};
}

body[data-dsh-liquid-glass][data-ds-dark-theme] ${sidebar},
body[data-dsh-liquid-glass][data-ds-dark-theme] ${sidebar} > * {
  border-right: none;
  border-inline-end: none;
  border-color: transparent;
  box-shadow: ${RIM_SIDEBAR_DARK};
}

${under(`${sidebar} ${loc$1("root")}:has(${loc$1("logoRow")})`)} {
  background: transparent;
}

${under(`${sidebar} ${loc$1("fade")}`)} {
  background: none;
}

${under(sidebar)}::before {
  -webkit-backdrop-filter: ${COMPOSER_WARP};
  backdrop-filter: ${COMPOSER_WARP};
}

${under(sessionHeader)} {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  margin: 10px 16px 8px;
  padding: 8px 14px 6px;
  border-radius: 18px;
  background-color: var(--dsw-alias-bg-layer-1);
}

${under(sessionHeader)}::before {
  -webkit-backdrop-filter: ${COMPOSER_WARP};
  backdrop-filter: ${COMPOSER_WARP};
}

${under(sessionHeader)}::after {
  content: none;
}

${under(`${sessionHeader} ${loc$1("tabs")}`)} {
  margin-top: 2px;
  padding-left: 4px;
}

${under(loc$1("tabActive"))} {
  color: var(--dsw-alias-label-primary);
}

${under(`${loc$1("tabActive")}::after`)} {
  background: var(--dsw-alias-label-primary);
}

${under(loc$1("folderActive"))} {
  color: var(--dsw-alias-label-primary);
}

${under(loc$1("groupTitle"))} {
  background: transparent;
}



${under(center$1)} {
  overflow: hidden;
  background: transparent;
  border-start-start-radius: var(${GLASS_VAR_RADIUS}, 22px);
  border-end-start-radius: var(${GLASS_VAR_RADIUS}, 22px);
}

${under(`${loc$1("sessionRow")}${loc$1("selected")}`)},
${under(`${loc$1("searchResultRow")}${loc$1("selected")}`)} {
  background: rgba(255, 255, 255, 0.72);
  box-shadow:
    inset 3px 0 0 0 rgba(255, 255, 255, 0.98),
    inset 0 0 0 1.5px rgba(255, 255, 255, 0.88),
    inset 0 1px 0 rgba(255, 255, 255, 1),
    inset 0 -12px 20px rgba(15, 23, 42, 0.14);
}

body[data-dsh-liquid-glass][data-ds-dark-theme] ${loc$1("sessionRow")}${loc$1("selected")},
body[data-dsh-liquid-glass][data-ds-dark-theme] ${loc$1("searchResultRow")}${loc$1("selected")} {
  background: rgba(255, 255, 255, 0.24);
  box-shadow:
    inset 3px 0 0 0 rgba(255, 255, 255, 0.70),
    inset 0 0 0 1.5px rgba(255, 255, 255, 0.42),
    inset 0 1px 0 rgba(255, 255, 255, 0.40),
    inset 0 -12px 20px rgba(0, 0, 0, 0.32);
}

${under(composerCard)} {
  border-radius: 26px;
}

${under(composerCard)}::before {
  -webkit-backdrop-filter: ${COMPOSER_WARP};
  backdrop-filter: ${COMPOSER_WARP};
}

${under(glassPills)} {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  background: transparent;
  background-image: ${ILLUMINATION};
  background-blend-mode: soft-light, screen;
  color: var(--dsw-alias-label-primary);
  border-color: rgba(255, 255, 255, 0.34);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.72),
    inset 1px 0 0 rgba(255, 255, 255, 0.28),
    inset -1px 0 0 rgba(255, 255, 255, 0.12),
    inset 0 -1px 0 rgba(255, 255, 255, 0.16),
    inset 0 0 0 0.5px rgba(255, 255, 255, 0.38),
    inset 0 10px 16px -10px rgba(255, 255, 255, 0.42);
}

${under(sendButton)} {
  transform: none;
  top: -2px;
}

${under(`${composerChips}:hover:not(:disabled)`)} {
  background: rgba(255, 255, 255, 0.18);
}

body[data-dsh-liquid-glass][data-ds-dark-theme] ${glassPills} {
  background-image:
    linear-gradient(165deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0) 28%),
    linear-gradient(345deg, rgba(120, 170, 255, 0.10) 0%, rgba(255, 255, 255, 0) 34%);
  border-color: rgba(255, 255, 255, 0.14);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.22),
    inset 1px 0 0 rgba(255, 255, 255, 0.10),
    inset -1px 0 0 rgba(255, 255, 255, 0.06),
    inset 0 -1px 0 rgba(255, 255, 255, 0.08),
    inset 0 0 0 0.5px rgba(255, 255, 255, 0.16),
    inset 0 10px 16px -10px rgba(255, 255, 255, 0.14);
}

body[data-dsh-liquid-glass][data-ds-dark-theme] ${composerChips}:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.10);
}

${under(bubble)} {
  border-radius: 22px;
}

${under(dialog)},
${under(settingsPanel)} {
  border-radius: 24px;
  box-shadow:
    0 18px 56px rgba(0, 0, 0, 0.16),
    0 4px 14px rgba(0, 0, 0, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.72),
    inset 1px 0 0 rgba(255, 255, 255, 0.28),
    inset -1px 0 0 rgba(255, 255, 255, 0.12),
    inset 0 -1px 0 rgba(255, 255, 255, 0.16),
    inset 0 0 0 0.5px rgba(255, 255, 255, 0.38),
    inset 0 22px 40px -18px rgba(255, 255, 255, 0.46),
    inset 0 -26px 36px -16px rgba(0, 0, 0, 0.12);
}

${under(dialog)}::before,
${under(settingsPanel)}::before {
  -webkit-backdrop-filter: ${DIALOG_WARP};
  backdrop-filter: ${DIALOG_WARP};
}

${under(settingsPanel)} > * {
  position: relative;
  z-index: 1;
}

body[data-dsh-liquid-glass][data-ds-dark-theme] ${dialog},
body[data-dsh-liquid-glass][data-ds-dark-theme] ${settingsPanel} {
  box-shadow:
    0 18px 56px rgba(0, 0, 0, 0.52),
    0 4px 14px rgba(0, 0, 0, 0.32),
    inset 0 1px 0 rgba(255, 255, 255, 0.22),
    inset 1px 0 0 rgba(255, 255, 255, 0.10),
    inset -1px 0 0 rgba(255, 255, 255, 0.06),
    inset 0 -1px 0 rgba(255, 255, 255, 0.08),
    inset 0 0 0 0.5px rgba(255, 255, 255, 0.16),
    inset 0 22px 40px -18px rgba(255, 255, 255, 0.16),
    inset 0 -26px 36px -16px rgba(0, 0, 0, 0.32);
}

${under(portal)},
${under(submenu)},
${under(menuList)},
${under(dropdown)},
${under(queuePanel)},
${under(goalBar)},
${under(todoCard)} {
  border-radius: 18px;
}

${under(toast)} {
  background-color: var(--dsw-alias-toast-bg);
  border-radius: 18px;
}

${under(hoverCard)} {
  --dsw-hovercard-bg: rgba(44, 44, 46, 0.58);
  border-radius: 18px;
}

${under(`${portal}:hover`)},
${under(`${hoverCard}:hover`)} {
  transform: translateY(-1px);
}

@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  body[data-dsh-liquid-glass] {${OPAQUE_LIGHT}
  }
  body[data-dsh-liquid-glass][data-ds-dark-theme] {${OPAQUE_DARK}
  }
  body[data-dsh-liquid-glass] ${all(SURFACES)} {
    background-image: none;
  }
  body[data-dsh-liquid-glass] ${all(FROST_HOSTS)} {
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
  }
  body[data-dsh-liquid-glass] ${all(WARP_BEFORE)}::before,
  body[data-dsh-liquid-glass] ${submenu}::after {
    content: none;
    filter: none;
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
  }
}

@media (prefers-reduced-transparency: reduce) {
  body[data-dsh-liquid-glass] {${OPAQUE_LIGHT}
  }
  body[data-dsh-liquid-glass][data-ds-dark-theme] {${OPAQUE_DARK}
  }
  body[data-dsh-liquid-glass] ${all(SURFACES)} {
    background-image: none;
  }
  body[data-dsh-liquid-glass] ${all(FROST_HOSTS)} {
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
  }
  body[data-dsh-liquid-glass] ${all(WARP_BEFORE)}::before,
  body[data-dsh-liquid-glass] ${submenu}::after {
    content: none;
    filter: none;
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  body[data-dsh-liquid-glass] ${all(SURFACES)} {
    transition: none;
  }
  ${under(`${portal}:hover`)},
  ${under(`${hoverCard}:hover`)} {
    transform: none;
  }
}
`.trim();
		//#endregion
		//#region src/client/fluid-runtime.ts
		/** Body / canvas / style marker for the fluid backdrop. */
		const FLUID_ATTRIBUTE = "data-dsh-fluid";
		function loc(local) {
			return `:is([class*="_${local}_"], [class*="_${local} "], [class$="_${local}"])`;
		}
		const frame = `${loc("frame")}:has(${loc("sidebarCol")})`;
		const center = loc("centerCol");
		const details = loc("detailsCol");
		/** Punch-through sheet so the fluid canvas is visible without the glass overlay. */
		const FLUID_STYLES = `
body[${FLUID_ATTRIBUTE}] {
  background: transparent;
}

html:has(body[${FLUID_ATTRIBUTE}]) {
  background: transparent;
}

body[${FLUID_ATTRIBUTE}] #root {
  background: transparent;
}

body[${FLUID_ATTRIBUTE}] ${frame},
body[${FLUID_ATTRIBUTE}] ${center},
body[${FLUID_ATTRIBUTE}] ${center} > *,
body[${FLUID_ATTRIBUTE}] ${details},
body[${FLUID_ATTRIBUTE}] ${loc("root")}:has([data-conversation-scroll]),
body[${FLUID_ATTRIBUTE}] ${details} ${loc("root")},
body[${FLUID_ATTRIBUTE}] ${loc("root")}[data-phase='active'] ${loc("composerSeat")} {
  background-color: transparent;
  background-image: none;
}

body[${FLUID_ATTRIBUTE}] ${center},
body[${FLUID_ATTRIBUTE}] ${details} {
  --dsw-alias-bg-base: transparent;
}

canvas[${FLUID_ATTRIBUTE}] {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  z-index: -1;
  pointer-events: none;
}
`.trim();
		function compileShader(gl, type, source) {
			const shader = gl.createShader(type);
			if (shader === null) return void 0;
			gl.shaderSource(shader, source);
			gl.compileShader(shader);
			if (gl.getShaderParameter(shader, gl.COMPILE_STATUS) !== true) {
				gl.deleteShader(shader);
				return;
			}
			return shader;
		}
		function createProgram(gl) {
			const vertex = compileShader(gl, gl.VERTEX_SHADER, FLUID_VERTEX_SOURCE);
			const fragment = compileShader(gl, gl.FRAGMENT_SHADER, FLUID_FRAGMENT_SOURCE);
			if (vertex === void 0 || fragment === void 0) {
				if (vertex !== void 0) gl.deleteShader(vertex);
				if (fragment !== void 0) gl.deleteShader(fragment);
				return;
			}
			const program = gl.createProgram();
			gl.attachShader(program, vertex);
			gl.attachShader(program, fragment);
			gl.linkProgram(program);
			gl.deleteShader(vertex);
			gl.deleteShader(fragment);
			if (gl.getProgramParameter(program, gl.LINK_STATUS) !== true) {
				gl.deleteProgram(program);
				return;
			}
			return program;
		}
		function fallbackCss(state) {
			const hex = state.colors.map(rgbToHex);
			return `linear-gradient(160deg, ${hex[0]}, ${hex[1]}, ${hex[2]}, ${hex[3]})`;
		}
		/**
		* Drive one canvas with the Isolation-style fluid program, or a CSS gradient.
		* @param canvas - fullscreen backdrop canvas.
		* @param options - optional GL and clock hooks.
		* @returns a writer/stopper pair.
		*/
		function createFluidRenderer(canvas, options = {}) {
			const gl = options.gl === void 0 ? canvas.getContext("webgl", {
				alpha: false,
				antialias: false,
				depth: false,
				stencil: false
			}) : options.gl;
			const now = options.now ?? (() => typeof performance === "undefined" ? Date.now() : performance.now());
			const raf = options.raf ?? (typeof requestAnimationFrame === "function" ? requestAnimationFrame : void 0);
			const caf = options.caf ?? (typeof cancelAnimationFrame === "function" ? cancelAnimationFrame : void 0);
			const reducedMotion = options.reducedMotion ?? (typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches);
			let state = resolveFluidDrawState("silk", 1, ...DEFAULT_FLUID_COLORS);
			let handle = 0;
			let running = true;
			const origin = now();
			if (gl === null) {
				const write = (next) => {
					state = next;
					canvas.style.display = "none";
					const parent = canvas.parentElement;
					if (parent !== null) parent.style.background = fallbackCss(next);
				};
				return {
					write,
					stop: () => {
						running = false;
						const parent = canvas.parentElement;
						if (parent !== null) parent.style.background = "";
					},
					webgl: false
				};
			}
			const program = createProgram(gl);
			if (program === void 0) return createFluidRenderer(canvas, {
				...options,
				gl: null
			});
			const buffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
				-1,
				-1,
				1,
				-1,
				-1,
				1,
				1,
				1
			]), gl.STATIC_DRAW);
			const aPos = gl.getAttribLocation(program, "a_pos");
			const uResolution = gl.getUniformLocation(program, "u_resolution");
			const uTime = gl.getUniformLocation(program, "u_time");
			const uColor1 = gl.getUniformLocation(program, "u_color1");
			const uColor2 = gl.getUniformLocation(program, "u_color2");
			const uColor3 = gl.getUniformLocation(program, "u_color3");
			const uColor4 = gl.getUniformLocation(program, "u_color4");
			const uFrequency = gl.getUniformLocation(program, "u_frequency");
			const uAmplitude = gl.getUniformLocation(program, "u_amplitude");
			const uSpeed = gl.getUniformLocation(program, "u_speed");
			const uHsv = gl.getUniformLocation(program, "u_hsv");
			const uWave = gl.getUniformLocation(program, "u_wave");
			const resize = () => {
				const dpr = typeof devicePixelRatio === "number" ? Math.min(devicePixelRatio, 2) : 1;
				const width = Math.max(1, Math.floor((canvas.clientWidth || 1) * dpr));
				const height = Math.max(1, Math.floor((canvas.clientHeight || 1) * dpr));
				if (canvas.width !== width || canvas.height !== height) {
					canvas.width = width;
					canvas.height = height;
				}
				gl.viewport(0, 0, canvas.width, canvas.height);
			};
			const draw = () => {
				resize();
				gl.useProgram(program);
				gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
				gl.enableVertexAttribArray(aPos);
				gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
				gl.uniform2f(uResolution, canvas.width, canvas.height);
				gl.uniform1f(uTime, (now() - origin) / 1e3);
				gl.uniform3f(uColor1, state.colors[0][0], state.colors[0][1], state.colors[0][2]);
				gl.uniform3f(uColor2, state.colors[1][0], state.colors[1][1], state.colors[1][2]);
				gl.uniform3f(uColor3, state.colors[2][0], state.colors[2][1], state.colors[2][2]);
				gl.uniform3f(uColor4, state.colors[3][0], state.colors[3][1], state.colors[3][2]);
				gl.uniform1f(uFrequency, state.frequency);
				gl.uniform1f(uAmplitude, state.amplitude);
				gl.uniform1f(uSpeed, state.speed);
				gl.uniform1f(uHsv, state.hsv ? 1 : 0);
				gl.uniform1f(uWave, state.wave ? 1 : 0);
				gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
			};
			const tick = () => {
				if (!running) return;
				draw();
				if (!reducedMotion && raf !== void 0) handle = raf(tick);
			};
			const write = (next) => {
				state = next;
				if (reducedMotion || raf === void 0) draw();
			};
			tick();
			return {
				write,
				stop: () => {
					running = false;
					if (handle !== 0 && caf !== void 0) caf(handle);
					gl.deleteBuffer(buffer);
					gl.deleteProgram(program);
				},
				webgl: true
			};
		}
		/**
		* Insert the fluid canvas and punch-through sheet. The disposer removes both.
		* @param section - current host section.
		* @param options - optional renderer hooks.
		* @returns dispose/write pair. No-ops when `document` is missing.
		*/
		function installFluidBackdrop(section, options = {}) {
			/* v8 ignore next -- node client-tree boots have no document */
			if (typeof document === "undefined") return {
				dispose: () => {},
				write: () => {}
			};
			const style = document.createElement("style");
			style.setAttribute(FLUID_ATTRIBUTE, "");
			style.textContent = FLUID_STYLES;
			document.head.append(style);
			const canvas = document.createElement("canvas");
			canvas.setAttribute(FLUID_ATTRIBUTE, "");
			canvas.setAttribute("aria-hidden", "true");
			document.body.prepend(canvas);
			document.body.setAttribute(FLUID_ATTRIBUTE, "");
			const renderer = createFluidRenderer(canvas, options);
			const write = (next) => {
				renderer.write(resolveFluidDrawState(next.fluidPreset, next.fluidSpeed, next.fluidColor1, next.fluidColor2, next.fluidColor3, next.fluidColor4));
			};
			write(section);
			return {
				dispose: () => {
					renderer.stop();
					canvas.remove();
					style.remove();
					document.body.removeAttribute(FLUID_ATTRIBUTE);
				},
				write
			};
		}
		//#endregion
		//#region src/client/motion-styles.ts
		/**
		* Composer popover motion sheet. Scoped to `body[data-dsh-motion]`, not the
		* glass attribute, so the switch works with Liquid Glass off.
		*/
		/** Body / style marker for interaction motion. */
		const MOTION_ATTRIBUTE = "data-dsh-motion";
		/** Marker on a cloned surface playing the open animation. */
		const MOTION_ENTER_ATTRIBUTE = "data-dsh-motion-enter";
		/** Marker on a cloned surface playing the close animation. */
		const MOTION_EXIT_ATTRIBUTE = "data-dsh-motion-exit";
		/** Marker on the fixed viewport covering a live plate during an inner slide. */
		const MOTION_PANE_ATTRIBUTE = "data-dsh-motion-pane";
		/** Marker on the 200%-wide CSS track inside a pane viewport. */
		const MOTION_PANE_TRACK_ATTRIBUTE = "data-dsh-motion-pane-track";
		/** Marker on one 50% slide of a pane track. */
		const MOTION_PANE_SLIDE_ATTRIBUTE = "data-dsh-motion-pane-slide";
		const ghost = `[${MOTION_ENTER_ATTRIBUTE}], [${MOTION_EXIT_ATTRIBUTE}], [${MOTION_PANE_ATTRIBUTE}]`;
		/** Ghost clones must not run frost or SVG displacement — those make open jank
		* and isolate backdrop-filter so the plate looks opaque. */
		const MOTION_STYLES = `
body[${MOTION_ATTRIBUTE}] ${ghost} {
  pointer-events: none;
  filter: none !important;
  -webkit-backdrop-filter: none !important;
  backdrop-filter: none !important;
}

body[${MOTION_ATTRIBUTE}] ${ghost}::before,
body[${MOTION_ATTRIBUTE}] ${ghost}::after {
  content: none !important;
  filter: none !important;
  -webkit-backdrop-filter: none !important;
  backdrop-filter: none !important;
}

body[${MOTION_ATTRIBUTE}] [${MOTION_PANE_TRACK_ATTRIBUTE}] {
  display: flex;
  align-items: flex-start;
  width: 200%;
  height: 100%;
  transform: translateX(0);
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
}

body[${MOTION_ATTRIBUTE}] [${MOTION_PANE_TRACK_ATTRIBUTE}][data-depth="1"] {
  transform: translateX(-50%);
}

body[${MOTION_ATTRIBUTE}] [${MOTION_PANE_SLIDE_ATTRIBUTE}] {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  flex: 0 0 50%;
  width: 50%;
  min-width: 0;
  overflow: hidden;
}

@media (prefers-reduced-motion: reduce) {
  body[${MOTION_ATTRIBUTE}] [${MOTION_PANE_TRACK_ATTRIBUTE}] {
    transition: none;
  }
}
`.trim();
		//#endregion
		//#region src/client/motion-runtime.ts
		/**
		* Independent composer-popover motion. The live plate is never animated —
		* `transform` / `opacity` / `clip-path` on it isolate backdrop-filter.
		* An empty ghost card is sized to the laid-out plate and scaled from the
		* trigger, then faded so the already-settled glass shows through.
		*/
		const LOCAL_TOKEN = (local) => (cls) => cls.includes(`_${local}_`) || cls.endsWith(`_${local}`);
		const lastLayout = /* @__PURE__ */ new WeakMap();
		/** Last inner children of an open plate, for a later pane slide. */
		const lastPane = /* @__PURE__ */ new WeakMap();
		/**
		* Whether a node is a popover or dialog this overlay animates.
		* @param node - a DOM node, usually a MutationObserver removed child.
		* @returns true when the node is a menu, submenu, Menu list, context panel, or settings dialog.
		*/
		function isMotionSurface(node) {
			if (!(node instanceof HTMLElement) || node.hasAttribute("data-dsh-motion-exit") || node.hasAttribute("data-dsh-motion-enter") || node.hasAttribute("data-dsh-motion-pane")) return false;
			const classes = [...node.classList];
			const has = (local) => classes.some(LOCAL_TOKEN(local));
			if (has("menu") || has("submenu")) return true;
			if (has("list") && node.querySelector("[class*=\"_itemWrap_\"], [class*=\"_itemWrap \"], [class$=\"_itemWrap\"]") !== null) return true;
			if (!has("panel")) return false;
			if (node.getAttribute("role") === "dialog") return true;
			return node.querySelector("[class*=\"_percent_\"], [class*=\"_percent \"], [class$=\"_percent\"]") !== null;
		}
		/** Whether inner childList changes on this plate may play a Model/Effort pane slide. */
		function allowsPaneSlide(el) {
			return ![...el.classList].some(LOCAL_TOKEN("panel"));
		}
		/**
		* Pick a transform origin from the surface's CSS anchors.
		* @param el - a positioned popover still in (or reinserted into) the document.
		* @returns a CSS `transform-origin` pair.
		*/
		function originFor(el) {
			const style = getComputedStyle(el);
			const unset = (value) => value === "" || value === "auto";
			return `${!unset(style.bottom) && unset(style.top) ? "bottom" : "top"} ${!unset(style.right) && unset(style.left) ? "right" : "left"}`;
		}
		/**
		* Pick the corner of the menu that sits toward the trigger.
		* @param menu - the popover's viewport box.
		* @param trigger - the trigger's viewport box, or null when unknown.
		* @returns a CSS `transform-origin` pair.
		*/
		function originFromRects(menu, trigger) {
			if (trigger === null) return "bottom left";
			const cx = trigger.left + trigger.width / 2;
			return `${trigger.top + trigger.height / 2 >= menu.top + menu.height / 2 ? "bottom" : "top"} ${cx >= menu.left + menu.width / 2 ? "right" : "left"}`;
		}
		/** Quote an id for use inside an attribute selector. */
		function escapeAttr(value) {
			if (typeof CSS !== "undefined" && typeof CSS.escape === "function") return CSS.escape(value);
			return value.replace(/["\\]/g, "\\$&");
		}
		/** Whether `el` is `document.body` — portaled lists land here. */
		function isDocumentRoot(el) {
			return el === el.ownerDocument.body;
		}
		/** Whether `el` can be this popover's trigger. */
		function isTriggerCandidate(el, menu) {
			if (!(el instanceof HTMLElement) || el === menu) return false;
			if (menu.contains(el) || el.contains(menu)) return false;
			return el.tagName === "BUTTON" || el.getAttribute("aria-haspopup") !== null;
		}
		/** Whether an expanded control's `aria-haspopup` matches this surface. */
		function matchesSurface(el, menu) {
			const role = menu.getAttribute("role");
			const kind = el.getAttribute("aria-haspopup");
			if (role === "dialog") return kind === "dialog";
			return kind === "menu" || kind === "listbox" || kind === "true";
		}
		/** Squared gap between two boxes (0 when they overlap). */
		function rectGap2(a, b) {
			const dx = Math.max(b.left - a.right, a.left - b.right, 0);
			const dy = Math.max(b.top - a.bottom, a.top - b.bottom, 0);
			return dx * dx + dy * dy;
		}
		/**
		* Among expanded popup triggers, pick the one sitting next to the plate.
		* Portaled lists live under `document.body`, so a document-order walk would
		* hit the settings gear (`aria-haspopup=dialog`) first.
		* @param menu - the live popover.
		* @param menuRect - the popover's viewport box.
		* @returns the nearest matching trigger, or null.
		*/
		function nearestExpandedTrigger(menu, menuRect) {
			const matching = [];
			for (const candidate of menu.ownerDocument.querySelectorAll("[aria-expanded=\"true\"]")) if (isTriggerCandidate(candidate, menu) && matchesSurface(candidate, menu)) matching.push(candidate);
			let best = null;
			let bestGap = Infinity;
			for (const el of matching) {
				const gap = rectGap2(menuRect, el.getBoundingClientRect());
				if (gap < bestGap) {
					bestGap = gap;
					best = el;
				}
			}
			return best;
		}
		/**
		* Find the button that opened this popover. Prefer a direct sibling (the
		* Menu primitive's trigger often has no `aria-expanded`), then an expanded
		* control in a local ancestor. A list portaled to `document.body` uses the
		* nearest expanded `aria-haspopup=menu|listbox` control — never the first
		* expanded button in the document (the settings gear is `dialog`).
		* @param menu - the live popover.
		* @param menuRect - the popover's viewport box, when already measured.
		* @returns the trigger, or null.
		*/
		function findTrigger(menu, menuRect) {
			const id = menu.id;
			if (id !== "") {
				const byControls = menu.ownerDocument.querySelector(`[aria-controls="${escapeAttr(id)}"]`);
				if (byControls instanceof HTMLElement) return byControls;
			}
			const parent = menu.parentElement;
			if (parent === null) return null;
			if (!isDocumentRoot(parent)) {
				for (const child of parent.children) if (isTriggerCandidate(child, menu)) return child;
			}
			let ancestor = parent;
			let fallback = null;
			while (ancestor !== null && !isDocumentRoot(ancestor)) {
				for (const candidate of ancestor.querySelectorAll("[aria-expanded=\"true\"]")) if (isTriggerCandidate(candidate, menu)) return candidate;
				if (fallback === null) {
					for (const candidate of ancestor.querySelectorAll("button, [aria-haspopup]")) if (isTriggerCandidate(candidate, menu)) {
						fallback = candidate;
						break;
					}
				}
				ancestor = ancestor.parentElement;
			}
			if (fallback !== null) return fallback;
			return nearestExpandedTrigger(menu, menuRect ?? menu.getBoundingClientRect());
		}
		/**
		* Resolve the open/close corner from the trigger when one exists.
		* @param menu - the live popover.
		* @param menuRect - the popover's viewport box.
		* @returns a CSS `transform-origin` pair.
		*/
		function resolveOrigin(menu, menuRect) {
			const trigger = findTrigger(menu, menuRect);
			if (trigger === null) return originFor(menu);
			return originFromRects(menuRect, trigger.getBoundingClientRect());
		}
		/** Surfaces inside an added or removed subtree. */
		function surfacesIn(node) {
			if (isMotionSurface(node)) return [node];
			if (!(node instanceof HTMLElement)) return [];
			return [...node.querySelectorAll("*")].filter(isMotionSurface);
		}
		/**
		* Whether the environment asks to skip motion.
		* @param query - optional override (tests).
		* @returns true when motion must not run.
		*/
		function prefersReducedMotion(query) {
			if (query !== void 0) return query();
			return typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
		}
		const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
		function afterPaint(frame, callback) {
			frame(() => {
				frame(callback);
			});
		}
		/** Inner pane slides stay readable: twice the open duration, at least 280ms. */
		function paneSlideMs(openMs) {
			return Math.min(600, Math.max(280, Math.round(openMs * 2)));
		}
		/** Classify a plate's inner content as the Model/Effort root, a drilled list, or other. */
		function paneKind(el) {
			if (el.querySelector("[class*=\"_option_\"], [class*=\"_option \"], [class$=\"_option\"]") !== null) return "list";
			if (el.querySelector("[class*=\"_cell_\"], [class*=\"_cell \"], [class$=\"_cell\"]") !== null) return "root";
			return "other";
		}
		function paneSignature(el) {
			return `${paneKind(el)}:${String(el.childElementCount)}:${[...el.children].map((child) => child.className).join("|")}`;
		}
		function snapshotPane(el) {
			lastPane.set(el, {
				kind: paneKind(el),
				signature: paneSignature(el),
				clones: [...el.children].filter((child) => child instanceof HTMLElement).map((child) => child.cloneNode(true))
			});
		}
		/** The motion surface that contains `node`, if any. */
		function enclosingSurface(node) {
			let current = node;
			while (current !== null) {
				if (isMotionSurface(current)) return current;
				current = current.parentNode;
			}
			return null;
		}
		/**
		* Copy the plate's padding, border, and column flex onto an overlay so
		* cloned children sit on the same content box as the live menu.
		* @param target - the overlay viewport.
		* @param source - the live plate.
		*/
		function applyPlateInsets(target, source) {
			const style = getComputedStyle(source);
			target.style.paddingTop = style.paddingTop;
			target.style.paddingRight = style.paddingRight;
			target.style.paddingBottom = style.paddingBottom;
			target.style.paddingLeft = style.paddingLeft;
			target.style.borderTopWidth = style.borderTopWidth;
			target.style.borderRightWidth = style.borderRightWidth;
			target.style.borderBottomWidth = style.borderBottomWidth;
			target.style.borderLeftWidth = style.borderLeftWidth;
			target.style.borderStyle = style.borderStyle === "none" ? "none" : "solid";
			target.style.borderColor = "transparent";
			target.style.display = "flex";
			target.style.flexDirection = "column";
			target.style.color = style.color;
			target.style.font = style.font;
		}
		function createGhost(rect, origin, attr) {
			const ghost = document.createElement("div");
			ghost.setAttribute(attr, "");
			ghost.style.position = "fixed";
			ghost.style.left = `${String(rect.left)}px`;
			ghost.style.top = `${String(rect.top)}px`;
			ghost.style.width = `${String(rect.width)}px`;
			ghost.style.height = `${String(rect.height)}px`;
			ghost.style.boxSizing = "border-box";
			ghost.style.borderRadius = "12px";
			ghost.style.pointerEvents = "none";
			ghost.style.transformOrigin = origin;
			ghost.style.zIndex = "2147483000";
			ghost.style.background = "var(--dsw-specific-menu, rgba(255,255,255,0.4))";
			document.body.append(ghost);
			return ghost;
		}
		/**
		* Cover the live plate with an empty card that matches its laid-out box,
		* scale from the trigger, then fade the card after frost has painted.
		* @param node - the live popover, still in the document.
		* @param animate - WAAPI animate.
		* @param paint - frame, measure, and duration hooks.
		* @returns the ghost handle, or undefined when the node has no element parent.
		*/
		function playMotionEnter(node, animate, paint = {}) {
			if (node.parentElement === null) return void 0;
			const frame = paint.frame ?? ((callback) => requestAnimationFrame(callback));
			const measure = paint.measure ?? ((el) => el.getBoundingClientRect());
			let cancelled = false;
			let ghost;
			let phase;
			const previous = node.style.visibility;
			const finish = () => {
				cancelled = true;
				node.style.visibility = previous;
				ghost?.remove();
			};
			node.style.visibility = "hidden";
			const start = (attempt) => {
				if (cancelled) return;
				const rect = measure(node);
				if (rect.width < 2 || rect.height < 2) {
					if (attempt === 0) {
						frame(() => {
							start(1);
						});
						return;
					}
					finish();
					return;
				}
				const origin = resolveOrigin(node, rect);
				lastLayout.set(node, {
					rect,
					origin
				});
				snapshotPane(node);
				ghost = createGhost(rect, origin, MOTION_ENTER_ATTRIBUTE);
				const openMs = paint.openMs ?? 160;
				const fadeDuration = paint.fadeMs ?? 120;
				const grow = animate(ghost, [{ transform: "scale(0.72, 0.55)" }, { transform: "none" }], {
					duration: openMs,
					easing: EASE,
					fill: "forwards"
				});
				phase = grow;
				grow.addEventListener("finish", () => {
					node.style.visibility = previous;
					afterPaint(frame, () => {
						if (cancelled || ghost === void 0) return;
						const fade = animate(ghost, [{ opacity: 1 }, { opacity: 0 }], {
							duration: fadeDuration,
							fill: "forwards"
						});
						phase = fade;
						fade.addEventListener("finish", finish);
						fade.addEventListener("cancel", finish);
					});
				});
				grow.addEventListener("cancel", finish);
			};
			frame(() => {
				start(0);
			});
			return {
				get clone() {
					return ghost;
				},
				cancel: () => {
					if (phase !== void 0 && typeof phase.cancel === "function") phase.cancel();
					finish();
				}
			};
		}
		/**
		* Play the close scale on an empty ghost sized to the last open box.
		* @param node - the departing surface (may already be detached).
		* @param animate - WAAPI animate.
		* @param paint - measure hook when the plate is still connected.
		*/
		function playMotionExit(node, animate, paint = {}) {
			const measure = paint.measure ?? ((el) => el.getBoundingClientRect());
			const stored = lastLayout.get(node);
			let rect = stored?.rect;
			let origin = stored?.origin ?? "bottom left";
			if ((rect === void 0 || rect.width < 2) && node.isConnected) {
				rect = measure(node);
				origin = resolveOrigin(node, rect);
			}
			if (rect === void 0 || rect.width < 2 || rect.height < 2) return void 0;
			const ghost = createGhost(rect, origin, MOTION_EXIT_ATTRIBUTE);
			const animation = animate(ghost, [{
				transform: "none",
				opacity: 1
			}, {
				transform: "scale(0.72, 0.55)",
				opacity: 0
			}], {
				duration: paint.closeMs ?? 120,
				easing: EASE,
				fill: "forwards"
			});
			const done = () => {
				ghost.remove();
			};
			animation.addEventListener("finish", done);
			animation.addEventListener("cancel", done);
			return ghost;
		}
		/**
		* Cover a live plate with a 200%-wide CSS track (`translateX(-50%)` on
		* `data-depth=1`) after its inner children swapped. When the track
		* settles, the live glass is shown and the overlay fades out — the same
		* tail as {@link playMotionEnter}. The host is not transformed.
		* @param node - the live plate, still in the document.
		* @param outgoing - clones of the children that just left.
		* @param direction - `forward` starts at depth 0; `back` starts at depth 1.
		* @param paint - frame, measure, and duration hooks.
		* @returns the viewport, or undefined when the plate has no size.
		*/
		function playPaneSlide(node, outgoing, direction, paint = {}) {
			const frame = paint.frame ?? ((callback) => requestAnimationFrame(callback));
			const rect = (paint.measure ?? ((el) => el.getBoundingClientRect()))(node);
			if (rect.width < 2 || rect.height < 2) return void 0;
			const previous = node.style.visibility;
			node.style.visibility = "hidden";
			const openMs = paint.openMs ?? 160;
			const viewport = createGhost(rect, "top left", MOTION_PANE_ATTRIBUTE);
			viewport.style.overflow = "hidden";
			viewport.style.opacity = "1";
			viewport.style.transitionProperty = "opacity";
			viewport.style.transitionDuration = `${String(paint.fadeMs ?? 120)}ms`;
			applyPlateInsets(viewport, node);
			const track = document.createElement("div");
			track.setAttribute(MOTION_PANE_TRACK_ATTRIBUTE, "");
			track.style.transitionDuration = `${String(paneSlideMs(openMs))}ms`;
			const outSlide = document.createElement("div");
			outSlide.setAttribute(MOTION_PANE_SLIDE_ATTRIBUTE, "");
			for (const child of outgoing) outSlide.append(child);
			const inSlide = document.createElement("div");
			inSlide.setAttribute(MOTION_PANE_SLIDE_ATTRIBUTE, "");
			for (const child of node.children) inSlide.append(child.cloneNode(true));
			if (direction === "forward") track.append(outSlide, inSlide);
			else track.append(inSlide, outSlide);
			track.setAttribute("data-depth", direction === "forward" ? "0" : "1");
			viewport.append(track);
			const done = () => {
				node.style.visibility = previous;
				viewport.remove();
				snapshotPane(node);
				lastLayout.set(node, {
					rect,
					origin: lastLayout.get(node)?.origin ?? resolveOrigin(node, rect)
				});
			};
			if (prefersReducedMotion()) {
				track.setAttribute("data-depth", direction === "forward" ? "1" : "0");
				done();
				return viewport;
			}
			const onFade = (event) => {
				const name = "propertyName" in event ? String(event.propertyName) : "";
				if (event.target !== viewport || name !== "opacity") return;
				viewport.removeEventListener("transitionend", onFade);
				done();
			};
			const onEnd = (event) => {
				const name = "propertyName" in event ? String(event.propertyName) : "";
				if (event.target !== track || name !== "transform") return;
				track.removeEventListener("transitionend", onEnd);
				node.style.visibility = previous;
				afterPaint(frame, () => {
					viewport.addEventListener("transitionend", onFade);
					viewport.style.opacity = "0";
				});
			};
			track.addEventListener("transitionend", onEnd);
			afterPaint(frame, () => {
				track.setAttribute("data-depth", direction === "forward" ? "1" : "0");
			});
			return viewport;
		}
		/**
		* Stamp the motion attribute, inject the ghost stylesheet, and observe opens.
		* @param options - reduced-motion, animate, and paint hooks.
		* @returns a disposer that removes the sheet, attribute, ghosts, and observer.
		*/
		function installMotion(options = {}) {
			/* v8 ignore next -- node client-tree boots have no document */
			if (typeof document === "undefined") return {
				dispose: () => {},
				write: () => {}
			};
			const style = document.createElement("style");
			style.setAttribute(MOTION_ATTRIBUTE, "");
			style.textContent = MOTION_STYLES;
			document.head.append(style);
			document.body.setAttribute(MOTION_ATTRIBUTE, "");
			const reduced = options.reducedMotion ?? prefersReducedMotion();
			const run = options.animate ?? (typeof Element !== "undefined" && typeof Element.prototype.animate === "function" ? (el, keyframes, opts) => Element.prototype.animate.call(el, keyframes, opts) : void 0);
			const paint = {
				...options.frame === void 0 ? {} : { frame: options.frame },
				...options.measure === void 0 ? {} : { measure: options.measure },
				openMs: options.openMs ?? 160,
				closeMs: options.closeMs ?? 120,
				fadeMs: options.fadeMs ?? 120
			};
			let observer;
			const enters = /* @__PURE__ */ new Map();
			if (!reduced && run !== void 0) {
				const paneQueued = /* @__PURE__ */ new Set();
				const queuePane = (surface) => {
					/* v8 ignore next -- same plate can mutate twice in one observer turn */
					if (paneQueued.has(surface)) return;
					paneQueued.add(surface);
					(paint.frame ?? ((callback) => requestAnimationFrame(callback)))(() => {
						paneQueued.delete(surface);
						/* v8 ignore next -- the plate can unmount between the observer and the frame */
						if (!surface.isConnected) return;
						const prev = lastPane.get(surface);
						if (prev === void 0 || !allowsPaneSlide(surface)) {
							snapshotPane(surface);
							return;
						}
						const nextKind = paneKind(surface);
						const nextSig = paneSignature(surface);
						if (prev.signature === nextSig) return;
						if (prev.kind === "other" && nextKind === "root") {
							snapshotPane(surface);
							return;
						}
						const direction = prev.kind === "list" && nextKind === "root" ? "back" : "forward";
						playPaneSlide(surface, prev.clones, direction, paint);
					});
				};
				observer = new MutationObserver((records) => {
					const addedSurfaces = /* @__PURE__ */ new Set();
					for (const record of records) {
						for (const added of record.addedNodes) for (const surface of surfacesIn(added)) {
							addedSurfaces.add(surface);
							const handle = playMotionEnter(surface, run, paint);
							/* v8 ignore next -- added surfaces are parented */
							if (handle !== void 0) enters.set(surface, handle);
						}
						for (const removed of record.removedNodes) for (const surface of surfacesIn(removed)) {
							enters.get(surface)?.cancel();
							enters.delete(surface);
							lastPane.delete(surface);
							playMotionExit(surface, run, paint);
						}
					}
					const hosts = /* @__PURE__ */ new Set();
					for (const record of records) {
						const host = enclosingSurface(record.target);
						if (host === null || addedSurfaces.has(host) || !host.isConnected) continue;
						hosts.add(host);
					}
					for (const host of hosts) queuePane(host);
				});
				observer.observe(document.body, {
					childList: true,
					subtree: true
				});
			}
			return {
				write: (next) => {
					paint.openMs = next.motionOpenMs;
					paint.closeMs = next.motionCloseMs;
					paint.fadeMs = next.motionFadeMs;
				},
				dispose: () => {
					observer?.disconnect();
					for (const handle of enters.values()) handle.cancel();
					enters.clear();
					style.remove();
					document.body.removeAttribute(MOTION_ATTRIBUTE);
					document.querySelectorAll(`[${MOTION_ENTER_ATTRIBUTE}], [${MOTION_EXIT_ATTRIBUTE}], [${MOTION_PANE_ATTRIBUTE}]`).forEach((node) => {
						node.remove();
					});
				}
			};
		}
		//#endregion
		//#region src/client/index.ts
		/** Namespace owning this feature's settings-row copy. */
		const SETTINGS_NS = "settings.liquidGlass";
		/**
		* Required services: theme overlay, settings transport, and slots/locale for
		* the General-section row. `remote` carries the forwarded settings
		* invalidation that the settings-scope binder subscribes to on this context.
		*/
		const inject = [
			"theme",
			"settingsScope",
			"slots",
			"locale",
			"connection",
			"remote"
		];
		/**
		* Stamp the overlay attribute, insert the scoped stylesheet, stack the token
		* layer, and insert the shared SVG lens (shader map + chromatic displacement).
		* Firefox also gets `data-dsh-liquid-glass-engine=css` so the sheet skips
		* `filter: url(#…)`. The disposer reverses every write.
		* @param ctx - client context that owns ThemeRuntime.
		* @returns disposer removing the layer, the style node, the filter SVG, and the body attributes.
		*/
		function installOverlay(ctx, section) {
			/* v8 ignore next -- node client-tree boots have no document; the overlay is browser-only */
			if (typeof document === "undefined") return {
				dispose: () => {},
				write: () => {}
			};
			const disposeTokens = ctx.theme.overrideTokens(GLASS_TOKEN_SOURCE, GLASS_TOKEN_OVERRIDES);
			const style = document.createElement("style");
			style.setAttribute(GLASS_STYLE_ATTRIBUTE, "");
			style.textContent = GLASS_STYLES;
			document.head.append(style);
			const defs = document.createElement("div");
			defs.setAttribute(GLASS_STYLE_ATTRIBUTE, "defs");
			defs.style.position = "absolute";
			defs.style.width = "0";
			defs.style.height = "0";
			defs.style.overflow = "hidden";
			document.body.append(defs);
			document.body.setAttribute(GLASS_STYLE_ATTRIBUTE, "");
			if (typeof navigator !== "undefined" && isCssOnlyGlassEngine(navigator.userAgent)) document.body.setAttribute(GLASS_ENGINE_ATTRIBUTE, "css");
			const write = (next) => {
				writeGlassAppearance(document.body, defs, next);
			};
			write(section);
			return {
				dispose: () => {
					disposeTokens();
					style.remove();
					defs.remove();
					document.body.removeAttribute(GLASS_STYLE_ATTRIBUTE);
					document.body.removeAttribute(GLASS_ENGINE_ATTRIBUTE);
					clearGlassAppearance(document.body);
				},
				write
			};
		}
		/**
		* Client plugin body: subscribe to the durable overlay flag, apply or retract
		* the glass layer, and register the feature-owned settings row.
		* @param ctx - client cordis context.
		*/
		function apply(ctx) {
			const host = ctx.settingsScope.bind({ namespace: GLASS_SETTINGS_NAMESPACE });
			ctx.effect(() => ctx.locale.register(SETTINGS_NS, {
				zh,
				en
			}), "ui-theme-liquid-glass: settings row dictionaries");
			const store = createLiquidGlassRowStore();
			let bound;
			let revision = 0;
			let disposeOverlay;
			let writeAppearance;
			let disposeFluid;
			let writeFluid;
			let disposeMotion;
			let writeMotion;
			const setOverlay = (section) => {
				if (section.enabled) {
					disposeOverlay ??= ctx.effect(() => {
						const overlay = installOverlay(ctx, section);
						writeAppearance = overlay.write;
						return overlay.dispose;
					}, "ui-theme-liquid-glass: overlay");
					writeAppearance?.(section);
					return;
				}
				if (disposeOverlay === void 0) return;
				disposeOverlay();
				disposeOverlay = void 0;
				writeAppearance = void 0;
			};
			const setFluid = (section) => {
				if (section.fluidEnabled) {
					disposeFluid ??= ctx.effect(() => {
						const fluid = installFluidBackdrop(section);
						writeFluid = fluid.write;
						return fluid.dispose;
					}, "ui-theme-liquid-glass: fluid backdrop");
					writeFluid?.(section);
					return;
				}
				if (disposeFluid === void 0) return;
				disposeFluid();
				disposeFluid = void 0;
				writeFluid = void 0;
			};
			const setMotion = (section) => {
				if (section.motionEnabled) {
					disposeMotion ??= ctx.effect(() => {
						const motion = installMotion();
						writeMotion = motion.write;
						return () => {
							writeMotion = void 0;
							motion.dispose();
						};
					}, "ui-theme-liquid-glass: interaction motion");
					writeMotion?.(section);
					return;
				}
				if (disposeMotion === void 0) return;
				disposeMotion();
				disposeMotion = void 0;
				writeMotion = void 0;
			};
			const adopt = () => {
				const section = host.getSnapshot().value;
				if (section === void 0) return;
				const resolved = resolveGlassSettings(section);
				revision += 1;
				bound?.sync(resolved, revision);
				setOverlay(resolved);
				setFluid(resolved);
				setMotion(resolved);
			};
			ctx.effect(() => {
				const unsub = host.subscribe(adopt);
				adopt();
				return () => {
					unsub();
					setOverlay(resolveGlassSettings({ enabled: false }));
					setFluid(resolveGlassSettings({ fluidEnabled: false }));
					setMotion(resolveGlassSettings({ motionEnabled: false }));
				};
			}, "ui-theme-liquid-glass: settings scope adoption");
			const injected = (actions) => {
				bound = actions;
				const section = host.getSnapshot().value;
				if (section !== void 0) {
					revision += 1;
					actions.sync(resolveGlassSettings(section), revision);
				}
				return {
					setEnabled: (enabled) => {
						host.set(GLASS_ENABLED_FIELD, enabled);
					},
					setField: (field, value) => {
						host.set(field, value);
					}
				};
			};
			ctx.slots.inject("settings.general.item", () => ctx.slots.register({
				name: "settings.general.item",
				id: "liquid-glass",
				order: 20,
				store,
				locale: SETTINGS_NS,
				inject: injected
			}, LiquidGlassRow));
		}
		//#endregion
		exports.FLUID_ATTRIBUTE = FLUID_ATTRIBUTE;
		exports.MOTION_ATTRIBUTE = MOTION_ATTRIBUTE;
		exports.MOTION_ENTER_ATTRIBUTE = MOTION_ENTER_ATTRIBUTE;
		exports.MOTION_EXIT_ATTRIBUTE = MOTION_EXIT_ATTRIBUTE;
		exports.MOTION_PANE_ATTRIBUTE = MOTION_PANE_ATTRIBUTE;
		exports.MOTION_PANE_SLIDE_ATTRIBUTE = MOTION_PANE_SLIDE_ATTRIBUTE;
		exports.MOTION_PANE_TRACK_ATTRIBUTE = MOTION_PANE_TRACK_ATTRIBUTE;
		exports.SETTINGS_NS = SETTINGS_NS;
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map