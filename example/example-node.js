/* eslint-disable no-console */
const fs = require('fs');
const HTMLtoDOCX = require('../dist/html-to-docx.umd'); // Confirme o caminho

const filePath = './example.docx';

// Use o mesmo HTML simples com tabela do teste anterior
const htmlString = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title>Teste com Tabela e Opções de Prod</title>
    <style>
        /* Estilos podem ser incluídos se necessário */
        table { border: 1px solid black; border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid black; padding: 5px; }
    </style>
</head>
<body>
    <h1>Documento com Tabela</h1>
    <p>Parágrafo antes.</p>
    <table data-slate-node="element" style="width: 100%; border-collapse: collapse; border: none; margin: 0px; padding: 0px;"><tbody><tr><td contenteditable="false" style="font-weight: bold; font-size: 11pt; text-align: left; border: none; margin: 0px; padding: 0px;"><span data-slate-node="text"><span data-slate-leaf="true"><span data-slate-string="true">Data Engineer</span></span></span></td><td contenteditable="false" style="color: rgb(75, 85, 99); text-align: right; font-size: 11pt; border: none; margin: 0px; padding: 0px;"><span data-slate-node="text"><span data-slate-leaf="true"><span data-slate-string="true">Híbrido • Maio 2022 - Presente</span></span></span></td></tr></tbody></table>
    <p>Parágrafo depois.</p>
    <P>Parágrafo depois 2.</p>
</body>
</html>`;

(async () => {
  try {
    // *** USE AS MESMAS OPÇÕES DA PRODUÇÃO ***
    const fileBuffer = await HTMLtoDOCX(htmlString, null, {
      orientation: 'portrait',   // Igual produção
      font: 'Arial',            // Igual produção
      // title: 'Teste Local',  // Título não deve influenciar
      table: {
        addSpacingAfter: false // <-- Chave do teste!
      },
      margins: {                // Igual produção (em TWIPs)
        top: 720,
        right: 720,
        bottom: 720,
        left: 720
      },
      // Mantenha ou remova outras opções como 'footer', 'pageNumber' conforme necessário
      // preprocessing: { skipHTMLMinify: false } // Mantenha se quiser
    });

    fs.writeFile(filePath, fileBuffer, (error) => {
      if (error) {
        console.error('Docx file creation failed:', error);
        return;
      }
      console.log(`Docx file "${filePath}" created successfully`);
    });
  } catch (error) {
    console.error('Error during HTMLtoDOCX conversion:', error);
  }
})();