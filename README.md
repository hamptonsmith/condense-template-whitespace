# Motivation

Sometimes I want to use templates (for example, [Mustache](https://www.npmjs.com/package/mustache)) that are a little complicated, and some formatting helps readability (this often happens in conjunction with [SBError](https://github.com/hamptonsmith/sberror) messages, for example).  Consider:

```javascript
const message = `
    {{#context}}
        At {{context}}, found
    {{/context}}
    {{^context}}
        Found
    {{/context}}
    
    {{problem}}.
`;
```

The trouble is, even using an identation-trimmer, this yields unwanted whitespace:

```
At someplace, found

there was a problem.
```

This formatter takes "gross" template output and provides reasonable formatting:

```
At someplace, found there was a problem.
```

# Usage

```javascript
const condense = require('@shieldsbetter/condense-template-whitespace');
const Mustache = require('mustache');

console.log(condense(Mustache.render(`
    {{#context}}
        At {{context}}, found
    {{/context}}
    {{^context}}
        Found
    {{/context}}
    
    {{problem}}.
`, {
    context: 'someplace',
    problem: 'found there was a problem'
})));

// Output: 'At someplace, found there was a problem.'
```

# Algorithm

Whitespace is defined to be spaces, tabs, and newlines.

Leading and trailing whitespace is trimmed.

Internal consecutive blocks of whitespace are replaced by a single space, except in the case that the whitespace block contains of multiple blank lines, in which case it will be replaced with a number of newlines equal to the number of contained blank lines minus one.

So:

```javascript
console.log(condense(`
    Sometimes
    
    you
    
    
    want
    
    
    
    newlines.
`));

// Output:
//   Sometimes you
//   
//   want
//   
//   
//   newlines.
```
