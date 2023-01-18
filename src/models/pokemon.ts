export interface PokemonName {
  no: number;
  'en-US': string;
  'zh-TW': string;
  'zh-CN': string;
}

export interface Pokemon {
  no: number;
  name: string;
  form: string;
  types: string[];
}

export interface PokemonForm {
  no: number;
  name: string;
  'en-US'?: string;
  'zh-TW'?: string;
}

export interface Region {
  patterns: string[];
  'en-US': string;
  'zh-TW': string;
}

export interface Type {
  patterns: string[];
  'en-US': string;
  'zh-TW': string;
}
