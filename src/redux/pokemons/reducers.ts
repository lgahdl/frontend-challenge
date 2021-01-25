import actions from "./actions";

interface Action {
  type: string;
  payload: any;
}

interface PokemonState {
  allPokemon: Object;
  pagedPokemon: Object;
  selectedPokemonId: number | null;
  selectedPokemon: Object | null;
  researchedPokemon: Object | null;
}

const initialState: PokemonState = {
  allPokemon: {},
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
