var acorn = require('acorn');

// parsed result is AST (abstract syntax tree) object as specified by ESTree spec
var ast = acorn.parse('var x = 10, y = x;', {
  ecmaVersion: 3,
  sourceType: 'script',
});

console.dir(ast, { depth: Infinity });
