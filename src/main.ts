// Node modules.
import _ from 'lodash';
// Local modules.
import * as Downloader from 'src/downloadRawdata';
import { getPokemons } from './pokemon/index';

async function main() {
  // await Downloader.downloadGameMaster();
  // await Downloader.downloadI18n();

  const pokemons = await getPokemons();

  // console.log(pokemons.filter((pokemon) => pokemon.name === '洛奇亞'));
  // console.log(pokemons.filter((pokemon) => pokemon.name === '飄浮泡泡'));
  // console.log(pokemons.filter((pokemon) => pokemon.name === '騎拉帝納'));
  // console.log(JSON.stringify(pokemons.filter((pokemon) => pokemon.name === '爆肌蚊'), null, 2));
  console.log(JSON.stringify(pokemons.filter((pokemon) => pokemon.no === 6), null, 2)); // 噴火龍
  // console.log(JSON.stringify(pokemons.filter((pokemon) => pokemon.no === 383), null, 2)); // 固拉多
  // console.log(pokemons.filter((pokemon) => pokemon.name === '喵喵'));
}

main();
