"use strict";
exports.__esModule = true;
var React = require("react");
var react_1 = require("@testing-library/react");
var app_1 = require("./app");
require("@testing-library/jest-dom/extend-expect");
test('renders app', function () {
    var getByText = react_1.render(React.createElement(app_1["default"], null)).getByText;
    var linkElement = getByText(/react/i);
    expect(linkElement).toBeInTheDocument();
});
