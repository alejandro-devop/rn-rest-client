'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var axios = require('axios');
var _ = require('lodash');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);
var ___default = /*#__PURE__*/_interopDefaultLegacy(_);

var RestClientContext = React__default.default.createContext({});
var RestClientContextProvider = RestClientContext.Provider;
RestClientContext.Consumer;

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

/**
 * This class contains the logic to interact with http requests
 * @author Alejandro Quiroz <alejandro.devop@gmail.com>
 * @version 1.0.0
 */
var HttpClient = /** @class */ (function () {
    function HttpClient(config) {
        var _this = this;
        /**
         * Http headers which you can find here: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
         */
        this.headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        };
        this.addHeaders = function (headers) {
            _this.headers = __assign(__assign({}, _this.headers), headers);
        };
        this.setToken = function (token) {
            _this.token = token;
            return _this;
        };
        this.setRefresh = function (refresh) {
            _this.refreshToken = refresh;
            return _this;
        };
        this.getToken = function () {
            return _this.token;
        };
        var server = config.server, endpoints = config.endpoints, onRefreshToken = config.onRefreshToken, shouldRefreshToken = config.shouldRefreshToken, auth = config.auth;
        this.server = server;
        this.endpoints = endpoints;
        this.shouldRefreshToken = shouldRefreshToken === null || shouldRefreshToken === void 0 ? void 0 : shouldRefreshToken.bind(this);
        this.onRefreshToken = onRefreshToken === null || onRefreshToken === void 0 ? void 0 : onRefreshToken.bind(this);
        if (auth !== undefined) {
            this.addHeaders({ Authorization: auth });
        }
    }
    /**
     * Current headers configured for the client
     * @returns HeaderTypes
     */
    HttpClient.prototype.getHeaders = function () {
        return this.headers;
    };
    /**
     * Current configured server for the client
     * @returns string
     */
    HttpClient.prototype.getServer = function () {
        return this.server;
    };
    /**
     * Current configured endpoints for the client
     * @returns EndpointsConfigType
     */
    HttpClient.prototype.getEndpoints = function () {
        return this.endpoints;
    };
    HttpClient.prototype.findEndpoint = function (path) {
        var parts = path.split('.');
        var url = parts.length > 1
            ? parts
                .reduce(function (result, pathPortion) {
                if (result[pathPortion]) {
                    result = result[pathPortion];
                }
                else {
                    // url must be reseted if the part does not exists
                    result = '/invalid-path';
                }
                return result;
            }, this.endpoints)
                .toString()
            : "/".concat(path);
        return url;
    };
    HttpClient.prototype.addUrlParams = function (url, options) {
        var _a = (options || {}).urlParams, urlParams = _a === void 0 ? {} : _a;
        var params = [];
        Object.keys(urlParams).forEach(function (currentKey) {
            var value = encodeURIComponent(urlParams[currentKey]);
            params.push("".concat(currentKey, "=").concat(value));
        });
        if (params.length > 0) {
            url = "".concat(url, "?").concat(params.join('&'));
        }
        return url;
    };
    /**
     * Loop for every key in the replacement object and replace the found keys
     * for any assigned value
     * @param url string
     * @param options ResolvePathOptions
     * @returns string
     */
    HttpClient.prototype.executingReplacements = function (url, options) {
        var _a = options || {}, _b = _a.replacements, replacements = _b === void 0 ? {} : _b, _c = _a.replacementConfig, replacementConfig = _c === void 0 ? {} : _c;
        var _d = replacementConfig.startToken, startToken = _d === void 0 ? '{' : _d, _e = replacementConfig.endToken, endToken = _e === void 0 ? '}' : _e;
        Object.keys(replacements).map(function (currentKey) {
            url = url.replace(new RegExp("".concat(startToken).concat(currentKey).concat(endToken)), replacements[currentKey].toString());
        });
        return url;
    };
    HttpClient.prototype.clearMethod = function (url) {
        /**
         * If the url has type definition we must clean it
         */
        if (url.includes('<') && url.includes('>')) {
            url = url.replace(new RegExp("<.*>", 'g'), '');
        }
        return url;
    };
    HttpClient.prototype.getMethod = function (url) {
        var type = '';
        var matches = url.match(new RegExp('(<[a-zA-Z]+>)', 'g'));
        var match = (matches || [])[0];
        type = match === null || match === void 0 ? void 0 : match.replace(new RegExp('<|>', 'g'), '');
        return type;
    };
    /**
     * Converts a dot notation string into a valid url to make a request
     * @param path string
     * @param options ResolvePathOptions
     * @returns [string, string]
     */
    HttpClient.prototype.resolvePath = function (path, options) {
        var url = this.findEndpoint(path);
        var urlDefinedMethod = this.getMethod(url);
        url = this.clearMethod(url);
        url = this.executingReplacements(url, options);
        url = this.addUrlParams(url, options);
        // Append a tailing slash to avoid conflicts for headers
        if (options === null || options === void 0 ? void 0 : options.appendSlash) {
            url = "".concat(url, "/").replace(/\/\//g, '/');
        }
        return ["".concat(this.server).concat(url), urlDefinedMethod];
    };
    HttpClient.prototype.doRequest = function (path, config) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, url, methodType, _b, _c, method, form, headers, mergedHeaders, sendRequest, response, error_1, data;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = this.resolvePath(path, config), url = _a[0], methodType = _a[1];
                        _b = config || {}, _c = _b.method, method = _c === void 0 ? 'get' : _c, form = _b.form, headers = _b.headers;
                        if (!___default.default.isEmpty(methodType) && methodType !== method) {
                            throw new Error('Invalid method for endpoint');
                        }
                        mergedHeaders = __assign(__assign({}, this.headers), headers);
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 3, , 4]);
                        sendRequest = function () { return __awaiter(_this, void 0, void 0, function () {
                            var payload, formData, response_1, data, status_1, response_2, data, status_2, _a, data, status_3, _b, data, status_4, _c, data, status_5;
                            return __generator(this, function (_d) {
                                switch (_d.label) {
                                    case 0:
                                        payload = (config === null || config === void 0 ? void 0 : config.payload) || {};
                                        formData = new FormData();
                                        if (form === true && payload) {
                                            mergedHeaders['Content-Type'] = 'multipart/form-data';
                                            Object.keys(payload).forEach(function (formKey) {
                                                formData.append(formKey, payload[formKey]);
                                            });
                                        }
                                        if (!(method === 'post')) return [3 /*break*/, 2];
                                        return [4 /*yield*/, axios__default.default.post(url, payload, {
                                                headers: __assign({}, mergedHeaders)
                                            })];
                                    case 1:
                                        response_1 = _d.sent();
                                        data = response_1.data, status_1 = response_1.status;
                                        return [2 /*return*/, {
                                                status: status_1,
                                                data: data
                                            }];
                                    case 2:
                                        if (!(method === 'put')) return [3 /*break*/, 4];
                                        return [4 /*yield*/, axios__default.default.put(url, payload, {
                                                headers: mergedHeaders
                                            })];
                                    case 3:
                                        response_2 = _d.sent();
                                        data = response_2.data, status_2 = response_2.status;
                                        return [2 /*return*/, {
                                                status: status_2,
                                                data: data
                                            }];
                                    case 4:
                                        if (!(method === 'patch')) return [3 /*break*/, 6];
                                        return [4 /*yield*/, axios__default.default.patch(url, payload, {
                                                headers: mergedHeaders
                                            })];
                                    case 5:
                                        _a = _d.sent(), data = _a.data, status_3 = _a.status;
                                        return [2 /*return*/, {
                                                status: status_3,
                                                data: data
                                            }];
                                    case 6:
                                        if (!(method === 'delete')) return [3 /*break*/, 8];
                                        return [4 /*yield*/, axios__default.default.delete(url, {
                                                headers: mergedHeaders
                                            })];
                                    case 7:
                                        _b = _d.sent(), data = _b.data, status_4 = _b.status;
                                        return [2 /*return*/, {
                                                status: status_4,
                                                data: data
                                            }];
                                    case 8: return [4 /*yield*/, axios__default.default.get(url, {
                                            headers: mergedHeaders
                                        })];
                                    case 9:
                                        _c = _d.sent(), data = _c.data, status_5 = _c.status;
                                        return [2 /*return*/, {
                                                status: status_5,
                                                data: data
                                            }];
                                }
                            });
                        }); };
                        if (this.shouldRefreshToken && this.onRefreshToken && this.refreshToken) ;
                        return [4 /*yield*/, sendRequest()
                            // console.log('Some response: ', response)
                        ];
                    case 2:
                        response = _d.sent();
                        // console.log('Some response: ', response)
                        return [2 /*return*/, response];
                    case 3:
                        error_1 = _d.sent();
                        data = error_1.response.data;
                        // console.log('Something goes wrong: ', error)
                        if (this.shouldRefreshToken && this.shouldRefreshToken(data) && this.onRefreshToken) {
                            this.onRefreshToken();
                        }
                        throw {
                            error: true,
                            errorMessage: error_1.message,
                            status: error_1.status,
                            data: data
                        };
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return HttpClient;
}());

