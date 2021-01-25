import actions from "./actions";

interface Action {
  type: string;
  payload: any;
}

interface SettingsState {
  page: "pokemon" | "error";
  selectedSubpage: number;
  screenWidth: number;
  screenHeight: number;
  researchString: string;
  search: boolean;
}

const initialState: SettingsState = {
  page: "pokemon",
  selectedSubpage: 1,
  screenWidth: window.innerWidth,
  screenHeight: window.innerHeight,
  researchString: "",
  search: false,
};

export default function pokemonsReducer(state = initialState, action: Action) {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
