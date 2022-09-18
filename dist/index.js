'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { default: e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var RestClientContext = React__default.default.createContext({});
var RestClientContextProvider = RestClientContext.Provider;
RestClientContext.Consumer;

var RestClientProvider = function (_a) {
    var children = _a.children;
    return React__default.default.createElement(RestClientContextProvider, { value: {} }, children);
};

exports.RestClientProvider = RestClientProvider;
//# sourceMappingURL=index.js.map
