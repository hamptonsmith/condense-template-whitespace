const condense = require('./index');
const Mustache = require('mustache');

Mustache.escape = x => x;

test('trimming and internal space', () => {
    expect(condense(`
        \tHello,  
        My name\t\t
        
        Is\t test    
    `)).toBe(`Hello, My name Is test`);
});

test('empty newlines', () => {
    expect(condense(`
        Sometimes\t
        
        
        you 
        might
            
        \t
        
        Want\t
        newlines
    `)).toBe(`Sometimes\nyou might\n\nWant newlines`);
});

test('desired mustache result', () => {
    expect(condense(Mustache.render(`
        {{#context}}
            In {{context}},
        {{/context}}
        
        {{problem}}.
    `, {
        context: 'someplace',
        problem: 'a problem'
    }))).toBe('In someplace, a problem.');
});
