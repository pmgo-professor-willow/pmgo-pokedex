// Node modules.
import { readFileSync } from 'node:fs';
import appRoot from 'app-root-path';

interface Template {
  templateId: string;
  data: {
    templateId: string;
    [prop: string]: unknown;
  }
}

type GameMaster = Template[];

interface Resource {
  [id: string]: string;
}

type ResourceTarget =
  | 'pokemonName'
  | 'pokemonType'
  | 'pokemonClass'
  | 'pokemonCategory'
  | 'pokemonDescription'
  | 'pokemonForm'
  | 'moveName';

const resourceTargetFilterTable: Record<ResourceTarget, RegExp> = {
  pokemonName: /^pokemon_name_(\w+)/,
  pokemonType: /^pokemon_type_(\w+)/,
  pokemonClass: /^filter_key_(\w+)/,
  pokemonCategory: /^pokemon_category_(\w+)/,
  pokemonDescription: /^pokemon_desc_(\w+)/,
  pokemonForm: /^form_(\w+)|^(\w+)_pokedex_header/,
  moveName: /^move_name_(\d+)/,
  
} as const;

/**
 * GameMaster is Pokemon Go data.
 */
const getGameMaster = () => {
  const rawdata = readFileSync(`${appRoot.path}/rawdata/gameMaster.json`, 'utf-8');
  const gameMaster: GameMaster = JSON.parse(rawdata);
  return gameMaster;
};

/**
 * Resources is I18n of Pokemon Go data.
 */
const getResources = (target: ResourceTarget) => {
  const rawdata = readFileSync(`${appRoot.path}/rawdata/resources.txt`, 'utf-8');
  const filterPattern = resourceTargetFilterTable[target];

  return rawdata.match(/RESOURCE ID: [^\n]+\nTEXT: [^\n]+/sg)?.reduce<Resource>((prev, resource) => {
    const { 1: id, 2: text } = resource.match(/RESOURCE ID: ([^\n]+)\nTEXT: ([^\n]+)/)!;
    if (filterPattern.test(id)) {
      const { 1: key, 2: subKey } = id.match(filterPattern)!;
      const finalKey = key ?? subKey;
      prev[finalKey.trim()] = text.trim();
    }
    return prev;
  }, {})!;
};

export {
  getGameMaster,
  getResources,
};
