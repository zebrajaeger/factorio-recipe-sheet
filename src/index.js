const path = require('path');
const fs = require('fs');

const wikiUrl = 'https://wiki.factorio.com/';

// data source
const rawPath = '%Appdata%/Factorio/script-output/recipe-lister/recipe.json'
const winPath = rawPath.replace(/%([^%]+)%/g, (_, n) => process.env[n]);
console.log('Read from', winPath)
const recipe = require(winPath);
// data target

const outPath = path.resolve('out.html')
console.log('Write to', outPath)

//dictionary
const nameDict = require('./namedictionary.json');

const types = []
for (let x in recipe) {
    types.push(x);
}

types.sort();

let html = '<html>';

html += '<head>\n'
html += `
<style>
    body {
        background-color: white;
        border: 1px solid black;
    }
    table {
        border-collapse: collapse;
    }
    td {
        border: 1px solid black;
    }
    td.source {
       background-color: lightgrey;
    }
    .factorio-icon {
        margin: 5px;
        width: 32px;
        height: 32px;
    }
    .amount{
        font-family: Monospaced;
        font-weight: bold;
        font-size: 25px;
        margin: 5px;
        position: relative;
        bottom: 11px;
        left:5px;
    }
</style>
`

html += '</head>\n'

html += '<body>\n'
html += '<table>\n'
for (let t of types) {
    if (t.search('loader') !== -1) {
        continue;
    }
    if (t.search('waterfill') !== -1) {
        continue;
    }
    if (t.search('energy-interface') !== -1) {
        continue;
    }
    html += '<tr>\n'
    html += `<td class="name">${t}</td>\n`
    html += `<td class="target">${createImageTag(t)}</td>\n`
    const i = []
    for (let x of recipe[t].ingredients) {
        html += `<td class="source"><span class="amount">${x.amount}</span>&nbsp;${createImageTag(x.name)}</td>\n`
    }
    html += '</tr>'
}
html += '</table>\n'
html += '</body>\n'

console.log('write')
fs.writeFileSync(outPath, html)
createPdf(html, outPath + ".pdf");


function createImageTag(name) {
    return `<img class="factorio-icon" src="${wikiUrl + 'images/' + normalise(name) + '.png'}" alt="${name}">`
}

function normalise(name) {
    const replacement = nameDict[name];
    if (replacement) {
        return replacement;
    }

    name = name.charAt(0).toUpperCase() + name.slice(1);
    name = name.split('-').join('_');
    return name;
}

function createPdf(source, target) {
    const html_to_pdf = require('html-pdf-node');

    let options = {format: 'A4'};
    try {
        html_to_pdf.generatePdf({content: source}, options).then(pdfBuffer => {
            console.log('Write pdf to' , target)
            fs.writeFileSync(target, pdfBuffer);
        });
    } catch (e) {
        console.log('PDF error', e)
    }
}
