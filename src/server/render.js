import { StaticRouter } from 'react-router';
import App from '../client/App';
const { renderToString } = require('react-dom/server');

const render = (location) => {
  const content = renderToString(
    <StaticRouter location={location}>
      <App />
    </StaticRouter>
  );
  return { content };
};

module.exports = render;
