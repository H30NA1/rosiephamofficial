
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const htmlPath = path.join(__dirname, '../scrape.html');
const outputPath = path.join(__dirname, '../src/data/forex-data.json');
const outputDir = path.dirname(outputPath);

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

try {
    const html = fs.readFileSync(htmlPath, 'utf8');

    // Look for the specific assignment
    const startMarker = 'window.calendarComponentStates[1] = ';
    const startIndex = html.indexOf(startMarker);

    if (startIndex === -1) {
        console.error('Could not find start marker');
        process.exit(1);
    }

    // Find the end of the object. 
    // It starts with { and ends with };
    // We can just look for the first }; after the start
    // dependent on the formatting in scrape.html

    let jsonStart = startIndex + startMarker.length;
    let cursor = jsonStart;
    let openBraces = 0;
    let found = false;
    let jsonEnd = 0;

    // Simple brace counting parser
    // This is a bit naive but works if the JS object syntax is close to JSON
    // However, the file is JS, not pure JSON (keys might not be quoted? check file)
    // Looking at file content: keys ARE quoted?
    // "days": [ ... ]
    // But wait, line 19 in view_file:  country_code: 'VN',  <- keys NOT quoted?
    // properties inside window.FF are not quoted.
    // properties inside calendarComponentStates?
    // line 92: days: [{"date": ...
    // "days" is not quoted.
    // So it's a JS object, not valid JSON.
    // I need to convert it to JSON or just extract it as a TS file export.

    // Let's try to extract the block and save it as a TS file directly.

    const endMarker = '};';
    const endIndex = html.indexOf(endMarker, jsonStart);

    if (endIndex === -1) {
        console.error('Could not find end marker');
        process.exit(1);
    }

    const jsObjectContent = html.substring(jsonStart, endIndex + 1);

    const tsContent = `
// Auto-generated from scrape.html
export const forexData = ${jsObjectContent}
`;

    const outputTsPath = path.join(__dirname, '../src/data/forex-data.ts');
    fs.writeFileSync(outputTsPath, tsContent);

    console.log(`Successfully extracted data to ${outputTsPath}`);

} catch (err) {
    console.error('Error:', err);
}
