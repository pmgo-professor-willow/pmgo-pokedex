// Node modules.
import { mkdir, writeFile } from 'node:fs/promises';
import fetch from 'node-fetch';

const downloadGameMaster = async () => {
  const url = 'https://raw.githubusercontent.com/PokeMiners/game_masters/master/latest/latest.json';
  const res = await fetch(url);
  const json = await res.json();

  await mkdir('./rawdata', { recursive: true });
  await writeFile('./rawdata/gameMaster.json', JSON.stringify(json, null, 2));
};

const downloadI18n = async (locale = 'ChineseTraditional') => {
  const url = `https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Texts/Latest%20APK/${locale}.txt`;
  const res = await fetch(url);
  const text = await res.text();

  await mkdir('./rawdata', { recursive: true });
  await writeFile('./rawdata/resources.txt', text);
};

export {
  downloadGameMaster,
  downloadI18n,
};
