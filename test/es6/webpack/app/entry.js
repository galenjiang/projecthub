import React from "react";
console.log(React);

console.log(11)

require.ensure([], function(require) {
  var a = require("./components/a").a;
  a()
});
