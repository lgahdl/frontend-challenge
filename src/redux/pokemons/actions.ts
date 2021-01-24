type Action = {
  [key: string]: string;
};

const actions: Action = {
  SET_STATE: "pokemons/SET_STATE",
  LOAD_PAGED_POKEMONS: "pokemons/LOAD_PAGED_POKEMONS",
  LOAD_ALL: "pokemons/LOAD_ALL",
  LOAD_SELECTED: "pokemons/LOAD_SELECTED",
};

export default actions;