/**
 * Hook to store the previous value for the props passed to a component
 * @author Alejandro Quiroz <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @param value
 * @returns
 */
var usePrevProps = function (value) {
    var valuesRef = React.useRef(value);
    React.useEffect(function () {
        valuesRef.current = value;
    });
    return valuesRef.current;
};

var RestClientProvider = function (_a) {
    var children = _a.children, config = _a.config;
    var httpClient = React__default.default.useRef(new HttpClient(config));
    var prevProps = usePrevProps({ auth: config.auth });
    React__default.default.useEffect(function () {
        if (prevProps.auth !== config.auth) {
            httpClient.current.addHeaders({ Authorization: config.auth });
        }
    }, [prevProps.auth, config.auth]);
    return (React__default.default.createElement(RestClientContextProvider, { value: {
            client: httpClient.current
        } }, children));
};

var useApiContext = function () {
    var client = React__default.default.useContext(RestClientContext).client;
    return {
        client: client
    };
};

var useGetLazy = function (url, options) {
    var _a = options || {}, onCompleted = _a.onCompleted, replacements = _a.replacements, urlParams = _a.urlParams;
    var _b = React__default.default.useState(false), loading = _b[0], setLoading = _b[1];
    var client = useApiContext().client;
    var sendRequest = React__default.default.useCallback(function (overrideOptions) { return __awaiter(void 0, void 0, void 0, function () {
        var data, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    setLoading(true);
                    return [4 /*yield*/, (client === null || client === void 0 ? void 0 : client.doRequest(url, __assign(__assign({ urlParams: urlParams, replacements: replacements }, overrideOptions), { method: 'get' })))];
                case 1:
                    data = (_a.sent()).data;
                    if (onCompleted) {
                        onCompleted(data);
                    }
                    setLoading(false);
                    return [2 /*return*/, data];
                case 2:
                    err_1 = _a.sent();
                    setLoading(false);
                    return [2 /*return*/, __assign({ error: true }, err_1)];
                case 3: return [2 /*return*/];
            }
        });
    }); }, []);
    return [sendRequest, loading];
};

