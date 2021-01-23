import { Card } from "antd";

type Props = {
  pokemon: any
}

const ListCard = (props: Props) => {
  let { pokemon } = props;
  let name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  return (
    <Card title={name} style={{ width: 400 }}>
      <Card type="inner" title="Inner Card title" extra={<a href="#">More</a>}>
        Inner Card content
      </Card>
      <Card
        style={{ marginTop: 16 }}
        type="inner"
        title="Inner Card title"
        extra={<a href="#">More</a>}
      >
        Inner Card content
      </Card>
    </Card>
  );
};

export default ListCard;
