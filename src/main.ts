import * as acorn from 'acorn';
import { readdir, readFile, writeFile } from 'fs/promises';
import { basename, join } from 'path';

async function main() {
  try {
    const inputDirPath = join(__dirname, '..', 'input');
    const outputDirPath = join(__dirname, '..', 'output');

    const inputFilesNames = await readdir(inputDirPath);

    for (const inputFileName of inputFilesNames) {
      // read input file
      const inputFilePath = join(inputDirPath, inputFileName);
      const inputFileData = await readFile(inputFilePath, { encoding: 'utf-8' });

      // parsed result is AST object as specified by ESTree spec
      const abstractSyntaxTree: acorn.Node = acorn.parse(inputFileData, {
        ecmaVersion: 2015,
        sourceType: 'script',
      });

      // write output file
      const outputFileName = basename(inputFileName, '.js') + '.ast';
      const outputFilePath = join(outputDirPath, outputFileName);
      const outputFileData = JSON.stringify(abstractSyntaxTree, null, '  ') + '\n';

      await writeFile(outputFilePath, outputFileData, { encoding: 'utf-8' });
    }
  } catch (error) {
    console.error(error);
  }
}

main();
