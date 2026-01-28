const fs = require('fs');
const content = fs.readFileSync('js/data.js', 'utf8');

// Parse each entry
const entries = [];
const regex = /\{\s*id:\s*"([^"]*)",\s*term:\s*"([^"]*)",\s*meaning:\s*"([^"]*)",\s*example:\s*"([^"]*)"/g;
let m;
while ((m = regex.exec(content)) !== null) {
    entries.push({
        id: m[1],
        term: m[2],
        meaning: m[3],
        example: m[4]
    });
}

// Output as markdown table
console.log('| # | Term | Meaning | Example Sentence |');
console.log('|---|------|---------|------------------|');
entries.forEach((e, i) => {
    // Escape pipe characters in content
    const term = e.term.replace(/\|/g, '\\|');
    const meaning = e.meaning.replace(/\|/g, '\\|');
    const example = e.example.replace(/\|/g, '\\|');
    console.log(`| ${i+1} | ${term} | ${meaning} | ${example} |`);
});

console.log('\n\nTotal phrases: ' + entries.length);
