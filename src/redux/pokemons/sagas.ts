import { all, takeEvery, put, call, select } from "redux-saga/effects";
import actions from "./actions";
import Pokemon from "../../api/Pokemon";

export function* LOAD_POKEMONS() {
  try {
    const subPage = yield select((state) => {
      console.log(state);
      return state.settings.selectedSubpage;
    });
    console.log(subPage);
    const pokemons = yield call(Pokemon.list.bind(Pokemon), {
      limit: 30,
      offset: (subPage - 1) * 30,
    });
    console.log(pokemons);
    yield put({
      type: "pokemons/SET_STATE",
      payload: {
        pokemons,
      },
    });
  } catch (error) {
    console.warn(error);
    yield put({ type: "REQUEST_FAILED", payload: { error } });
  }
}

export function* LOAD_SELECTED() {
  try {
    const id = yield select((state) => state.pokemons.selectedPokemon);
    const selectedPokemon = yield call(Pokemon.get.bind(Pokemon), id);
    yield put({
      type: "pokemons/SET_STATE",
      payload: {
        selectedPokemon,
      },
    });
  } catch (error) {
    console.warn(error);
    yield put({ type: "REQUEST_FAILED", payload: { error } });
  }
}

export default function* rootSaga() {
  yield all([
    LOAD_POKEMONS(),
    LOAD_SELECTED(),
    takeEvery(actions.LOAD_POKEMONS, LOAD_POKEMONS),
    takeEvery(actions.LOAD_SELECTED, LOAD_SELECTED),
  ]);
}
