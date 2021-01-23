import actions from "./actions";

interface Action {
  type: string;
  payload: any;
}

interface SettingsState {
  page:
    | "pokemon"
    | "berry"
    | "generation"
    | "items"
    | "location"
    | "machine"
    | "move";
  selectedSubpage: number;
}

const initialState: SettingsState = {
  page: "pokemon",
  selectedSubpage: 1,
};

export default function pokemonsReducer(state = initialState, action: Action) {
  switch (action.type) {
    case actions.SET_STATE:
      console.log(action);
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
