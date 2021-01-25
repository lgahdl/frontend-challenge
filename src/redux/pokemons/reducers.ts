import actions from "./actions";

interface Action {
  type: string;
  payload?: Object | null;
}

interface PokemonState {
  allPokemon: Object;
  pagedPokemon: Object;
  selectedPokemonId: number | null;
  selectedPokemon: Object | null;
  researchedPokemon: Object | null;
}

const initialState: PokemonState = {
  allPokemon: {}, //OBS: EXCLUSIVE FOR SEARCH FEATURE, PokeAPI DOES NOT SUPPORT SEARCH BY STRING
  pagedPokemon: {},
  researchedPokemon: {},
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
