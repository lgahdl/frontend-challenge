import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import {History} from 'history';
import pokemons from './pokemons/reducers';
import settings from './settings/reducers';

export default ( history: History ) =>
  combineReducers( {
    router: connectRouter( history ),
    pokemons,
    settings,
  } )