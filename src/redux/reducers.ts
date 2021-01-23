import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import {History} from 'history';
import pokemons from './pokemons/reducers';

export default ( history: History ) =>
  combineReducers( {
    router: connectRouter( history ),
    pokemons,
  } )