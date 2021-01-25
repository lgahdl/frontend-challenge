import { all, takeEvery, put, call, select } from "redux-saga/effects";
import actions from "./actions";
import Pokemon from "../../api/Pokemon";

export function* LOAD_ALL() {
  try {
    const allPokemon = yield call(Pokemon.list.bind(Pokemon), {
      limit: 2000,
    });
    yield put({
      type: "pokemons/SET_STATE",
      payload: {
        allPokemon,
      },
    });
  } catch (error) {
    console.warn(error);
    yield put({ type: "REQUEST_FAILED", payload: { error } });
  }
}

export function* LOAD_PAGED_POKEMONS() {
  try {
    const subPage = yield select((state) => {
      return state.settings.selectedSubpage;
    });
    const pagedPokemon = yield call(Pokemon.list.bind(Pokemon), {
      limit: 30,
      offset: (subPage - 1) * 30,
    });
    yield put({
      type: "pokemons/SET_STATE",
      payload: {
        pagedPokemon,
      },
    });
  } catch (error) {
    console.warn(error);
    yield put({ type: "REQUEST_FAILED", payload: { error } });
  }
}

export function* SEARCH() {
  try {
    let researchString: string = yield select((state) => {
      return state.settings.researchString;
    });
    researchString = researchString.toLowerCase();
    const allPokemon = yield select((state) => {
      return state.pokemons.allPokemon;
    });
    console.log(researchString);
    let results = allPokemon.results.filter((pokemon) => {
      let name = pokemon.name.toLowerCase();
      name = name.split("-").join(" ");
      if (name.includes(researchString)) {
        return true;
      } else {
        return false;
      }
    });
    let researchedPokemon = { results };
    console.log(researchedPokemon);
    yield put({ type: "pokemons/SET_STATE", payload: { researchedPokemon } });
  } catch (error) {
    console.warn(error);
    yield put({ type: "REQUEST_FAILED", payload: { error } });
  }
}

export function* LOAD_SELECTED() {
  try {
    const id = yield select((state) => state.pokemons.selectedPokemonId);
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
    LOAD_ALL(),
    LOAD_PAGED_POKEMONS(),
    LOAD_SELECTED(),
    takeEvery(actions.SEARCH, SEARCH),
    takeEvery(actions.LOAD_ALL, LOAD_ALL),
    takeEvery(actions.LOAD_PAGED_POKEMONS, LOAD_PAGED_POKEMONS),
    takeEvery(actions.LOAD_SELECTED, LOAD_SELECTED),
  ]);
}
