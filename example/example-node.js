/* eslint-disable no-console */
const fs = require('fs');
// FIXME: Incase you have the npm package
// const HTMLtoDOCX = require('html-to-docx');
const HTMLtoDOCX = require('../dist/html-to-docx.umd');

const filePath = './example.docx';

const htmlString = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title>Parágrafo em cima, lista embaixo</title>
    <style>
        /* ... your existing styles ... */
        .paragraph-border-bottom {
            /* You can add CSS styles here for browser preview if needed,
               but they won't affect the DOCX generation directly with this method.
               The DOCX border comes purely from detecting the class name. */
        }
    </style>
</head>
<body>
    <p> teste </p>
    <div class="content-container">
        <p class="paragraph-border-bottom">Texto introdutório que fica em cima da lista:</p>
        <ul class="custom-list">
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
        </ul>
    </div>
</body>
</html>`;

(async () => {
    const fileBuffer = await HTMLtoDOCX(htmlString, null, {
        table: {
            row: { cantSplit: true }, 
            addSpacingAfter: true
        },
        footer: true,
        pageNumber: true,
        preprocessing: { skipHTMLMinify: false }
    });

    fs.writeFile(filePath, fileBuffer, (error) => {
        if (error) {
            console.log('Docx file creation failed');
            return;
        }
        console.log('Docx file created successfully');
    });
})();
