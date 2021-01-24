import React, { lazy, Suspense } from "react";
import { Route, Redirect, Switch} from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { connect } from "react-redux";
import {History} from 'history';

const routes = [
  {
    path: "/pokemons",
    Component: lazy(() => import("./view/pages/pokemons")),
    exact: true,
  },
  {
    path: "/auth/404",
    Component: lazy(() => import("./view/pages/error/404")),
    exact: true,
  },
];

const MapStateToProps = () => ({});

const Router = (props) => {
  const {history} = props;
  return (
    <ConnectedRouter history={history}>
      <Route
        component={(state)=>(<Switch location={state.location}>
            <Route path="/" exact render={() => <Redirect to="/pokemons" />} />
            {routes.map(({ path, Component, exact }) => (
              <Route
                path={path}
                key={path}
                exact={exact}
                render={() => {
                  return (
                    <Suspense
                      fallback={null}
                    >
                      <Component/>
                    </Suspense>
                  );
                }}
              />
            ))}
            <Redirect to="/auth/404" />
          </Switch>)
          }
      />
    </ConnectedRouter>
  );
};

export default connect(MapStateToProps)(Router);
