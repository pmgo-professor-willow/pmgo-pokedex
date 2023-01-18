// Node modules.
import _ from 'lodash';
import fetch from 'node-fetch';
import { parse } from 'node-html-parser';
import { mkdirp, writeFile } from 'fs-extra';
// Local modules.
import currentFormList from '../data/form-list.json';

const getFormList = async () => {
  const formListUrl = 'https://pokemongo.fandom.com/wiki/List_of_Pok%C3%A9mon_with_different_forms';
  const res = await fetch(formListUrl);
  const xml = await res.text();

  const root = parse(xml);
  // container 'wds-is-current' is for 'Regular' tab instead of 'Shiny'
  const pokemonItems = root.querySelectorAll('.wds-is-current .pogo-list-item');

  const formList = _.chain(pokemonItems)
    .flatMap((pokemonItem) => {
      const isLegal: boolean = !!pokemonItem.querySelector('.pogo-list-item-number') && !!pokemonItem.querySelector('.pogo-list-item-name a');
      return isLegal
        ? [{
          no: parseInt(pokemonItem.querySelector('.pogo-list-item-number').rawText.trim().replace('#', '')),
          name: pokemonItem.querySelector('.pogo-list-item-name a').rawText.trim(),
          'en-US': pokemonItem.querySelector('.pogo-list-item-form')?.rawText.trim(),
        }]
        : [];
    })
    .sortBy((pokemon) => pokemon.no)
    .value();

  return formList;
};

const main = async () => {
  const outputPath = './data';
  await mkdirp(outputPath);

  try {
    const latestFormList = await getFormList();
    const formList = _.map(latestFormList, (latestForm) => {
      const criteria = {
        no: latestForm.no,
        name: latestForm.name,
        'en-US': latestForm['en-US'],
      };
      return _.merge(latestForm, _.find(currentFormList, criteria));
    });

    await writeFile(`${outputPath}/form-list.json`, JSON.stringify(formList, null, 2));
  } catch (e) {
    console.error(e);
  }
};

main();