var useGet = function (url, options) {
    var _a = options || {}, defaultData = _a.defaultData, onCompleted = _a.onCompleted;
    var _b = useGetLazy(url, options), sendRequest = _b[0], loading = _b[1];
    var _c = React__default.default.useState(defaultData), data = _c[0], setData = _c[1];
    var _d = React__default.default.useState(false), requestedOnce = _d[0], setRequestedOnce = _d[1];
    var _e = React__default.default.useState(false), requesting = _e[0], setRequesting = _e[1];
    var fetchData = React__default.default.useCallback(function (overrideOptions) { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setRequesting(true);
                    return [4 /*yield*/, sendRequest(overrideOptions)];
                case 1:
                    response = _a.sent();
                    if (!onCompleted) return [3 /*break*/, 3];
                    return [4 /*yield*/, onCompleted(response, {
                            retry: function (retryOverride) { return __awaiter(void 0, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, sendRequest(__assign(__assign({}, overrideOptions), retryOverride))];
                                        case 1:
                                            response = _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }
                        })];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    setData(response);
                    setRequestedOnce(true);
                    setRequesting(false);
                    return [2 /*return*/];
            }
        });
    }); }, [requesting, requestedOnce]);
    React__default.default.useEffect(function () {
        if (!requesting && !requestedOnce) {
            fetchData();
        }
    }, [requesting, requestedOnce]);
    return [
        data,
        loading,
        {
            refresh: fetchData
        }
    ];
};

