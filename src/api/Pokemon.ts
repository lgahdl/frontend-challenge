import axios from 'axios';
import GenericModel from './GenericModel';

const subAddress: string = "pokemon";

export default class Pokemon extends GenericModel {

  static subAddress: string = subAddress;

}