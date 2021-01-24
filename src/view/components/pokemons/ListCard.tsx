import { Card } from "antd";
import { connect } from "react-redux";

type Props = {
  pokemon: any;
  index: number;
  dispatch: any;
  pokemons: any;
};

const MapStateToProps = ({ pokemons }) => ({ pokemons });

const ListCard = (props: Props) => {
  const { pokemon, index, dispatch, pokemons } = props;
  let name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  name = name
    .split("-")
    .map((subName) => {
      return subName.charAt(0).toUpperCase() + subName.slice(1);
    })
    .join(" ");
  const URLArray = pokemon.url.split("/");
  const selectedPokemonId = URLArray[URLArray.length - 2];
  if (selectedPokemonId == 1) {
    console.log(pokemons.selectedPokemonId);
  }
  return (
    <div
      onClick={() => {
        dispatch({
          type: "pokemons/SET_STATE",
          payload: { selectedPokemonId },
        });
        dispatch({ type: "pokemons/LOAD_SELECTED" });
      }}
      title={"Pokémon No. " + selectedPokemonId}
      style={{
        width: "100%",
        padding: 20,
        backgroundColor:
          pokemons.selectedPokemonId === selectedPokemonId
            ? "#FFCB05"
            : "white",

        borderRadius: 3,
        marginBottom: 15,
        display: "flex",
      }}
    >
      <div style={{ height: "100%", backgroundColor: "#F0F0F0" }}>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selectedPokemonId}.png`}
          className="img-fluid"
          style={{
            borderRightStyle: "solid",
            borderBottomStyle: "solid",
            borderWidth: 2,
            minHeight: 100,
            minWidth: 100,
            borderColor: "lightgray",
          }}
        />
      </div>
      <div
        style={{
          paddingLeft: 10,
          float: "left",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div>
          <b>Id:</b> {selectedPokemonId}
        </div>
        <div>
          <b>Name:</b> {name}
        </div>
      </div>
    </div>
  );
};

export default connect(MapStateToProps)(ListCard);
