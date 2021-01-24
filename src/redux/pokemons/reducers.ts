import actions from "./actions";

interface Action {
  type: string;
  payload: any;
}

interface PokemonState {
  allPokemons: Object;
  pagedPokemons: Object;
  selectedPokemonId: number | null;
  selectedPokemon: Object | null;
}

const initialState: PokemonState = {
  allPokemons: {},
  pagedPokemons: {},
  selectedPokemonId: null,
  selectedPokemon: null,
};

export default function pokemonsReducer(state = initialState, action: Action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
