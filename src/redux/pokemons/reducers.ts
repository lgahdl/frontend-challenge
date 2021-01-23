import actions from './actions'

interface Action {
  type: string,
  payload: any
}

const initialState = {
  pokemons: [],
}

export default function pokemonsReducer( state = initialState, action: Action ) {
  switch ( action.type )
  {
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
