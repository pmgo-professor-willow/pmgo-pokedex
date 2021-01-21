// Node modules.
import { mkdirp, writeFile } from 'fs-extra';
// Local modules.
import { getNameList } from './pokemon-list';

const main = async () => {
  const outputPath = './artifacts';
  await mkdirp(outputPath);

  // Eggs.
  try {
    const pokemonList = await getNameList();
    await writeFile(`${outputPath}/pokemon-list.json`, JSON.stringify(pokemonList, null, 2));
    await writeFile(`${outputPath}/pokemon-list.min.json`, JSON.stringify(pokemonList));
  } catch (e) {
    console.error(e);
  }
};

main();
