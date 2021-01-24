import { connect } from "react-redux";
import { Button } from "antd";

const MapStateToProps = ({ settings }) => ({ settings });

const TopBar = ({ settings, dispatch }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: 250,
        backgroundColor: "#6F88D9"
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          width: "100%",
          alignItems: "center",
          paddingTop: 20,
        }}
      >
        <img
          src="resources/pokemon-logo.png"
          className="App-logo"
          alt="logo"
          style={{ width: 400, height: 180 }}
        />
      </div>
      <div
        style={{
          width: "100%",
          height: 60,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          onClick={async () => {
            dispatch({
              type: "settings/SET_STATE",
              payload: { page: "pokemon" },
            });
          }}
          style={{
            height: 40,
            padding: 10,
            width: 100,
            backgroundColor: settings.page == "pokemon" ? "#FFCB05" : "#E1E2E1",
          }}
        >
          Pokémon
        </Button>
      </div>
    </div>
  );
};

export default connect(MapStateToProps)(TopBar);
