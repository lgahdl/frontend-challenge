import axios from "axios";
import Utils from "../helpers/utils";

const APIAddress = "https://pokeapi.co/api/v2/";


class GenericModel {

  static subAddress: string;

  // READ ENTITY (GET)
  static async get(id: number) : Promise<any> {
    const { data } = await axios.get(`${APIAddress}${this.subAddress}/${id}`);
    return data;
  }

  // READ ENTITY (LIST)
  static async list(query: Object): Promise<any> {
    const { data } = await axios.get(
      `${APIAddress}${this.subAddress}?${Utils.serialize(query)}`,
    );
    return data;
  }
}

export default GenericModel;
