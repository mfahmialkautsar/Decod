import { Route, Routes } from 'react-router';
import routes from './routes';

function App() {
  return (
    <Routes>
      {routes.map(({ path, component: C }) => (
        <Route
          key={path}
          path={path}
          element={<C />}
        />
      ))}
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
}

export default App;
