type Action = {
  [key: string]: string;
};

const actions: Action = {
  SET_STATE: "pokemons/SET_STATE",
  LOAD_POKEMONS: "pokemons/LOAD_POKEMONS",
  LOAD_SELECTED: "pokemons/LOAD_SELECTED",
};

export default actions;
