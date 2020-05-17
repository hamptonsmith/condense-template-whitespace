// The algorithm: leading and trailing contiguous whitespace is removed, and all
// contiguous internal strings of whitespace are replaced with a single space,
// with the exception of internal blank lines (defined as containing only
// whitespace and a newline), which will be replaced with a newline.

'use strict';

const whitespace = Array.from(' \t\n').reduce((accum, val) => {
    accum[val] = true;
    return accum;
}, {});

module.exports = input => {
    input = input.trim();
    
    let result = '';
    
    let startOfResultLine = true;
    let nonWhitespaceOnLine = false;
    let inWhitespace = false;
    let blankLineCount = 0;
    for (let char of input) {
        if (whitespace[char]) {
            if (char === '\n') {
                if (!nonWhitespaceOnLine) {
                    blankLineCount++;
                    
                    if (blankLineCount > 1) {
                        result += '\n';
                        startOfResultLine = true;
                    }
                }
                
                nonWhitespaceOnLine = false;
            }
            
            inWhitespace = true;
        }
        else {
            if (!startOfResultLine && inWhitespace) {
                result += ' ';
            }
            
            result += char;
            inWhitespace = false;
            nonWhitespaceOnLine = true;
            startOfResultLine = false;
            blankLineCount = 0;
        }
    }
    
    return result;
};
