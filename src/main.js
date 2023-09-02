import { parse } from 'acorn';
import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';

async function main() {
  try {
    // read input file
    const inputFileName = 'script.js';
    const inputFilePath = resolve('src', 'input', inputFileName);
    const inputFileData = await readFile(inputFilePath, { encoding: 'utf8' });

    // parsed result is AST (abstract syntax tree) object as specified by ESTree spec
    const abstractSyntaxTree = parse(inputFileData, {
      ecmaVersion: 2015,
      sourceType: 'script',
    });

    // write output file
    const outputFileName = 'script-ast.json';
    const outputFilePath = resolve('src', 'output', outputFileName);
    const outputFileData = JSON.stringify(abstractSyntaxTree, null, '  ') + '\n';

    await writeFile(outputFilePath, outputFileData, { encoding: 'utf8' });
  } catch (error) {
    console.error(error);
  }
}

main();
