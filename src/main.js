const acorn = require('acorn');
const fs = require('fs/promises');
const path = require('path');

async function main() {
  try {
    // read input file
    const inputFileName = 'script.js';
    const inputFilePath = path.join(__dirname, 'input', inputFileName);
    const inputFileData = await fs.readFile(inputFilePath, { encoding: 'utf8' });

    // parsed result is AST (abstract syntax tree) object as specified by ESTree spec
    const abstractSyntaxTree = acorn.parse(inputFileData, {
      ecmaVersion: 2015,
      sourceType: 'script',
    });

    // write output file
    const outputFileName = 'script-ast.json';
    const outputFilePath = path.join(__dirname, 'output', outputFileName);
    const outputFileData = JSON.stringify(abstractSyntaxTree) + '\n';

    await fs.writeFile(outputFilePath, outputFileData, { encoding: 'utf8' });
  } catch (error) {
    console.error(error);
  }
}

main();
