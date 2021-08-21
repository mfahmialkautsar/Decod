import Decode from '../pages/Decode';
import Encode from '../pages/Encode';
import Home from '../pages/Home';

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/encode',
    exact: true,
    component: Encode,
  },
  {
    path: '/decode',
    exact: true,
    component: Decode,
  },
];

export default routes;
