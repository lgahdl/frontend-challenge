import { Card } from "antd";

type Props = {
  pokemon: any;
  index: number;
};

const ListCard = (props: Props) => {
  let { pokemon, index } = props;
  let name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  let URLArray = pokemon.url.split("/");
  let pokemonNumber = URLArray[URLArray.length - 2];
  return (
    <Card
      title={"Pokémon No. " + pokemonNumber}
      style={{ width: 400, padding: 20 }}
    >
      <b>Name:</b> {name}
    </Card>
  );
};

export default ListCard;
