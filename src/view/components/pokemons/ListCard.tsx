import { Card } from "antd";
import { connect } from "react-redux";

type Props = {
  pokemon: any;
  index: number;
  dispatch: any;
};

const MapStateToProps = () => {};

const ListCard = (props: Props) => {
  const { pokemon, index, dispatch } = props;
  let name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  name = name
    .split("-")
    .map((subName) => {
      return subName.charAt(0).toUpperCase() + subName.slice(1);
    })
    .join(" ");
  const URLArray = pokemon.url.split("/");
  const selectedPokemonId = URLArray[URLArray.length - 2];
  return (
    <Card
      onClick={() => {
        dispatch({
          type: "pokemons/SET_STATE",
          payload: { selectedPokemonId },
        });
        dispatch({ type: "pokemons/LOAD_SELECTED" });
      }}
      title={"Pokémon No. " + selectedPokemonId}
      style={{ width: 400, padding: 20 }}
    >
      <b>Name:</b> {name}
    </Card>
  );
};

export default connect(MapStateToProps)(ListCard);
