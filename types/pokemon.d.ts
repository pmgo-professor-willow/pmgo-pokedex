declare interface PokemonName {
  no: number;
  'en-US': string;
  'zh-TW': string;
  'zh-CN': string;
}

declare interface Pokemon {
  no: number;
  name: string;
  form: string;
  types: string[];
}

declare interface PokemonForm {
  no: number;
  name: string;
  'en-US'?: string;
  'zh-TW'?: string;
}

declare interface Region {
  patterns: string[];
  'en-US': string;
  'zh-TW': string;
}

declare interface Type {
  patterns: string[];
  'en-US': string;
  'zh-TW': string;
}
