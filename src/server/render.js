import { StaticRouter } from 'react-router-dom';
import App from '../client/App';
const { renderToString } = require('react-dom/server');

const render = (location, routerContext) => {
  const content = renderToString(
    <StaticRouter location={location} context={routerContext}>
      <App />
    </StaticRouter>
  );
  return { content };
};

module.exports = render;