var usePost = function (url) {
    var _a = React__default.default.useState(false), loading = _a[0], setLoading = _a[1];
    var client = useApiContext().client;
    var sendRequest = function (payload, overrideOptions) { return __awaiter(void 0, void 0, void 0, function () {
        var response, data, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    setLoading(true);
                    return [4 /*yield*/, (client === null || client === void 0 ? void 0 : client.doRequest(url, __assign(__assign({ payload: payload }, overrideOptions), { method: 'post' })))];
                case 1:
                    response = _a.sent();
                    setLoading(false);
                    data = response.data;
                    // ToDo: handle response for 500 errors
                    return [2 /*return*/, data];
                case 2:
                    err_1 = _a.sent();
                    setLoading(false);
                    return [2 /*return*/, __assign({}, err_1)];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return [sendRequest, loading];
};

var useDelete = function (url) {
    var _a = React__default.default.useState(false), loading = _a[0], setLoading = _a[1];
    var client = useApiContext().client;
    var sendRequest = function (overrideOptions) { return __awaiter(void 0, void 0, void 0, function () {
        var response, data, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    setLoading(true);
                    return [4 /*yield*/, (client === null || client === void 0 ? void 0 : client.doRequest(url, __assign(__assign({}, overrideOptions), { method: 'delete' })))];
                case 1:
                    response = _a.sent();
                    setLoading(false);
                    data = response.data;
                    // ToDo: handle response for 500 errors
                    return [2 /*return*/, data];
                case 2:
                    err_1 = _a.sent();
                    return [2 /*return*/, __assign({}, err_1)];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return [sendRequest, loading];
};

var usePut = function (url) {
    var _a = React__default.default.useState(false), loading = _a[0], setLoading = _a[1];
    var client = useApiContext().client;
    var sendRequest = function (payload, overrideOptions) { return __awaiter(void 0, void 0, void 0, function () {
        var response, data, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    setLoading(true);
                    return [4 /*yield*/, (client === null || client === void 0 ? void 0 : client.doRequest(url, __assign(__assign({ payload: payload }, overrideOptions), { method: 'put' })))];
                case 1:
                    response = _a.sent();
                    setLoading(false);
                    data = response.data;
                    // ToDo: handle response for 500 errors
                    return [2 /*return*/, data];
                case 2:
                    err_1 = _a.sent();
                    return [2 /*return*/, __assign({}, err_1)];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return [sendRequest, loading];
};

var usePatch = function (url) {
    var _a = React__default.default.useState(false), loading = _a[0], setLoading = _a[1];
    var client = useApiContext().client;
    var sendRequest = function (payload, overrideOptions) { return __awaiter(void 0, void 0, void 0, function () {
        var response, data, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    setLoading(true);
                    return [4 /*yield*/, (client === null || client === void 0 ? void 0 : client.doRequest(url, __assign(__assign({ payload: payload }, overrideOptions), { method: 'patch' })))];
                case 1:
                    response = _a.sent();
                    setLoading(false);
                    data = response.data;
                    // ToDo: handle response for 500 errors
                    return [2 /*return*/, data];
                case 2:
                    err_1 = _a.sent();
                    return [2 /*return*/, __assign({}, err_1)];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return [sendRequest, loading];
};

exports.RestClientProvider = RestClientProvider;
exports.useApiContext = useApiContext;
exports.useDelete = useDelete;
exports.useGet = useGet;
exports.useGetLazy = useGetLazy;
exports.usePatch = usePatch;
exports.usePost = usePost;
exports.usePrevProps = usePrevProps;
exports.usePut = usePut;
//# sourceMappingURL=index.js.map
