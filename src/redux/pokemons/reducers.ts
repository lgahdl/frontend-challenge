import actions from "./actions";

interface Action {
  type: string;
  payload: any;
}

interface PokemonState {
  allPokemons: Object;
  selectedPokemonId: number;
  selectedPokemon: Object;
}

const initialState: PokemonState = {
  allPokemons: {},
  selectedPokemonId: 1,
  selectedPokemon: {},
};

export default function pokemonsReducer(state = initialState, action: Action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
