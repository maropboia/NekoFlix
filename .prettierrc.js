// This module exports an object with various configuration options for a code formatter.
// By setting the 'arrowParens' property to 'avoid', we ensure that arrow functions with a single
// parameter do not include parentheses.
// The 'bracketSameLine' property, when set to true, puts the opening and closing brackets of
// objects and arrays on the same line.
// Disabling 'bracketSpacing' means that there will be no space between the brackets and the
// content they contain.
// Setting 'singleQuote' to true means that all string literals in the code will be enclosed in
// single quotes rather than double quotes.
// The 'trailingComma' property is set to 'all', which means that all lines in the code will end
// with a comma, including empty ones.
module.exports = {
  arrowParens: 'avoid',
  bracketSameLine: true,
  bracketSpacing: false,
  singleQuote: true,
  trailingComma: 'all',
};

