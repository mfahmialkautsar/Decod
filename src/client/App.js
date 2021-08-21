import { Route } from 'react-router';
import { Switch } from 'react-router-dom';
import routes from './routes';

function App() {
  return (
    <Switch>
      {routes.map(({ path, exact, component: C }) => (
        <Route
          key={path}
          path={path}
          exact={exact}
          render={(props) => <C {...props} />}
        />
      ))}
      <Route path="*">Not Found</Route>
    </Switch>
  );
}

export default App;
