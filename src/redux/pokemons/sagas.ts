import { all, takeEvery, put, call } from "redux-saga/effects";
import actions from "./actions";
import Pokemon from "../../api/Pokemon";

export function* LOAD_POKEMONS() {
  try {
    const pokemons = yield call(Pokemon.list.bind(Pokemon), { limit: 2000 });
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

export default function* rootSaga() {
  yield all([LOAD_POKEMONS(), takeEvery(actions.LOAD_POKEMONS, LOAD_POKEMONS)]);
}
