type Action = {
  [ key: string ]: string,
}

const actions: Action = {
  SET_STATE: 'pokemons/SET_STATE',
  LOAD_POKEMONS: 'pokemons/LOAD_POKEMONS',
}

export default actions